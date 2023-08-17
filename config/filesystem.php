<?php

use think\facade\Env;
use think\facade\Request;

return [
    // 默认磁盘
    'default' => Env::get('filesystem.driver', 'local'),
    // 磁盘列表
    'disks'   => [
        'local'  => [
            'type' => 'local',
            'root' => app()->getRuntimePath() . 'storage',
        ],
        'local_public' => [
            // 磁盘类型
            'type'       => 'LocalPublic',
            // 磁盘路径
            'root'       => app()->getRootPath() . 'public/storage',
            // 磁盘路径对应的外部URL路径
            'url'        => '/storage',
            // 可见性
            'visibility' => 'public',
        ],
        'local_static' => [
            // 磁盘类型
            'type'       => 'LocalPublic',
            // 磁盘路径
            'root'       => app()->getRootPath() . 'public/static',
            // 磁盘路径对应的外部URL路径
            'url'        => '/static',
            // 可见性
            'visibility' => 'public',
        ],
        'qnoss' => [
            'type' => 'Qiniu',
            'visibility' => 'public',
        ],
        'alioss' => [
            'type' => 'Alioss',
            'visibility' => 'public',
        ],
        'txcos' => [
            'type' => 'Txcos',
            'visibility' => 'public',
        ],
        // 更多的磁盘配置信息
    ],
];
