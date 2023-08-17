<?php
// 应用公共文件

use app\common\service\AuthService;
use think\facade\Cache;
use think\facade\Filesystem;
use think\facade\Request;
use think\route\Url;

if (!function_exists('__url')) {

    /**
     * 构建URL地址
     * @param string $url
     * @param array $vars
     * @param bool $suffix
     * @param bool $domain
     * @return string
     */
    function __url(string $url = '', array $vars = [], $suffix = true, $domain = false)
    {
        $url = url($url, $vars, $suffix, $domain)->build();

        $url_data = parse_url($url);

        $url_path = $url_data['path'];

        $url_arr = explode('/', $url_path);

        $app_map = config('app.app_map');

        $app_name = array_search($url_arr[1], $app_map);

        if (!empty($app_name)) {
            $url_arr[1] = $app_name;
        }

        $url_path = implode('/', $url_arr);

        $url_data['path'] = $url_path;

        $url = unparse_url($url_data);

        return $url;
    }
}

if (!function_exists('password')) {

    /**
     * 密码加密算法
     * @param $value 需要加密的值
     * @param $type  加密类型，默认为md5 （md5, hash）
     * @return mixed
     */
    function password($value, $salt = '_encrypt')
    {
        $value = sha1('ul_' . $salt) . md5($value) . md5($salt) . sha1($value);
        return sha1($value);
    }
}

if (!function_exists('xdebug')) {

    /**
     * debug调试
     * @deprecated 不建议使用，建议直接使用框架自带的log组件
     * @param string|array $data 打印信息
     * @param string $type 类型
     * @param string $suffix 文件后缀名
     * @param bool $force
     * @param null $file
     */
    function xdebug($data, $type = 'xdebug', $suffix = null, $force = false, $file = null)
    {
        !is_dir(runtime_path() . 'xdebug/') && mkdir(runtime_path() . 'xdebug/');
        if (is_null($file)) {
            $file = is_null($suffix) ? runtime_path() . 'xdebug/' . date('Ymd') . '.txt' : runtime_path() . 'xdebug/' . date('Ymd') . "_{$suffix}" . '.txt';
        }
        file_put_contents($file, "[" . date('Y-m-d H:i:s') . "] " . "========================= {$type} ===========================" . PHP_EOL, FILE_APPEND);

        $str = '';

        if (is_string($data)) {
            $str = $data;
        } else {
            if (is_array($data) || is_object($data)) {
                $str = print_r($data, true);
            } else {
                $str = var_export($data, true);
            }
        }

        $str . PHP_EOL;

        $force ? file_put_contents($file, $str) : file_put_contents($file, $str, FILE_APPEND);
    }
}

if (!function_exists('sysconfig')) {

    /**
     * 获取系统配置信息
     * @param $group
     * @param null|bool|string $name
     * @return array|mixed
     */
    function sysconfig($group, $name = null, $default = null)
    {

        if ($name === true) {
            $value = Cache::get('sysconfig_' . $group);

            if (empty($value)) {
                $value = \app\admin\model\SystemConfig::where('name', $group)->value('value');
                Cache::tag('sysconfig')->set('sysconfig_' . $group, $value);
            }
            if (is_null($value)) {
                return $default;
            }
            return $value;
        }

        $where = ['group' => $group];
        $value = empty($name) ? Cache::get("sysconfig_{$group}") : Cache::get("sysconfig_{$group}_{$name}");
        if (empty($value)) {
            if (!empty($name)) {
                $where['name'] = $name;
                $value = \app\admin\model\SystemConfig::where($where)->value('value');
                Cache::tag('sysconfig')->set("sysconfig_{$group}_{$name}", $value, 3600);
            } else {
                $value = \app\admin\model\SystemConfig::where($where)->column('value', 'name');
                Cache::tag('sysconfig')->set("sysconfig_{$group}", $value, 3600);
            }
        }
        if (is_null($value)) {
            return $default;
        }
        return $value;
    }
}

if (!function_exists('array_format_key')) {

    /**
     * 二位数组重新组合数据
     * @param $array
     * @param $key
     * @return array
     */
    function array_format_key($array, $key)
    {
        $newArray = [];
        foreach ($array as $vo) {
            $newArray[$vo[$key]] = $vo;
        }
        return $newArray;
    }
}

if (!function_exists('auth')) {

    /**
     * auth权限验证
     * @param $node
     * @return bool
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    function auth($node = null)
    {
        $authService = new AuthService(session('admin.id'));
        $check = $authService->checkNode($node);
        return $check;
    }
}


function json_message($data = [], $code = 0, $msg = '')
{
    if (is_string($data)) {

        if (strpos($data, 'http') === 0 || strpos($data, '/') === 0) {
            $data = [
                'jump_to_url' => $data
            ];
        } else {

            $code = $code === 0 ? 500 : $code;
            $msg = $data;
            $data = [];
        }
    } else if ($data instanceof Url) {
        $data = [
            'jump_to_url' => (string)$data
        ];
    }

    return json([
        'code' => $code,
        'msg' => $msg,
        'data' => $data
    ]);
}


if (!function_exists('unparse_url')) {

    function unparse_url($parsed_url)
    {
        $scheme   = isset($parsed_url['scheme']) ? $parsed_url['scheme'] . '://' : '';
        $host     = isset($parsed_url['host']) ? $parsed_url['host'] : '';
        $port     = isset($parsed_url['port']) ? ':' . $parsed_url['port'] : '';
        $user     = isset($parsed_url['user']) ? $parsed_url['user'] : '';
        $pass     = isset($parsed_url['pass']) ? ':' . $parsed_url['pass']  : '';
        $pass     = ($user || $pass) ? "$pass@" : '';
        $path     = isset($parsed_url['path']) ? $parsed_url['path'] : '';
        $query    = isset($parsed_url['query']) ? '?' . $parsed_url['query'] : '';
        $fragment = isset($parsed_url['fragment']) ? '#' . $parsed_url['fragment'] : '';
        return "$scheme$user$pass$host$port$path$query$fragment";
    }
}

if (!function_exists('ua_htmlspecialchars')) {
    function ua_htmlspecialchars($string)
    {

        if (is_null($string)) {
            $string = '';
        }

        return htmlspecialchars($string);
    }
}

if (!function_exists('ua_htmlentities')) {
    function ua_htmlentities($string)
    {

        if (is_null($string)) {
            $string = '';
        }

        return htmlentities($string);
    }
}

if (!function_exists('ua_htmlspecialchars_decode')) {
    function ua_htmlspecialchars_decode($string, $flag = ENT_QUOTES | ENT_SUBSTITUTE)
    {

        if (is_null($string)) {
            $string = '';
        }

        return htmlspecialchars_decode($string, $flag);
    }
}



function build_upload_url($url, $upload_type = null)
{

    if (is_null($upload_type)) {
        $upload_type = sysconfig('upload', 'upload_type', 'local_public');
    }
    return Filesystem::disk($upload_type)->url($url);
}
