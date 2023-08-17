<?php

declare(strict_types=1);

namespace app\common\command\curd;

use think\console\Command;
use think\console\Input;
use think\console\input\Argument;
use think\console\input\Option;
use think\console\Output;
use think\facade\App;
use think\facade\Db;
use think\facade\View;

class Migrate extends Command
{
    protected $table;
    protected $database;
    protected $tablePrefix;

    protected function configure()
    {
        // 指令配置
        $this->setName('curd:migrate')
            ->addOption('table', 't', Option::VALUE_REQUIRED, '主表名')
            ->addOption('tableName', '', Option::VALUE_OPTIONAL, '要生成的表名')
            ->addOption('fileName', '', Option::VALUE_OPTIONAL, '要生成的文件名')
            ->addOption('force', 'f', Option::VALUE_NONE, '强制生成')
            ->setDescription('the curd:migrate command');
    }

    protected function execute(Input $input, Output $output)
    {
        // 指令输出
        $output->writeln('curd:migrate');

        $table = $input->getOption('table');
        $file_name = $input->getOption('fileName');
        $table_name = $input->getOption('tableName');
        $force = $input->getOption('force');

        if (empty($table)) {
            $output->error('请输入表名');
            return;
        }

        if (empty($table_name)) {
            $table_name = $table;
        }

        if (empty($file_name)) {
            $file_name = $table_name;
        }
        $this->table = $table;


        $this->database = config('database.connections.mysql.database');
        $this->tablePrefix = config('database.connections.mysql.prefix');

        $table_info_sql = "select * from INFORMATION_SCHEMA.TABLES where TABLE_SCHEMA='{$this->database}' and TABLE_NAME='{$this->tablePrefix}{$this->table}'";

        $table_info = Db::query($table_info_sql);

        if (empty($table_info)) {
            $output->error('表不存在');
            return;
        }

        $dist_file_path = App::getRootPath() . '/database/migrations/' . date('YmdHis') . '_' . $file_name . '.php';

        $patt_path = App::getRootPath() . '/database/migrations/*' . $file_name . '.php';

        $patt_files = glob($patt_path);


        $is_extis = false;
        foreach ($patt_files as $patt_file) {


            $patt = '/.*database\/migrations\/\d+_' . $file_name . '.php$/';

            $preg_result = preg_match($patt, $patt_file);


            if ($preg_result) {
                $is_extis = true;
            }
        }

        if ($is_extis) {
            $output->error('文件已存在:' . $patt_files[0]);
            if (!$force) {
                $confirm_force = $output->confirm($input, '确定要覆盖文件吗?', false);

                if (!$confirm_force) {
                    return;
                }
            }
            $output->highlight('执行覆盖操作');

            $dist_file_path = $patt_files[0];
        }


        $columns = Db::query("SHOW FULL COLUMNS FROM {$this->tablePrefix}{$this->table}");

        $data['class_name'] = \think\helper\Str::studly($file_name);


        $table_columns = [];

        $table_keys = [];
        $table_keys_text = [];
        $table_keys_uni = [];

        foreach ($columns as  $column) {

            if ($column['Field'] == 'id') {
                continue;
            }
            $column_item = [];
            $column_item['options'] = [];

            $column_item['field'] = $column['Field'];

            $column_item['type'] = '';

            $type = $column['Type'];

            if (strpos($type, '(') !== false) {
                // 带有长度

                $type_info = explode('(', $type);
                $column_item['type'] = $type_info[0];

                $length = substr($type_info[1], 0, strpos($type_info[1], ')'));

                if (strpos($length, ',') !== false) {

                    $length_info = explode(',', $length);

                    $column_item['options']['precision'] = $length_info[0];
                    $column_item['options']['scale'] = $length_info[1];
                } else {

                    $column_item['options']['limit'] = $length;
                }

                if (strpos($type, 'unsigned') !== false) {
                    // 无符号
                    $column_item['options']['signed'] = 0;
                }
            } else {
                $column_item['type'] = $type;
            }

            $column_item['options']['null'] = $column['Null'] == 'YES' ? 1 : 0;
            if ($column['Default'] !== null) {
                $column_item['options']['default'] = $column['Default'];
            }
            $column_item['options']['comment'] = $column['Comment'];

            $key = $column['Key'];

            if (!empty($key)) {
                if ($key == 'MUL') {
                    if ($type == 'text' || $type == 'longtext') {

                        $table_keys_text[] = $column['Field'];
                    } else {
                        $table_keys[] = $column['Field'];
                    }
                } elseif ($key == 'UNI') {
                    $table_keys_uni[] = $column['Field'];
                }
            }

            $table_columns[] = $column_item;
        }

        $type_map = [
            'bigint' => 'biginteger',
            'int' => 'integer',
            'varchar' => 'string',
            'smallint' => 'integer',
            'tinyint' => 'integer',
            'longtext' => 'text',
        ];

        foreach ($table_columns as  &$column_item_set) {

            if (isset($type_map[$column_item_set['type']])) {
                $column_item_set['type'] = $type_map[$column_item_set['type']];
            }

            foreach ($column_item_set['options'] as $key => $option) {

                if(is_array($option)) {

                    $column_item_set['options'][$key] = "[".implode(',', $option)."]";

                } else {
                    $column_item_set['options'][$key] = "'{$option}'";
                }
            }
        }


        $data['table_info'] = $table_info[0];
        $data['table'] = $table_name;
        $data['table_columns'] = $table_columns;
        $data['table_keys'] = $table_keys;
        $data['table_keys_uni'] = $table_keys_uni;
        $data['table_keys_text'] = $table_keys_text;


        $migrate_content = View::fetch(__DIR__ . '/migrate.tpl', $data);

        file_put_contents(__DIR__ . '/migrate_output.php', "<?php\n\n" . $migrate_content);
        file_put_contents($dist_file_path, "<?php\n\n" . $migrate_content);
    }
}
