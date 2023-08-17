<?php

declare(strict_types=1);

namespace app\tools\controller\timer;

use app\common\controller\TimerController;
use think\facade\Console;

class ResetPassword extends TimerController
{

    protected $frequency = 600;

    public function do()
    {

        if (!env('adminsystem.is_demo', false)) {
            return $this->error('本功能只有在演示环境下在能使用', '', '/');
        }

        $output = Console::call('admin:resetPassword', [
            '--password=123456'
        ]);

        return $output->fetch();
    }
}
