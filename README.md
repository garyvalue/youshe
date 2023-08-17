
## 安装说明  
上传代码到你的网站根目录，宝塔运行目录选择public  
1.需要在根目录执行 composer install  
2.修改env数据库配置文件  
3.导入数据库  
4.宝塔搭建直接选择thinkphp伪静态  

## 安装教程

>ulthon_admin 使用 Composer 来管理项目依赖。因此，在使用 ulthon_admin 之前，请确保你的机器已经安装了 Composer。

> 建议设置composer的镜像为阿里镜像源

### 通过git下载安装包，composer安装依赖包

```bash
第一步，下载安装包
git clone https://gitee.com/ulthon/ulthon_admin

或者使用composer创建
composer create-project ulthon/ulthon_admin


第二步，安装依赖包(使用composer创建可忽略)
composer install

第三步, 配置`.env`
复制`.example.env`为`.env`
修改`env`文件

[DATABASE]
TYPE=mysql
HOSTNAME=host.docker.internal
DATABASE=ulthon
USERNAME=root
PASSWORD=root
HOSTPORT=3306
CHARSET=utf8
DEBUG=true
PREFIX=ul_


第四步, 安装数据库
php think migrate:run

第五步，初始化数据库数据
php think seed:run

最后，本地临时运行
php think run

```

