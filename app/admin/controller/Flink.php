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

class Flink extends AdminController
{
//列表
public function index()
{
    $flinkData=Db::name('flink')->paginate(10);//数据表名=data
    return view('',[
        'flinkData'=>$flinkData
]);
}

//添加数据
public function add(){
    if(request()->isPost()){
        $data=input('post.');
        $res=Db::name('flink')->insert($data);
        if($res){
            return json(['status'=>6,'info'=>'操作完成-OJBK']);
        }else{
            return json(['status'=>5,'info'=>'操作失败-不OJBK']);
        }
    }else{
        return view();
    }
}

//修改数据
public function edit2(){
    $id=input('id');
    $flinkData=Db::name('flink')->find($id);
    return view('',[
        'flinkData'=>$flinkData
    ]);
}

//更新
/*
public function update(){
    $data=input('post.');
    $res=Db::name('flink')->update($data);
    if($res){
        return json(['status'=>6,'info'=>'操作完成-OJBK']);
    }else{
        return json(['status'=>5,'info'=>'操作失败-不OJBK']);
    }
}

*/


public function update(){
    $data = input('post.');
    $id = input('id'); // 获取更新条件
    $res = Db::name('flink')->where('id', $id)->update($data); // 添加更新条件
    if($res){
        return json(['status'=>6,'info'=>'操作完成-OJBK']);
    }else{
        return json(['status'=>5,'info'=>'操作失败-不OJBK']);
    }
}





//删除
public function del(){
    $id=input('id');
    $res=Db::name('flink')->delete($id);
    if($res){
        return json(['status'=>6,'info'=>'操作完成-OJBK']);
    }else{
        return json(['status'=>5,'info'=>'操作失败-不OJBK']);
    }
}
}
?>