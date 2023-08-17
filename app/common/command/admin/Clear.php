<?php

declare(strict_types=1);

namespace app\common\command\admin;

use think\console\Command;
use think\console\Input;
use think\console\input\Argument;
use think\console\input\Option;
use think\console\Output;
use think\facade\App;

class Clear extends Command
{
    protected function configure()
    {
        // 指令配置
        $this->setName('admin:clear')
            ->setDescription('删除开发临时生成目录');
    }

    protected function execute(Input $input, Output $output)
    {
        // 指令输出
        $output->writeln('删除测试目录');


        $command_line = '';

        $dir = App::getRootPath() . '/runtime/source/';

        if (!is_dir($dir)) {
            $output->writeln('删除成功');
            return;
        }

        if (strpos(strtolower(PHP_OS), 'win') === 0) {
            $command_line = implode(' ', ['rd', '/s', '/q', str_replace('/', '\\', $dir)]);
        } else {
            $command_line = implode(' ', ['rm', '-rf', $dir]);
        }

        $output->info('删除目录：' . $command_line);

        $output->info('run command: ' . $command_line);

        exec($command_line);

        $output->info('删除成功');
    }
}
