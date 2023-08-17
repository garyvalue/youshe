<?php

namespace app\common\tools;

use think\facade\App;

class PathTools
{
    /**
     * 系统生成的文件,这些文件应当是可以任意删除的
     *
     * @param string $file_name
     * @return string
     */
    public static function publicBuildPath($file_name)
    {
        $file_path = App::getRootPath() . 'public/build/' . $file_name;

        return self::intiDir($file_path);
    }

    public static function publicBuildSaveName($file_name)
    {
        return '/build/' . $file_name;
    }

    public static function safeBuildPath($save_name)
    {
        $file_path = App::getRootPath() . 'storage/' . $save_name;

        return self::intiDir($file_path);
    }

    public static function tempBuildPath($file_name)
    {
        $runtime_path = App::getRuntimePath() . 'temp/' . $file_name;

        return self::intiDir($runtime_path);
    }

    public static function intiDir($file_path, $is_dirname = false)
    {
        if (!$is_dirname) {
            $dir_name = dirname($file_path);
        } else {
            $dir_name = $file_path;
        }

        if (!is_dir($dir_name)) {
            mkdir($dir_name, 0777, true);
        }
        return $file_path;
    }
}
