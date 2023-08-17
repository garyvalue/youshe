<?php

return [
    [
        'name' => 'http_demo',        // 定时任务的名称,不能重复
        'type' => 'site',             // 定时任务的类型，默认只支持site，你也可以重写定时器命令行以支持其他命令
        'target' => '/tools/timer.ResetPassword/do',  // 要访问的地址，如果不是以https开头，那么以后台的系统配置中读取相关配置，如果没有配置则不执行
        'frequency' => 600              // 执行频率，单位：秒，填写10，则每10秒过后执行一次
    ],
    [
        'name' => 'clear_log',        // 定时任务的名称,不能重复
        'type' => 'site',             // 定时任务的类型，默认只支持site，你也可以重写定时器命令行以支持其他命令
        'target' => '/tools/timer.ClearLog/do',  // 要访问的地址，如果不是以https开头，那么以后台的系统配置中读取相关配置，如果没有配置则不执行
        'frequency' => 600              // 执行频率，单位：秒，填写10，则每10秒过后执行一次
    ],
];
