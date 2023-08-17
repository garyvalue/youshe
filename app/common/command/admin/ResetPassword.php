<?php

declare(strict_types=1);

namespace app\common\command\admin;

use app\admin\model\SystemAdmin;
use app\common\constants\AdminConstant;
use think\console\Command;
use think\console\Input;
use think\console\input\Argument;
use think\console\input\Option;
use think\console\Output;

class ResetPassword extends Command
{
    protected function configure()
    {
        // 指令配置
        $this->setName('admin:reset:password')
            ->addOption('password','p', Option::VALUE_OPTIONAL)
            ->setDescription('重置超管密码');
    }

    protected function execute(Input $input, Output $output)
    {
        // 指令输出
        $output->writeln('admin:reset:password');


        $model_admin = SystemAdmin::find(AdminConstant::SUPER_ADMIN_ID);
        if (empty($model_admin)) {
            $output->writeln('管理员不存在');
            return false;
        }

        $password = $input->getOption('password');

        if(is_null($password)){
            $password = uniqid();
        }


        $model_admin->save([
            'password' => password($password)
        ]);

        $output->writeln('密码修改为:' . $password);
    }
}
