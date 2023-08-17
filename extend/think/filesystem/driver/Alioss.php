<?php

namespace think\filesystem\driver;


use Iidestiny\Flysystem\Oss\OssAdapter;
use League\Flysystem\FilesystemAdapter;
use think\filesystem\Driver;

class Alioss  extends Driver
{
    protected function createAdapter(): FilesystemAdapter
    {

        return new OssAdapter(
            sysconfig('upload', 'alioss_access_key_id'),
            sysconfig('upload', 'alioss_access_key_secret'),
            sysconfig('upload', 'alioss_endpoint'),
            sysconfig('upload', 'alioss_bucket')
        );
    }

    public function url(string $path): string
    {
        return $this->concatPathToUrl(sysconfig('upload', 'alioss_domain'), $path);
    }
}
