<?php


namespace app\common\command;

use app\common\service\UploadService;
use think\console\Command;
use think\console\Input;
use think\console\Output;
use think\facade\Filesystem;
use think\File;

class OssStatic extends Command
{

    protected function configure()
    {
        $this->setName('OssStatic')
            ->setDescription('将静态资源上传到oss上');
    }

    protected function execute(Input $input, Output $output)
    {
        $output->writeln("========正在上传静态资源到OSS上：========" . date('Y-m-d H:i:s'));

        $list = Filesystem::disk('local_static')->listContents('/', true);
        $upload_service = new UploadService();
        $uploadPrefix = config('app.oss_static_prefix', 'oss_static_prefix');

        foreach ($list as  $file_item) {

            if ($file_item['type'] != 'file') {
                continue;
            }

            $file_path = $file_item['path'];

            $file_path = Filesystem::disk('local_static')->path($file_path);

            $file = new File($file_path, false);

            $save_name = $file_item['path'];
            try {
                $model_file = $upload_service->save($file, $save_name, true, $uploadPrefix, true);
                $output->info('文件上传成功：' . $save_name . '。上传地址：' . $model_file['url']);
            } catch (\Throwable $th) {
                $output->error('文件上传失败：' . $save_name . '。错误信息：' . $th->getMessage());
            }
        }
        $output->writeln("========已完成静态资源上传到OSS上：========" . date('Y-m-d H:i:s'));
    }
}
