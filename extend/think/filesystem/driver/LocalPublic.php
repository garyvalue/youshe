<?php

namespace think\filesystem\driver;

use think\facade\Request;

class LocalPublic extends Local
{
    public function url(string $path): string
    {

        $url = sysconfig('upload', 'local_domain');

        if (empty($url)) {
            $host = Request::host();

            if (!empty($host)) {
                $url = Request::domain();
            }
        }
        if (isset($this->config['url'])) {
            $url = trim($url, '/') . '/' . trim($this->config['url'], '/');
        }

        if (isset($url)) {
            return $this->concatPathToUrl($url, $path);
        }
        return parent::url($path);
    }
}
