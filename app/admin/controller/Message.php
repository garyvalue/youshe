<?php

namespace app\admin\controller;
use app\admin\model\SystemAdmin;
use app\admin\model\SystemQuick;
use app\common\controller\AdminController;
use think\App;
use think\facade\Env;

use think\facade\Config;
use think\facade\Db;
use think\facade\View;
use util\Sql;

class message extends AdminController
{
//列表
public function index()
{
    $messageData=Db::name('message')->paginate(10);//数据表名=data
    return view('',[
        'messageData'=>$messageData
]);
}





//删除
public function del(){
    $id=input('id');
    $res=Db::name('message')->delete($id);
    if($res){
        return json(['status'=>6,'info'=>'操作完成-OJBK']);
    }else{
        return json(['status'=>5,'info'=>'操作失败-不OJBK']);
    }
}
}
?>