<?php

namespace app\common\provider\db;

use think\db\Query as DbQuery;
use think\facade\Env;
use think\facade\Log;
use think\helper\Str;

class Query extends DbQuery
{


    /**
     * autoCache 自动生成缓存
     *
     * @param null|string $key
     * @param null|string|int $field_key_value
     * @param null|string $tag
     * @param null|string|int $field_tag_value
     * @return void
     */
    public function autoCache($key = null, $field_key_value = null, $tag = null, $field_tag_value = null)
    {

        $table_name = Str::snake($this->getName());

        if (is_null($key)) {
            $key = $this->getOptionsMd5();
        }

        if (!is_null($field_key_value)) {
            $key = $key . '_' . $field_key_value;
        }
        $key = $table_name . '_' . $key;

        if (!is_null($tag)) {

            if (!is_null($field_tag_value)) {
                $tag = $tag . '_' . $field_tag_value;
            }

            $tag = $table_name . '_' . $tag;
        }

        if (Env::get('app.auto_cache_log')) {
            Log::debug('use auto cache:' . $key);
            Log::debug('use auto cache tag:' . $tag);
        }

        $this->cache($key, null, $tag);

        return $this;
    }

    public function getOptionsMd5()
    {
        $options = $this->getOptions();

        // TODO:支持获取回调函数的设置

        return md5(json_encode($options));
    }
}
