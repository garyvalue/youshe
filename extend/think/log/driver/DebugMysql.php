<?php

namespace think\log\driver;

use think\contract\LogHandlerInterface;
use think\facade\App;
use PDO;

class DebugMysql  implements LogHandlerInterface
{

    protected $enableLog = true;

    protected $config = [];

    protected $pdo = null;

    protected $fileRescource = null;

    protected $tableName = '';

    public function __construct(App $app, $config = [])
    {
        if (is_array($config)) {
            $this->config = array_merge($this->config, $config);
        }

        $dsn = $this->parseDsn($config);

        try {

            $pdo = $this->createPdo($dsn, $config['username'], $config['password'], $config['params']);

            $this->pdo = $pdo;
        } catch (\Throwable $th) {
            $this->pdo = null;

            $log_path = App::getRuntimePath() . 'log/' . date('ymd') . '.csv';

            $dirname = dirname($log_path);

            if (!is_dir($dirname)) {
                mkdir($log_path, 0777, true);
            }

            $first_line = false;
            if (!file_exists($log_path)) {
                $first_line = true;
            }

            $this->fileRescource = fopen($log_path, 'a');

            if ($first_line) {
                $fields = [
                    'level',
                    'content',
                    'create_time',
                    'create_time_title',
                    'uid',
                    'app_name',
                    'controller_name',
                    'action_name',
                ];
                fputcsv($this->fileRescource, $fields);
            }
        }


        $this->tableName = $config['prefix'] . 'debug_log';
    }

    public function save(array $log): bool
    {


        $app_name = app('http')->getName() ?: '';

        $controller_name = '';
        $action_name = '';

        if (App::runningInConsole()) {
            $app_name = 'cli';
        } else {

            $controller_name = request()->controller();
            $action_name = request()->action();
        }

        $create_time = time();

        $create_time_title = date('Y-m-d H:i:s', $create_time);

        $log_key = '';

        if (defined('REUQEST_UID')) {
            $log_key = REUQEST_UID;
        } else {
            $log_key = uniqid();
        }

        foreach ($log as $log_level => $log_list) {
            foreach ($log_list as $key => $log_item) {

                if (!is_string($log_item)) {
                    $log_item = print_r($log_item, true);
                }
                
                $log_data = [
                    'level' => $log_level,
                    'content' => $log_item,
                    'create_time' => $create_time,
                    'create_time_title' => $create_time_title,
                    'uid' => $log_key,
                    'app_name' => $app_name,
                    'controller_name' => $controller_name,
                    'action_name' => $action_name
                ];

                if (!is_null($this->pdo)) {

                    $prepare_name = [];
                    foreach ($log_data as $key => $value) {
                        $prepare_name[] = ':' . $key;
                    }

                    $data_keys = array_keys($log_data);

                    $data_keys_in_sql = join(',', $data_keys);

                    $prepare_name_in_sql = join(',', $prepare_name);

                    $sql = "INSERT INTO {$this->tableName} ($data_keys_in_sql)  VALUES ($prepare_name_in_sql);";

                    $stmt = $this->pdo->prepare($sql);

                    $stmt->execute($log_data);
                } else {

                    fputcsv($this->fileRescource, $log_data);
                }
            }
        }

        return true;
    }

    /**
     * 解析pdo连接的dsn信息
     * @access protected
     * @param  array $config 连接信息
     * @return string
     */
    protected function parseDsn(array $config): string
    {
        if (!empty($config['socket'])) {
            $dsn = 'mysql:unix_socket=' . $config['socket'];
        } elseif (!empty($config['hostport'])) {
            $dsn = 'mysql:host=' . $config['hostname'] . ';port=' . $config['hostport'];
        } else {
            $dsn = 'mysql:host=' . $config['hostname'];
        }
        $dsn .= ';dbname=' . $config['database'];

        if (!empty($config['charset'])) {
            $dsn .= ';charset=' . $config['charset'];
        }

        return $dsn;
    }

    protected function createPdo($dsn, $username, $password, $params)
    {
        return new PDO($dsn, $username, $password, $params);
    }

    public function __destruct()
    {
        $this->pdo = null;

        if (!is_null($this->fileRescource)) {
            fclose($this->fileRescource);
        }
    }
}
