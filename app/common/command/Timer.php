<?php

declare(strict_types=1);

namespace app\common\command;

use GuzzleHttp\Client;
use GuzzleHttp\Promise\Utils;
use think\console\Command;
use think\console\Input;
use think\console\input\Argument;
use think\console\input\Option;
use think\console\Output;
use think\facade\Cache;
use think\facade\Log;

class Timer extends Command
{
    protected function configure()
    {
        // 指令配置
        $this->setName('timer')
            ->addOption('temp', null, Option::VALUE_NONE)
            ->addOption('quit', null, Option::VALUE_NONE)
            ->setDescription('内置秒级定时器');
    }

    protected function execute(Input $input, Output $output)
    {
        // 指令输出
        $output->writeln('start timer');


        $site_domain = sysconfig('site', 'site_domain');

        if (empty($site_domain)) {
            $output->writeln('请前往后台设置站点域名（site_domain）配置项');
            return;
        }
        $output->writeln('站点域名：'.$site_domain);

        $client = new Client([
            'base_uri' => $site_domain,
            'verify' => false,
        ]);

        while (true) {

            try {


                $config_list = include __DIR__ . '/timer/config.php';

                $list_promises = [];
                foreach ($config_list as  $config_item) {

                    $config_item = static::initConfigItem($config_item);


                    $name = $config_item['name'];

                    if ($name == 'http_demo' && !env('adminsystem.is_demo', false)) {
                        continue;
                    }

                    $cache_key = 'timer_' . $name;
                    $cache_tag = 'system_timer';

                    $last_exec_time = Cache::get($cache_key, 0);

                    if ($last_exec_time >= time() - $config_item['frequency']) {
                        continue;
                    }

                    Cache::tag($cache_tag)->set($cache_key, time());

                    $type = $config_item['type'];

                    switch ($type) {
                        case 'site':
                            $output->writeln(date('Y-m-d H:i:s') . ': build site request async:' . $config_item['target']);
                            $list_promises[$config_item['name']] = $client->getAsync($config_item['target']);

                            break;

                        default:
                            $output->writeln(date('Y-m-d H:i:s') . 'unsupport type:' . $type);
                            break;
                    }
                }

                if (empty($list_promises)) {
                    if(!$input->hasOption('quit')){
                        $output->writeln(date('Y-m-d H:i:s') . ' no request');
                    }
                } else {
                    $results = Utils::unwrap($list_promises);
                    $output->writeln(date('Y-m-d H:i:s') . ': request all finished');
                }
            } catch (\Throwable $th) {
                // throw $th;
                $output->writeln('error:' . $th->getMessage());
                Log::error($th->getMessage());
            }


            if ($input->hasOption('temp')) {
                break;
            }


            sleep(1);
        }
    }

    private static function initConfigItem($config)
    {
        $default = [
            'name' => 'http_demo',
            'type' => 'site',
            'target' => '',
            'frequency' => 600
        ];

        $data = array_merge($default, $config);

        if ($data['frequency'] < 0) {
            $data['frequency'] = 0;
        }

        return $data;
    }
}
