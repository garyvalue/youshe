<?php

namespace think\filesystem\driver;;

use League\Flysystem\FilesystemAdapter;
use think\filesystem\Driver;
use Overtrue\Flysystem\Cos\CosAdapter;

class Txcos extends Driver
{
    protected function createAdapter(): FilesystemAdapter
    {
        $appid = sysconfig('upload', 'txcos_appid');
        $secretId = sysconfig('upload', 'txcos_secret_id');
        $secretKey = sysconfig('upload', 'txcos_secret_key');
        $region = sysconfig('upload', 'txcos_region'); //set a default bucket region 设置一个默认的存储桶地域 
        $bucket = sysconfig('upload', 'txcos_bucket'); //存储桶名称 格式：BucketName-APPID

        $config = [
            // 必填，app_id、secret_id、secret_key 
            // 可在个人秘钥管理页查看：https://console.cloud.tencent.com/capi
            'app_id' => $appid,
            'secret_id' => $secretId,
            'secret_key' => $secretKey,
            'region' => $region,
            'bucket' => $bucket,

            // 可选，如果 bucket 为私有访问请打开此项
            'signed_url' => false,

            // 可选，是否使用 https，默认 false
            'use_https' => true,
        ];

        $adapter = new CosAdapter($config);


        return $adapter;
    }

    public function url(string $path): string
    {
        return $this->concatPathToUrl(sysconfig('upload', 'txcos_domain'), $path);
    }
}
