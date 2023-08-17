<?php


namespace app\common\command;


use app\admin\service\curd\BuildCurdService;
use app\common\tools\PathTools;
use think\console\Command;
use think\console\Input;
use think\console\input\Option;
use think\console\Output;
use think\Exception;
use think\facade\App;

class Curd extends Command
{
    protected function configure()
    {
        $this->setName('curd')
            ->addOption('table', 't', Option::VALUE_REQUIRED, '主表名', null)
            ->addOption('controllerFilename', 'c', Option::VALUE_REQUIRED, '控制器文件名', null)
            ->addOption('modelFilename', 'm', Option::VALUE_REQUIRED, '主表模型文件名', null)
            #
            ->addOption('force', 'f', Option::VALUE_NONE, '强制覆盖模式')
            ->addOption('delete', 'd', Option::VALUE_NONE, '删除模式')
            ->addOption('runtime', 'r', Option::VALUE_NONE, '临时生成')
            ->setDescription('一键curd命令服务');
    }

    protected function execute(Input $input, Output $output)
    {

        $table = $input->getOption('table');
        $controllerFilename = $input->getOption('controllerFilename');
        $modelFilename = $input->getOption('modelFilename');

        $force = 0;
        $delete = 0;

        if ($input->hasOption('force')) {
            $force = 1;
        }

        if ($input->hasOption('delete')) {
            $delete = 1;
        }

        if (empty($table)) {
            $output->error('请设置主表');
            return false;
        }

        try {
            $build = (new BuildCurdService())
                ->setTable($table)
                ->setForce($force);

            if ($input->hasOption('runtime')) {

                $runtime_path = App::getRuntimePath() . 'source/build/' . date('YmdHis') . '/';
                dump($runtime_path);
                PathTools::intiDir($runtime_path . 'a.temp');

                $build->setRootDir($runtime_path);
            }

            $columns = $build->getTableColumns();

            $relations = [];

            foreach ($columns as $field => $column) {

                if (isset($column['formType']) && $column['formType'] == 'relation') {
                    $define = $column['define'];

                    if (!isset($define['table'])) {
                        $output->error("关联字段{$field}没有设置关联表名称");
                        return false;
                    }

                    $relations[] = [
                        'table'         => $define['table'],
                        'foreignKey'    => $field,
                        'primaryKey'    => $define['primaryKey'] ?? null,
                        'modelFilename' => $define['modelFilename'] ?? null,
                        'onlyFileds'    => isset($define['onlyFileds']) ? explode("|", $define['onlyFileds']) : [],
                        'relationBindSelect' => $define['relationBindSelect'] ?? null,
                    ];
                }
            }


            !empty($controllerFilename) && $build = $build->setControllerFilename($controllerFilename);
            !empty($modelFilename) && $build = $build->setModelFilename($modelFilename);


            foreach ($relations as $relation) {
                $build = $build->setRelation($relation['table'], $relation['foreignKey'], $relation['primaryKey'], $relation['modelFilename'], $relation['onlyFileds'], $relation['relationBindSelect']);
            }

            $build = $build->render();
            $fileList = $build->getFileList();

            if (!$delete) {
                if ($force) {
                    $output->writeln(">>>>>>>>>>>>>>>");
                    foreach ($fileList as $key => $val) {
                        $output->writeln($key);
                    }
                    $output->writeln(">>>>>>>>>>>>>>>");

                    $ask_force_delete_result = $output->confirm($input,'确定强制生成上方所有文件? 如果文件存在会直接覆盖。');
                    
                    if (!$ask_force_delete_result) {
                        throw new Exception("取消文件CURD生成操作");
                    }
                }
                $result = $build->create();
                $output->info('自动生成CURD成功');
            } else {
                $output->writeln(">>>>>>>>>>>>>>>");
                foreach ($fileList as $key => $val) {
                    $output->writeln($key);
                }
                $output->writeln(">>>>>>>>>>>>>>>");

                $ask_force_delete_result = $output->confirm($input,'确定删除上方所有文件? ');
                    
                if (!$ask_force_delete_result) {
                    throw new Exception("取消删除文件操作");
                }
                $result = $build->delete();
                $output->info('>>>>>>>>>>>>>>>');
                $output->info('删除自动生成CURD文件成功');
            }
            $output->info('>>>>>>>>>>>>>>>');
            foreach ($result as $vo) {
                $output->info($vo);
            }
        } catch (\Exception $e) {
            $output->error($e->getMessage());
            return false;
        }
    }
}
