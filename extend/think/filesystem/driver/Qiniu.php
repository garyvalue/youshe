<?php

namespace think\filesystem\driver;

use League\Flysystem\FilesystemAdapter;
use think\filesystem\Driver;
use Overtrue\Flysystem\Qiniu\QiniuAdapter;

class Qiniu  extends Driver
{
    protected function createAdapter(): FilesystemAdapter
    {
        return new QiniuAdapter(
            sysconfig('upload', 'qnoss_access_key'),
            sysconfig('upload', 'qnoss_secret_key'),
            sysconfig('upload', 'qnoss_bucket'),
            sysconfig('upload', 'qnoss_domain')
        );
    }

    public function url(string $path): string
    {
        return $this->concatPathToUrl(sysconfig('upload', 'qnoss_domain'), $path);
    }
}
