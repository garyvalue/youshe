<?php

namespace app\admin\service;

use app\admin\model\MallCate;
use app\admin\model\MallGoods;
use app\admin\model\MallTag;
use app\admin\model\SystemAdmin;
use app\admin\model\SystemAuth;
use app\admin\model\SystemAuthNode;
use app\admin\model\SystemConfig;
use app\admin\model\SystemMenu;
use app\admin\model\SystemNode;
use app\admin\model\SystemQuick;
use app\common\constants\AdminConstant;

class InitAdminService
{

    protected $output = null;

    public function __construct($output)
    {
        $this->output = $output;
    }

    public function init()
    {
        $this->initAdmin();
        $this->initAuth();
        $this->initConfig();
        $this->initMenu();
        $this->initQuick();
        $this->initMall();
    }

    public function initMall()
    {
        $output = $this->output;

        $output->writeln('开始初始化商城案例');

        $list_cate = $this->requireData('MallCate');

        $list_goods = $this->requireData('MallGoods');

        foreach ($list_cate as  $data_cate) {
            $model_cate = MallCate::create($data_cate);

            foreach ($list_goods as  $data_goods) {
                $data_goods['cate_id'] = $model_cate->id;
                MallGoods::create($data_goods);
            }
        }

        $list_tag = $this->requireData('MallTag');

        $this->installData(MallTag::class, $list_tag);
    }

    public function initQuick()
    {
        $output = $this->output;

        $output->writeln('开始初始化快捷入口');

        $list_quick = $this->requireData('SystemQuick');

        $this->installData(SystemQuick::class, $list_quick);
    }

    public function initMenu()
    {
        $output = $this->output;

        $output->writeln('开始初始化系统菜单');

        $list_menu = $this->requireData('SystemMenu');

        $this->installData(SystemMenu::class, $list_menu);
    }

    public function initConfig()
    {
        $output = $this->output;
        $output->writeln('开始初始化系统设置');

        $list_config = $this->requireData('SystemConfig');

        $this->installData(SystemConfig::class, $list_config);
    }

    public function initAdmin()
    {
        $output = $this->output;

        $output->writeln('创建超级管理员');

        $model_admin = SystemAdmin::find(AdminConstant::SUPER_ADMIN_ID);

        if (empty($model_admin)) {
            $model_admin = new SystemAdmin();
            $model_admin->id = AdminConstant::SUPER_ADMIN_ID;
            $model_admin->head_img = '/static/admin/images/head.jpg';
            $model_admin->username = 'admin';
            $model_admin->password = password(123456);
            $model_admin->status = 1;
            $model_admin->save();
            $output->writeln('创建超级管理员成功');
        } else {
            $output->writeln('超级管理员已存在，无需初始化');
        }
    }

    public function initAuth()
    {
        $output = $this->output;

        $output->writeln('开始初始化权限');

        $list_auth = $this->requireData('SystemAuth');

        $this->installData(SystemAuth::class, $list_auth);

        $output->writeln('开始初始化权限节点');

        $list_auth_node = $this->requireData('SystemAuthNode');

        $this->installData(SystemAuthNode::class, $list_auth_node);

        $output->writeln('开始初始化系统节点');
        $list_node = $this->requireData('SystemNode');

        $this->installData(SystemNode::class, $list_node);
    }

    protected function installData($model_name, $list)
    {
        foreach ($list as $key => $value) {
            $model_name::create($value);
        }
    }

    protected function requireData($table_name)
    {
        return include __DIR__ . '/initAdminData/' . $table_name . '.php';
    }
}
