<?php
namespace app\index\controller;

use think\facade\Request;
use think\facade\View;
use think\facade\Db;

class Message
{
    // 前台留言板页面
    public function index()
    {

        $flinkData=Db::name('flink')->paginate(10);//数据表名=data
        $mall_cateData=Db::name('mall_cate')->paginate(100);//数据表名=data
        $mallt_cateData=Db::name('mallt_cate')->paginate(100);//sslphp数据表名=data
       // 查询分类信息
      // 查询所有分类
      $categoryList = Db::name('mall_cate')->select();
  
      // 查询所有商品
      $goodsList = Db::name('mall_goods')->select();
  
      //统计所有
      $count = Db::name('mall_goods')->count();




        return View::fetch('index',[
            'mall_cateData'=>$mall_cateData,
            'mallt_cateData'=>$mallt_cateData, //sslphp网址导航
            'categoryList' => $categoryList,
         'goodsList' => $goodsList,
         'count' => $count,  //统计
         'flinkData'=>$flinkData,]);
    }

    // 提交留言
    public function submit()
    {
        // 获取表单数据并进行安全验证
        $data = [
            'name' => htmlspecialchars(Request::post('name')),
            'url' => htmlspecialchars(Request::post('url')),
            'description' => htmlspecialchars(Request::post('description')),
            'wechat' => htmlspecialchars(Request::post('wechat')),
        ];

        // 将数据存入数据库
        $result = Db::name('message')->insert($data);
        if ($result) {
            return '留言提交成功！';
        } else {
            return '留言提交失败！';
        }
    }
}
