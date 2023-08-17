<?php

use think\facade\Env;

// +----------------------------------------------------------------------
// | 日志设置
// +----------------------------------------------------------------------


$level = [];

if (!Env::get('APP_DEBUG')) {
    $level = ['error', 'info', 'notice', 'warning', 'critical', 'alert', 'emergency'];
}

return [
    // 默认日志记录通道
    'default' => Env::get('log.channel', 'file'),
    // 日志记录级别
    'level' => $level,
    // 日志类型记录的通道 ['error'=>'email',...]
    'type_channel' => [],
    // 关闭全局日志写入
    'close' => false,
    // 全局日志处理 支持闭包
    'processor' => null,
    // 记录堆栈
    'record_trace' => true,
    // 日志通道列表
    'channels' => [
        'file' => [
            // 日志记录方式
            'type' => 'file',
            // 日志保存目录
            'path' => '',
            // 单文件日志写入
            'single' => false,
            // 独立日志级别
            'apart_level' => [],
            // 最大日志文件数量
            'max_files' => 30,
            // 使用JSON格式记录
            'json' => true,
            // 日志处理
            'processor' => null,
            // 关闭通道日志写入
            'close' => false,
            // 格式化时间
            'time_format' => 'Y-m-d H:i:s',
            // 日志输出格式化
            'format' => '[%s][%s] %s',
            // 是否实时写入
            'realtime_write' => false,
        ],
        // 其它日志通道配置
        // 其它日志通道配置
        'debug_mysql' => [
            'type' => 'DebugMysql',
            // 服务器地址
            'hostname' => Env::get('database.hostname', '127.0.0.1'),
            // 数据库名
            'database' => Env::get('database.database', ''),
            // 用户名
            'username' => Env::get('database.username', ''),
            // 密码
            'password' => Env::get('database.password', ''),
            // 端口
            'hostport' => Env::get('database.hostport', '3306'),
            // 数据库连接参数
            'params' => [],
            // 数据库编码默认采用utf8
            'charset' => Env::get('database.charset', 'utf8'),
            // 数据库表前缀
            'prefix' => Env::get('database.prefix', 'ul_'),
        ]
    ],

];