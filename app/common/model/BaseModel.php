<?php

namespace app\common\model;

use think\facade\Cache;
use think\facade\Env;
use think\facade\Log;
use think\Model;
use think\helper\Str;

class BaseModel extends Model
{
    /**
     * 自动清除的缓存值
     * 
     * [
     *      'name'=>'',
     *      'type'=>'',     // tag/key
     *      'field'=>''     // 为空则不做拼接
     * ]
     *
     * @var array
     */
    public static $autoCache = [];

    public static function onAfterWrite($model)
    {
        static::autoRemoveCache($model);
    }
    public static function onAfterDelete($model)
    {
        static::autoRemoveCache($model);
    }
    public static function onAfterRestore($model)
    {
        static::autoRemoveCache($model);
    }
    public static function autoRemoveCache($model)
    {
        
        
        if(!isset(static::$autoCache['table'])){
            static::$autoCache['table'] = [
                'name' =>  'table',
                'type' => 'tag'
            ];
        }

        if(!isset(static::$autoCache['read'])){
            static::$autoCache['read'] = [
                'name' =>  'read',
                'field' => 'id'
            ];
        }


        foreach (static::$autoCache as  $cache_item) {
            $type = $cache_item['type'] ?? 'key';

            $field = $cache_item['field'] ?? '';

            $cache_key = $cache_item['name'] ?? '';

            if (empty($cache_key)) {
                continue;
            }

            $cache_key = Str::snake($model->getName()) . '_' . $cache_key;


            if (!empty($field) && !is_null($model->$field)) {
                // 用字段新的值拼接key
                $cache_key_attr = $cache_key . '_' . $model->getAttr($field);

                static::doRemoveCache($type, $cache_key_attr);

                // 用字段旧的值拼接key
                $cache_key_original = $cache_key . '_' . $model->getOrigin($field);

                if ($cache_key_original != $cache_key_attr) {
                    static::doRemoveCache($type, $cache_key_original);
                }
            } else {
                static::doRemoveCache($type, $cache_key);
            }
        }
    }

    protected static function doRemoveCache($type, $cache_key)
    {

        if (Env::get('app.auto_cache_log')) {
            Log::debug("清除 ORM 自动缓存 {$type}:{$cache_key}");
        }

        if ($type == 'key') {
            Cache::delete($cache_key);
        } else {
            Cache::tag($cache_key)->clear();
        }
    }

    public static function getClassNameKey()
    {
        return str_replace('\\', '_', static::class);
    }
}
