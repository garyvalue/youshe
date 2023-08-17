<?php


namespace app\admin\controller\system;


use app\admin\model\SystemConfig;
use app\admin\service\TriggerService;
use app\common\controller\AdminController;
use app\admin\service\annotation\ControllerAnnotation;
use app\admin\service\annotation\NodeAnotation;
use think\App;

/**
 * Class Config
 * @package app\admin\controller\system
 * @ControllerAnnotation(title="系统配置管理")
 */
class Config extends AdminController
{

    public function __construct(App $app)
    {
        parent::__construct($app);
        $this->model = new SystemConfig();
    }

    /**
     * @NodeAnotation(title="列表")
     */
    public function index()
    {
        return $this->fetch();
    }

    /**
     * @NodeAnotation(title="保存")
     */
    public function save()
    {
        $this->checkPostRequest();

        $post = $this->request->except(['group_name'], 'post');

        $group_name = $this->request->post('group_name');

        try {
            foreach ($post as $key => $val) {

                if (empty($group_name)) {

                    $this->model
                        ->where('name', $key)
                        ->update([
                            'value' => $val,
                        ]);
                } else {
                    $model_config = SystemConfig::where('group', $group_name)
                        ->where('name', $key)
                        ->find();

                    if (empty($model_config)) {
                        $model_config = SystemConfig::create([
                            'group' => $group_name,
                            'name' => $key,
                            'value' => $val
                        ]);
                    }

                    $model_config->save([
                        'value' => $val
                    ]);
                }
            }
            TriggerService::updateMenu();
            TriggerService::updateSysconfig();
        } catch (\Exception $e) {
            $this->error('保存失败');
        }
        $this->success('保存成功');
    }
}
