<?php
namespace app\index\controller;
use think\facade\View;
use think\facade\Db;
class Index
{
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
   
 
      return view('',[
           'mall_cateData'=>$mall_cateData,
           'mallt_cateData'=>$mallt_cateData, //sslphp网址导航
           'categoryList' => $categoryList,
        'goodsList' => $goodsList,
        'count' => $count,  //统计
        'flinkData'=>$flinkData,
       ]);
  

      

   // return view();

    }

 //   public function sss()
  //  {
 //       hook('testhook', ['id'=>1]);
 //   }
// 首先，我们需要在控制器中编写查询方法


      

   // return view();

    }
   

