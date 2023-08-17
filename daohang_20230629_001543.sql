-- MySQL dump 10.13  Distrib 5.6.50, for Linux (x86_64)
--
-- Host: localhost    Database: daohang
-- ------------------------------------------------------
-- Server version	5.6.50-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ul_debug_log`
--

DROP TABLE IF EXISTS `ul_debug_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ul_debug_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` char(30) NOT NULL DEFAULT '',
  `level` char(255) NOT NULL DEFAULT '',
  `content` text NOT NULL,
  `create_time_title` char(30) NOT NULL DEFAULT '',
  `create_time` int(11) NOT NULL DEFAULT '0',
  `app_name` char(30) NOT NULL DEFAULT '',
  `controller_name` char(30) NOT NULL DEFAULT '',
  `action_name` char(30) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `uid` (`uid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='日志表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ul_debug_log`
--

LOCK TABLES `ul_debug_log` WRITE;
/*!40000 ALTER TABLE `ul_debug_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `ul_debug_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ul_flink`
--

DROP TABLE IF EXISTS `ul_flink`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ul_flink` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `url` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=26 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='友情链接';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ul_flink`
--

LOCK TABLES `ul_flink` WRITE;
/*!40000 ALTER TABLE `ul_flink` DISABLE KEYS */;
INSERT INTO `ul_flink` VALUES (8,'图酷网','https://www.tukuv.com');
/*!40000 ALTER TABLE `ul_flink` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ul_mall_cate`
--

DROP TABLE IF EXISTS `ul_mall_cate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ul_mall_cate` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` char(20) NOT NULL DEFAULT '' COMMENT '分类名',
  `image` char(255) NOT NULL DEFAULT '' COMMENT '分类图片 {image}',
  `sort` int(11) NOT NULL DEFAULT '0' COMMENT '排序',
  `status` int(1) NOT NULL DEFAULT '2' COMMENT '状态 {radio} (1:禁用,2:启用)',
  `remark` char(255) NOT NULL DEFAULT '' COMMENT '备注说明',
  `create_time` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  `update_time` int(11) unsigned NOT NULL DEFAULT '0',
  `delete_time` int(11) unsigned NOT NULL DEFAULT '0',
  `url` text NOT NULL COMMENT 'URL',
  PRIMARY KEY (`id`),
  KEY `title` (`title`),
  KEY `delete_time` (`delete_time`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COMMENT='商品分类';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ul_mall_cate`
--

LOCK TABLES `ul_mall_cate` WRITE;
/*!40000 ALTER TABLE `ul_mall_cate` DISABLE KEYS */;
INSERT INTO `ul_mall_cate` VALUES (2,'国内推荐','/storage/upload/20230530/6476128e23b5d.png',0,2,'ico icon-icon-group-hot',1685459601,1685469372,0,'#hot'),(3,'高清图库','/storage/upload/20230530/647612c88b565.png',0,2,'ico icon-message',1685459658,1687965110,0,'#smart2'),(4,'设计教程','/storage/upload/20230530/647612f50faf4.png',0,2,'ico icon-i-illustration',1685459702,1687965139,0,'#smart'),(5,'灵感创意','/storage/upload/20230530/647612f50faf4.png',0,2,'ico icon-nav-hot-1',1685469069,1687965161,0,'#smart4'),(6,'素材资源','/storage/upload/20230530/6476128e23b5d.png',0,2,'ico icon-i-img',1685469238,1687965180,0,'#smart9'),(7,'字体下载','/storage/upload/20230530/647612f50faf4.png',0,2,'ico icon-nav-icon-7',1685469324,1687965197,0,'#smart7'),(8,'设计工具','/storage/upload/20230530/647612f50faf4.png',0,2,'ico icon-i-c4d',1685469435,1687965213,0,'#smart5'),(9,'摄影美图','/storage/upload/20230530/647612f50faf4.png',0,2,'ico icon-graphic',1685469493,1687965224,0,'#smart8'),(10,'二次元','/storage/upload/20230530/647612f50faf4.png',0,2,'ico icon-article-2',1685469528,1687965243,0,'#smart6'),(11,'配色方案','/storage/upload/20230530/647612f50faf4.png',0,2,'ico icon-nav-icon-21',1685469603,1687965258,0,'#smart10'),(12,'酷站模板','/storage/upload/20230530/647612f50faf4.png',0,2,'ico icon-nav-uiii-1',1685469640,1687965274,0,'#study'),(13,'短视频','/storage/upload/20230530/647612f50faf4.png',0,2,'ico icon-nav-icon-5',1685469690,1687965294,0,'#gadget'),(14,'高效办公','/storage/upload/20230530/647612f50faf4.png',0,2,'ico icon-nav-icon-2',1685469727,1687965331,0,'#program'),(15,'前端开发','/storage/upload/20230530/647612f50faf4.png',0,2,'ico icon-nav-hao-2',1685469771,1687965351,0,'#institution'),(16,'尺寸适配','/storage/upload/20230530/647612f50faf4.png',0,2,'ico icon-fans',1685469878,1687965392,0,'#smart12'),(17,'图标/LOGO','/storage/upload/20230530/647612f50faf4.png',0,2,'ico icon-nav-icon-13',1685469914,1687965414,0,'#smart11');
/*!40000 ALTER TABLE `ul_mall_cate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ul_mall_goods`
--

DROP TABLE IF EXISTS `ul_mall_goods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ul_mall_goods` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cate_id` bigint(20) unsigned NOT NULL COMMENT '分类ID',
  `title` char(20) NOT NULL DEFAULT '' COMMENT '商品名称',
  `tag` char(100) NOT NULL DEFAULT '' COMMENT '商品标签',
  `logo` char(255) NOT NULL COMMENT '商品logo {image}',
  `images` text NOT NULL COMMENT '商品图片 {images}',
  `describe` text NOT NULL COMMENT '商品描述 {editor}',
  `property` text NOT NULL COMMENT '商品属性',
  `market_price` decimal(8,2) NOT NULL DEFAULT '0.00' COMMENT '市场价',
  `discount_price` decimal(8,2) NOT NULL DEFAULT '0.00' COMMENT '折扣价',
  `sales` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '销量',
  `virtual_sales` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '虚拟销量',
  `stock` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '库存',
  `total_stock` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '总库存',
  `sort` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '排序',
  `status` int(1) unsigned NOT NULL DEFAULT '0' COMMENT '状态 {radio} (0:正常,1:禁用)',
  `remark` char(255) NOT NULL DEFAULT '' COMMENT '备注说明',
  `create_time` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  `update_time` int(11) unsigned NOT NULL DEFAULT '0',
  `delete_time` int(11) unsigned NOT NULL DEFAULT '0',
  `license` varchar(100) NOT NULL COMMENT '授权文件 {file}',
  `license_name` varchar(100) NOT NULL COMMENT '授权文件名称',
  PRIMARY KEY (`id`),
  KEY `cate_id` (`cate_id`),
  KEY `delete_time` (`delete_time`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8 COMMENT='商品列表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ul_mall_goods`
--

LOCK TABLES `ul_mall_goods` WRITE;
/*!40000 ALTER TABLE `ul_mall_goods` DISABLE KEYS */;
INSERT INTO `ul_mall_goods` VALUES (26,17,'图酷网','1','https://www.tukuv.com/wp-content/uploads/2022/03/1647404389-QQ图片20220308230454.jpg','/storage/upload/20230530/647613c2b603c.jpg','&lt;p&gt;图酷网（TUKUV.COM）集logo设计,VI设计,形象IP设计,版权登记,商标注册,设计教程,插件预设等众多服务为一体，致力于打造LOGO设计行业的一站式交互平台。&lt;/p&gt;\n','',0.00,0.00,0,0,0,0,0,0,'https://www.tukuv.com/',1687182371,1687965459,0,'1','1'),(27,2,' IconFont','','https://image.uisdc.com/wp-content/uploads/2023/04/hao-nav-iconfont.jpg','https://www.tukuv.com/wp-content/uploads/2022/03/1647404389-QQ图片20220308230454.jpg','国内最著名的图标搜索及管理平台，超2300万个图标下载\n','[{&quot;name&quot;:&quot;1&quot;,&quot;value&quot;:&quot;1&quot;}]',0.00,0.00,0,0,0,0,0,0,'https://www.iconfont.cn/',1687968826,1687968906,0,'1','1');
/*!40000 ALTER TABLE `ul_mall_goods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ul_mall_tag`
--

DROP TABLE IF EXISTS `ul_mall_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ul_mall_tag` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` char(20) NOT NULL DEFAULT '' COMMENT '商品名称',
  `create_time` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  `update_time` int(11) unsigned NOT NULL DEFAULT '0',
  `delete_time` int(11) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `delete_time` (`delete_time`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='商品标签';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ul_mall_tag`
--

LOCK TABLES `ul_mall_tag` WRITE;
/*!40000 ALTER TABLE `ul_mall_tag` DISABLE KEYS */;
INSERT INTO `ul_mall_tag` VALUES (1,'LOGO设计',1687182753,1687182753,0);
/*!40000 ALTER TABLE `ul_mall_tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ul_mallt_cate`
--

DROP TABLE IF EXISTS `ul_mallt_cate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ul_mallt_cate` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` char(20) NOT NULL DEFAULT '' COMMENT '分类名',
  `image` char(255) NOT NULL DEFAULT '' COMMENT '分类图片 {image}',
  `sort` int(11) NOT NULL DEFAULT '0' COMMENT '排序',
  `status` int(1) NOT NULL DEFAULT '2' COMMENT '状态 {radio} (1:禁用,2:启用)',
  `remark` char(255) NOT NULL DEFAULT '' COMMENT '备注说明',
  `create_time` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  `update_time` int(11) unsigned NOT NULL DEFAULT '0',
  `delete_time` int(11) unsigned NOT NULL DEFAULT '0',
  `url` text NOT NULL COMMENT 'URL',
  PRIMARY KEY (`id`),
  KEY `title` (`title`),
  KEY `delete_time` (`delete_time`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COMMENT='商品分类';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ul_mallt_cate`
--

LOCK TABLES `ul_mallt_cate` WRITE;
/*!40000 ALTER TABLE `ul_mallt_cate` DISABLE KEYS */;
INSERT INTO `ul_mallt_cate` VALUES (18,'标志君','/storage/upload/20230530/647612f50faf4.png',0,1,'icon icon-nav-ai',1685499568,1687183838,0,'https://www.tukuv.com'),(19,'图酷中国','/storage/upload/20230530/647612f50faf4.png',0,1,'icon icon-nav-hao-1',1685499840,1687183933,0,'https://www.tucool.cn'),(20,'标志网','/storage/upload/20230530/647612f50faf4.png',0,1,'icon icon-nav-hao-1',1686981016,1687183908,0,'https://www.logoi.cn/');
/*!40000 ALTER TABLE `ul_mallt_cate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ul_message`
--

DROP TABLE IF EXISTS `ul_message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ul_message` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL COMMENT '网站名称',
  `url` varchar(255) NOT NULL COMMENT '网站URL',
  `description` text NOT NULL COMMENT '网站介绍',
  `wechat` varchar(255) NOT NULL COMMENT '联系微信号',
  `submit_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COMMENT='留言板';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ul_message`
--

LOCK TABLES `ul_message` WRITE;
/*!40000 ALTER TABLE `ul_message` DISABLE KEYS */;
INSERT INTO `ul_message` VALUES (4,'AI网址导航','http://ai.goolibao.com','一个网址导航网站','SSLphp','2023-06-19 20:48:16'),(5,'图酷测试','http://wanghui.cool/','图酷测试图酷测试图酷测试图酷测试图酷测试图酷测试','wanghui','2023-06-22 19:32:37');
/*!40000 ALTER TABLE `ul_message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ul_migrations`
--

DROP TABLE IF EXISTS `ul_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ul_migrations` (
  `version` bigint(20) NOT NULL,
  `migration_name` varchar(100) DEFAULT NULL,
  `start_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `end_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `breakpoint` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ul_migrations`
--

LOCK TABLES `ul_migrations` WRITE;
/*!40000 ALTER TABLE `ul_migrations` DISABLE KEYS */;
INSERT INTO `ul_migrations` VALUES (20220419022952,'SystemAdmin','2023-05-30 14:40:07','2023-05-30 14:40:07',0),(20220419030557,'SystemAuth','2023-05-30 14:40:07','2023-05-30 14:40:07',0),(20220419031101,'SystemAuthNode','2023-05-30 14:40:07','2023-05-30 14:40:07',0),(20220419031527,'SystemConfig','2023-05-30 14:40:07','2023-05-30 14:40:07',0),(20220419032028,'SystemMenu','2023-05-30 14:40:07','2023-05-30 14:40:07',0),(20220419032642,'SystemNode','2023-05-30 14:40:07','2023-05-30 14:40:07',0),(20220419033507,'SystemQuick','2023-05-30 14:40:07','2023-05-30 14:40:07',0),(20220419034810,'SystemUploadfile','2023-05-30 14:40:07','2023-05-30 14:40:07',0),(20220419102226,'DebugLog','2023-05-30 14:40:07','2023-05-30 14:40:07',0),(20220419102635,'MallCate','2023-05-30 14:40:07','2023-05-30 14:40:07',0),(20220419102916,'MallGoods','2023-05-30 14:40:07','2023-05-30 14:40:07',0),(20220709061205,'MallTag','2023-05-30 14:40:07','2023-05-30 14:40:07',0),(20220905222557,'TestGoods','2023-05-30 14:40:07','2023-05-30 14:40:08',0);
/*!40000 ALTER TABLE `ul_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ul_system_admin`
--

DROP TABLE IF EXISTS `ul_system_admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ul_system_admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `auth_ids` char(255) NOT NULL DEFAULT '' COMMENT '角色权限ID',
  `head_img` char(255) NOT NULL DEFAULT '' COMMENT '头像',
  `username` char(50) NOT NULL DEFAULT '' COMMENT '用户登录名',
  `password` char(40) NOT NULL DEFAULT '' COMMENT '用户密码',
  `phone` char(16) NOT NULL DEFAULT '' COMMENT '联系手机号',
  `remark` char(255) NOT NULL DEFAULT '' COMMENT '备注说明',
  `login_num` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '登录次数',
  `sort` int(11) NOT NULL DEFAULT '0' COMMENT '排序',
  `status` int(1) unsigned NOT NULL DEFAULT '1' COMMENT '状态 {radio} (0:禁用,1:启用,)',
  `create_time` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  `update_time` int(11) unsigned NOT NULL DEFAULT '0',
  `delete_time` int(11) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `username` (`username`),
  KEY `phone` (`phone`),
  KEY `delete_time` (`delete_time`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COMMENT='系统用户表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ul_system_admin`
--

LOCK TABLES `ul_system_admin` WRITE;
/*!40000 ALTER TABLE `ul_system_admin` DISABLE KEYS */;
INSERT INTO `ul_system_admin` VALUES (1,'','http://127.0.0.3/storage/upload/20230531/64775f5209841.png','admin','e44804c3e541099ca197f4cf03c6b95ad9efc6ff','','',18,0,1,1685457618,1687965633,0),(2,'1','/static/common/images/head.png','tucool','e44804c3e541099ca197f4cf03c6b95ad9efc6ff','13018864044','',1,0,1,1686980176,1687000136,0);
/*!40000 ALTER TABLE `ul_system_admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ul_system_auth`
--

DROP TABLE IF EXISTS `ul_system_auth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ul_system_auth` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` char(20) NOT NULL COMMENT '权限名称',
  `sort` int(11) NOT NULL DEFAULT '0' COMMENT '排序',
  `status` int(1) NOT NULL DEFAULT '0' COMMENT '状态 {radio} (1:禁用,2:启用)',
  `remark` char(255) NOT NULL DEFAULT '' COMMENT '备注说明',
  `create_time` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  `update_time` int(11) unsigned NOT NULL DEFAULT '0',
  `delete_time` int(11) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `title` (`title`),
  KEY `title_2` (`title`),
  KEY `delete_time` (`delete_time`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COMMENT='系统权限表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ul_system_auth`
--

LOCK TABLES `ul_system_auth` WRITE;
/*!40000 ALTER TABLE `ul_system_auth` DISABLE KEYS */;
INSERT INTO `ul_system_auth` VALUES (1,'管理员',1,1,'测试管理员',1685457618,1685457618,0),(6,'游客权限',0,1,'',1685457618,1685457618,0);
/*!40000 ALTER TABLE `ul_system_auth` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ul_system_auth_node`
--

DROP TABLE IF EXISTS `ul_system_auth_node`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ul_system_auth_node` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `auth_id` bigint(20) unsigned NOT NULL COMMENT '角色ID',
  `node_id` bigint(20) unsigned NOT NULL COMMENT '节点ID',
  PRIMARY KEY (`id`),
  KEY `auth_id` (`auth_id`),
  KEY `node_id` (`node_id`)
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=utf8 COMMENT='角色与节点关系表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ul_system_auth_node`
--

LOCK TABLES `ul_system_auth_node` WRITE;
/*!40000 ALTER TABLE `ul_system_auth_node` DISABLE KEYS */;
INSERT INTO `ul_system_auth_node` VALUES (1,1,1),(2,1,2),(3,1,3),(4,1,4),(5,1,5),(6,1,6),(7,1,7),(8,1,8),(9,1,9),(10,1,10),(11,1,11),(12,1,12),(13,1,13),(14,1,14),(15,1,15),(16,1,16),(17,1,17),(18,1,18),(19,1,19),(20,1,20),(21,1,21),(22,1,22),(23,1,23),(24,1,24),(25,1,25),(26,1,26),(27,1,27),(28,1,28),(29,1,29),(30,1,30),(31,1,31),(32,1,32),(33,1,33),(34,1,34),(35,1,35),(36,1,36),(37,1,37),(38,1,38),(39,1,39),(40,1,40),(41,1,41),(42,1,42),(43,1,43),(44,1,44),(45,1,45),(46,1,46),(47,1,47),(48,1,48),(49,1,49),(50,1,50),(51,1,51),(52,1,92),(53,1,52),(54,1,53),(55,1,54),(56,1,55),(57,1,56),(58,1,57),(59,1,58),(60,1,59),(61,1,60),(62,1,61),(63,1,62),(64,1,63),(65,1,64),(66,1,65),(67,1,66),(68,1,69),(69,1,70),(70,1,71),(71,1,72),(72,1,73),(73,1,74),(74,1,75),(75,1,76),(76,1,77),(77,1,78),(78,1,79),(79,1,80),(80,1,81),(81,1,82),(82,1,83),(83,1,84),(84,1,85),(85,1,86),(86,1,87),(87,1,88),(88,1,89),(89,1,90),(90,1,91),(91,1,93),(92,1,94),(93,1,95),(94,1,96),(95,1,97),(96,1,98),(97,1,99),(98,1,100),(99,1,101),(100,1,102),(101,1,103),(102,1,104),(103,1,105);
/*!40000 ALTER TABLE `ul_system_auth_node` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ul_system_config`
--

DROP TABLE IF EXISTS `ul_system_config`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ul_system_config` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(30) NOT NULL DEFAULT '' COMMENT '变量名',
  `group` char(30) NOT NULL DEFAULT '' COMMENT '分组',
  `value` text NOT NULL COMMENT '变量值',
  `remark` char(100) NOT NULL DEFAULT '' COMMENT '备注信息',
  `sort` int(11) NOT NULL DEFAULT '0' COMMENT '排序',
  `create_time` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  `update_time` int(11) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `name` (`name`),
  KEY `group` (`group`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8 COMMENT='系统配置表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ul_system_config`
--

LOCK TABLES `ul_system_config` WRITE;
/*!40000 ALTER TABLE `ul_system_config` DISABLE KEYS */;
INSERT INTO `ul_system_config` VALUES (1,'base_admin_install','system','1','系统初始化锁定，请勿修改，避免插入重复数据',0,1685457618,1685457618),(2,'alisms_access_key_id','sms','填你的','阿里大于公钥',0,1685457618,1685457618),(3,'alisms_access_key_secret','sms','填你的','阿里大鱼私钥',0,1685457618,1685457618),(4,'upload_type','upload','local_public','当前上传方式 local_public,alioss,qnoss,txoss）',0,1685457618,1685457618),(5,'upload_allow_ext','upload','jpg,jpeg,png,gif,bmp,doc,docx,xls,xlsx,ppt,pptx,pdf,zip,rar,7z,txt,mp3,wma,wav,mid,m4a,mp4,avi,wmv,3gp,flv,webp,svg,ico','允许上传的文件类型',0,1685457618,1685457618),(6,'upload_allow_size','upload','10240000','允许上传的大小',0,1685457618,1687784122),(7,'upload_allow_mime','upload','image/gif,image/jpeg,video/x-msvideo,text/plain,image/png','允许上传的文件mime',0,1685457618,1685457618),(8,'upload_allow_type','upload','local_public,alioss,qnoss,txcos','可用的上传文件方式',0,1685457618,1685457618),(9,'alioss_access_key_id','upload','填你的','阿里云oss公钥',0,1685457618,1685457618),(10,'alioss_access_key_secret','upload','填你的','阿里云oss私钥',0,1685457618,1685457618),(11,'alioss_endpoint','upload','填你的','阿里云oss数据中心',0,1685457618,1685457618),(12,'alioss_bucket','upload','填你的','阿里云oss空间名称',0,1685457618,1685457618),(13,'alioss_domain','upload','填你的','阿里云oss访问域名',0,1685457618,1685457618),(14,'logo_title','site','图酷网址导航','LOGO标题',0,1685457618,1685457618),(15,'logo_image','site','/storage/upload/20230531/logo.png','logo图片',0,1685457618,1685457618),(16,'site_keywords','site','图酷网,图酷导航,设计导航,设计网站,设计师网站,设计师网站导航,优设网,设计师网址导航,优设导航,设计师导航,SDC设计师导航,UI设计,ps教程,设计教程,优秀网页设计,素材下载,用户体验','SEO关键字',0,1685457618,1687958488),(17,'site_ico','site','/storage/upload/20230531/64763f8fe7724.ico','浏览器图标',0,1685457618,1685471125),(18,'site_copyright','site','图酷网址导航','版权信息',0,1685457618,1686980099),(19,'site_beian','site','陕ICP备2021015538号-6','备案信息',0,1685457618,1687958772),(20,'site_version','site','2.0.0','版本信息',0,1685457618,1685457618),(21,'sms_type','sms','alisms','短信类型',0,1685457618,1685457618),(22,'miniapp_appid','wechat','填你的','小程序公钥',0,1685457618,1685457618),(23,'miniapp_appsecret','wechat','填你的','小程序私钥',0,1685457618,1685457618),(24,'web_appid','wechat','填你的','公众号公钥',0,1685457618,1685457618),(25,'web_appsecret','wechat','填你的','公众号私钥',0,1685457618,1685457618),(26,'txcos_secret_id','upload','填你的','腾讯云cos密钥',0,1685457618,1685457618),(27,'txcos_secret_key','upload','填你的','腾讯云cos私钥',0,1685457618,1685457618),(28,'txcos_region','upload','填你的','存储桶地域',0,1685457618,1685457618),(29,'txcos_bucket','upload','填你的','存储桶名称',0,1685457618,1685457618),(30,'qnoss_access_key','upload','填你的','访问密钥',0,1685457618,1685457618),(31,'qnoss_secret_key','upload','填你的','安全密钥',0,1685457618,1685457618),(32,'qnoss_bucket','upload','填你的','存储空间',0,1685457618,1685457618),(33,'qnoss_domain','upload','填你的','访问域名',0,1685457618,1685457618),(34,'txcos_domain','upload','填你的','访问域名',0,1685457618,1685457618),(35,'txcos_appid','upload','填你的','APPID',0,1685457618,1685457618),(36,'file','site','','',0,1685457618,1685457618),(37,'site_domain','site','https://hao.tukuv.com/','',0,1685457618,1687782296),(38,'site_default_password','site','','',0,1685471125,1685471125),(39,'site_js_insert','site','','',0,1685471125,1685471125),(40,'site_description','site','图酷导航2022年上线至今，是图酷网旗下最专业好用的设计师导航网站！','网站描述',0,1685457618,1687958488),(41,'site_name','site','图酷导航官网 - 设计导航 - 国内专业设计师网站导航','',0,1685496952,1687958488),(42,'w_image','site','/storage/upload/20230531/2023021922114313.png','微信公众号图片',0,1685457618,1685457618),(43,'site_weibourl','site','https://hao.tukuv.com/','微博链接',0,1685457618,1687782296),(44,'site_xiaohongshuurl','site','https://hao.tukuv.com/','小红书链接',0,1685457618,1687782296),(45,'site_shangwuurl','site','https://hao.tukuv.com/','商务联系链接',0,1685457618,1687782296),(46,'wx_image','site','/storage/upload/20230531/weixin.jpg','加微信图片',0,1685457618,1685457618),(47,'site_yanse','site','rgba(65,127,249,0.9)','导航颜色',0,1685457618,1685522473),(48,'site_yanse2','site','#ff6000','侧边导航颜色',0,1685457618,1685598955),(49,'local_domain','upload','https://hao.tukuv.com/','',0,1687003892,1687784135),(50,'site_foot-top','site','#2770ff','',0,1687782295,1687782427),(51,'site_footyanse','site','#417ff9','',0,1687782296,1687782427),(52,'site_foot-zi','site','#fff','',0,1687782296,1687782427);
/*!40000 ALTER TABLE `ul_system_config` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ul_system_menu`
--

DROP TABLE IF EXISTS `ul_system_menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ul_system_menu` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pid` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '父id',
  `title` char(100) NOT NULL DEFAULT '' COMMENT '名称',
  `icon` char(100) NOT NULL DEFAULT '' COMMENT '菜单图标',
  `href` char(100) NOT NULL DEFAULT '' COMMENT '链接',
  `auth_node` char(100) NOT NULL DEFAULT '' COMMENT '权限标志',
  `params` text NOT NULL COMMENT '链接参数',
  `target` char(20) NOT NULL DEFAULT '_self' COMMENT '链接打开方式',
  `sort` int(11) NOT NULL DEFAULT '0' COMMENT '排序',
  `status` int(1) NOT NULL DEFAULT '1' COMMENT '状态 {radio} (0:禁用,1:启用)',
  `remark` char(255) NOT NULL DEFAULT '' COMMENT '备注说明',
  `create_time` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  `update_time` int(11) unsigned NOT NULL DEFAULT '0',
  `delete_time` int(11) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `title` (`title`),
  KEY `href` (`href`),
  KEY `delete_time` (`delete_time`)
) ENGINE=InnoDB AUTO_INCREMENT=265 DEFAULT CHARSET=utf8 COMMENT='系统菜单表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ul_system_menu`
--

LOCK TABLES `ul_system_menu` WRITE;
/*!40000 ALTER TABLE `ul_system_menu` DISABLE KEYS */;
INSERT INTO `ul_system_menu` VALUES (227,99999999,'后台首页','fa fa-home','index/welcome','','','_self',0,1,'',1685457618,1685457618,0),(228,0,'系统管理','fa fa-cog','','','','_self',0,1,'',1685457618,1685457618,0),(234,228,'菜单管理','fa fa-tree','system.menu/index','','','_self',10,1,'',1685457618,1685457618,0),(244,228,'管理员管理','fa fa-user','system.admin/index','','','_self',12,1,'',1685457618,1685457618,0),(245,228,'角色管理','fa fa-bitbucket-square','system.auth/index','','','_self',11,1,'',1685457618,1685457618,0),(246,228,'节点管理','fa fa-list','system.node/index','','','_self',9,1,'',1685457618,1685457618,0),(247,228,'配置管理','fa fa-asterisk','system.config/index','','','_self',8,1,'',1685457618,1685457618,0),(248,228,'上传管理','fa fa-arrow-up','system.uploadfile/index','','','_self',0,1,'',1685457618,1685457618,0),(249,0,'图酷导航管理','fa fa-list','','','','_self',0,1,'',1685457618,1687183753,0),(250,249,'AI导航分类','fa fa-calendar-check-o','mall.cate/index','','','_self',0,1,'',1685457618,1685458262,0),(251,249,'内容管理','fa fa-list','mall.goods/index','','','_self',0,1,'',1685457618,1685459385,0),(252,228,'快捷入口','fa fa-list','system.quick/index','','','_self',0,1,'',1685457618,1685457618,0),(253,228,'日志管理','fa fa-connectdevelop','debug.log/index','','','_self',0,1,'',1685457618,1685457618,0),(254,249,'导航标签','fa fa-connectdevelop','mall.tag/index','','','_self',0,1,'',1685457618,1685458291,0),(255,0,'图酷导航','fa fa-list','','','','_self',0,1,'',1685457618,1687183780,0),(256,255,'导航分类','fa fa-calendar-check-o','mallt.cate/index','','','_self',0,1,'',1685457618,1687183788,0),(261,0,'友情链接','fa fa-list','','','','_self',0,1,'',1685457618,1687183780,0),(262,261,'链接管理','fa fa-calendar-check-o','flink/index','','','_self',0,1,'',1685457618,1687183788,0),(263,0,'提交链接管理','fa fa-list','','','','_self',0,1,'',1685457618,1687183780,0),(264,263,'链接管理','fa fa-calendar-check-o','message/index','','','_self',0,1,'',1685457618,1687183788,0);
/*!40000 ALTER TABLE `ul_system_menu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ul_system_node`
--

DROP TABLE IF EXISTS `ul_system_node`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ul_system_node` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `node` char(100) NOT NULL DEFAULT '' COMMENT '节点代码',
  `title` char(255) NOT NULL DEFAULT '' COMMENT '节点标题',
  `type` int(1) unsigned NOT NULL COMMENT '节点类型（1：控制器，2：节点）',
  `is_auth` int(1) unsigned NOT NULL DEFAULT '1' COMMENT '是否启动RBAC权限控制',
  `create_time` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  `update_time` int(11) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `node` (`node`)
) ENGINE=InnoDB AUTO_INCREMENT=106 DEFAULT CHARSET=utf8 COMMENT='系统节点表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ul_system_node`
--

LOCK TABLES `ul_system_node` WRITE;
/*!40000 ALTER TABLE `ul_system_node` DISABLE KEYS */;
INSERT INTO `ul_system_node` VALUES (1,'system.admin','管理员管理',1,1,1657347263,1657347263),(2,'system.admin/index','列表',2,1,1657347263,1657347263),(3,'system.admin/add','添加',2,1,1657347263,1657347263),(4,'system.admin/edit','编辑',2,1,1657347263,1657347263),(5,'system.admin/password','编辑',2,1,1657347263,1657347263),(6,'system.admin/delete','删除',2,1,1657347263,1657347263),(7,'system.admin/modify','属性修改',2,1,1657347263,1657347263),(8,'system.admin/export','导出',2,1,1657347264,1657347264),(9,'system.auth','角色权限管理',1,1,1657347264,1657347264),(10,'system.auth/authorize','授权',2,1,1657347264,1657347264),(11,'system.auth/saveAuthorize','授权保存',2,1,1657347264,1657347264),(12,'system.auth/index','列表',2,1,1657347264,1657347264),(13,'system.auth/add','添加',2,1,1657347264,1657347264),(14,'system.auth/edit','编辑',2,1,1657347264,1657347264),(15,'system.auth/delete','删除',2,1,1657347265,1657347265),(16,'system.auth/export','导出',2,1,1657347265,1657347265),(17,'system.auth/modify','属性修改',2,1,1657347265,1657347265),(18,'system.config','系统配置管理',1,1,1657347265,1657347265),(19,'system.config/index','列表',2,1,1657347265,1657347265),(20,'system.config/save','保存',2,1,1657347265,1657347265),(21,'system.menu','菜单管理',1,1,1657347265,1657347265),(22,'system.menu/index','列表',2,1,1657347265,1657347265),(23,'system.menu/add','添加',2,1,1657347266,1657347266),(24,'system.menu/edit','编辑',2,1,1657347266,1657347266),(25,'system.menu/delete','删除',2,1,1657347266,1657347266),(26,'system.menu/modify','属性修改',2,1,1657347266,1657347266),(27,'system.menu/getMenuTips','添加菜单提示',2,1,1657347266,1657347266),(28,'system.menu/export','导出',2,1,1657347266,1657347266),(29,'system.node','系统节点管理',1,1,1657347266,1657347266),(30,'system.node/index','列表',2,1,1657347266,1657347266),(31,'system.node/refreshNode','系统节点更新',2,1,1657347267,1657347267),(32,'system.node/clearNode','清除失效节点',2,1,1657347267,1657347267),(33,'system.node/add','添加',2,1,1657347267,1657347267),(34,'system.node/edit','编辑',2,1,1657347267,1657347267),(35,'system.node/delete','删除',2,1,1657347267,1657347267),(36,'system.node/export','导出',2,1,1657347267,1657347267),(37,'system.node/modify','属性修改',2,1,1657347267,1657347267),(38,'system.uploadfile','上传文件管理',1,1,1657347268,1657347268),(39,'system.uploadfile/index','列表',2,1,1657347268,1657347268),(40,'system.uploadfile/add','添加',2,1,1657347268,1657347268),(41,'system.uploadfile/edit','编辑',2,1,1657347268,1657347268),(42,'system.uploadfile/delete','删除',2,1,1657347268,1657347268),(43,'system.uploadfile/export','导出',2,1,1657347268,1657347268),(44,'system.uploadfile/modify','属性修改',2,1,1657347268,1657347268),(45,'mall.cate','分类管理',1,1,1657347268,1685496194),(46,'mall.cate/index','列表',2,1,1657347269,1657347269),(47,'mall.cate/add','添加',2,1,1657347269,1657347269),(48,'mall.cate/edit','编辑',2,1,1657347269,1657347269),(49,'mall.cate/delete','删除',2,1,1657347269,1657347269),(50,'mall.cate/export','导出',2,1,1657347269,1657347269),(51,'mall.cate/modify','属性修改',2,1,1657347269,1657347269),(52,'mall.goods','导航管理',1,1,1657347269,1685496163),(53,'mall.goods/index','列表',2,1,1657347270,1657347270),(54,'mall.goods/stock','入库',2,1,1657347270,1657347270),(55,'mall.goods/add','添加',2,1,1657347270,1657347270),(56,'mall.goods/edit','编辑',2,1,1657347270,1657347270),(57,'mall.goods/delete','删除',2,1,1657347270,1657347270),(58,'mall.goods/export','导出',2,1,1657347270,1657347270),(59,'mall.goods/modify','属性修改',2,1,1657347270,1657347270),(60,'system.quick','快捷入口管理',1,1,1657347270,1657347270),(61,'system.quick/index','列表',2,1,1657347271,1657347271),(62,'system.quick/add','添加',2,1,1657347271,1657347271),(63,'system.quick/edit','编辑',2,1,1657347271,1657347271),(64,'system.quick/delete','删除',2,1,1657347271,1657347271),(65,'system.quick/export','导出',2,1,1657347271,1657347271),(66,'system.quick/modify','属性修改',2,1,1657347271,1657347271),(69,'debug.log','debug_log',1,1,1657347271,1657347271),(70,'debug.log/index','列表',2,1,1657347272,1657347272),(71,'debug.log/add','添加',2,1,1657347272,1657347272),(72,'debug.log/edit','编辑',2,1,1657347272,1657347272),(73,'debug.log/delete','删除',2,1,1657347272,1657347272),(74,'debug.log/export','导出',2,1,1657347272,1657347272),(75,'debug.log/modify','属性修改',2,1,1657347272,1657347272),(76,'mall.tag','mall_tag',1,1,1657347614,1657347614),(77,'mall.tag/index','列表',2,1,1657347614,1657347614),(78,'mall.tag/add','添加',2,1,1657347615,1657347615),(79,'mall.tag/edit','编辑',2,1,1657347615,1657347615),(80,'mall.tag/delete','删除',2,1,1657347615,1657347615),(81,'mall.tag/export','导出',2,1,1657347615,1657347615),(82,'mall.tag/modify','属性修改',2,1,1657347615,1657347615),(83,'mallt.goods','SSLPHP导航管理',1,1,1657347269,1685496163),(84,'mallt.goods/index','列表',2,1,1657347270,1657347270),(85,'mallt.goods/stock','入库',2,1,1657347270,1657347270),(86,'mallt.goods/add','添加',2,1,1657347270,1657347270),(87,'mallt.goods/edit','编辑',2,1,1657347270,1657347270),(88,'mallt.goods/delete','删除',2,1,1657347270,1657347270),(89,'mallt.goods/export','导出',2,1,1657347270,1657347270),(90,'mallt.goods/modify','属性修改',2,1,1657347270,1657347270),(91,'mallt.cate','sslphpAI导航分类管理',1,1,1657347268,1685496194),(92,'mall.cate/index','列表',2,1,1657347269,1657347269),(93,'mallt.cate/add','添加',2,1,1657347269,1657347269),(94,'mallt.cate/edit','编辑',2,1,1657347269,1657347269),(95,'mallt.cate/delete','删除',2,1,1657347269,1657347269),(96,'mallt.cate/export','导出',2,1,1657347269,1657347269),(97,'mallt.cate/modify','属性修改',2,1,1657347269,1657347269),(98,'mallt.cate/index','列表',2,1,1687000220,1687000220),(99,'mallt.tag','mall_tag',1,1,1687000220,1687000220),(100,'mallt.tag/index','列表',2,1,1687000220,1687000220),(101,'mallt.tag/add','添加',2,1,1687000220,1687000220),(102,'mallt.tag/edit','编辑',2,1,1687000220,1687000220),(103,'mallt.tag/delete','删除',2,1,1687000220,1687000220),(104,'mallt.tag/export','导出',2,1,1687000220,1687000220),(105,'mallt.tag/modify','属性修改',2,1,1687000220,1687000220);
/*!40000 ALTER TABLE `ul_system_node` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ul_system_quick`
--

DROP TABLE IF EXISTS `ul_system_quick`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ul_system_quick` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` char(20) NOT NULL DEFAULT '' COMMENT '快捷入口名称',
  `icon` char(100) NOT NULL DEFAULT '' COMMENT '图标',
  `href` char(255) NOT NULL COMMENT '快捷链接',
  `sort` int(11) NOT NULL DEFAULT '0' COMMENT '排序',
  `status` int(1) unsigned NOT NULL COMMENT '状态 {radio} (1:禁用,2:启用)',
  `remark` char(255) NOT NULL DEFAULT '' COMMENT '备注说明',
  `create_time` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  `update_time` int(11) unsigned NOT NULL DEFAULT '0',
  `delete_time` int(11) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `delete_time` (`delete_time`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COMMENT='系统快捷入口表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ul_system_quick`
--

LOCK TABLES `ul_system_quick` WRITE;
/*!40000 ALTER TABLE `ul_system_quick` DISABLE KEYS */;
INSERT INTO `ul_system_quick` VALUES (1,'管理员管理','fa fa-user','system.admin/index',0,1,'',1685457618,1685457618,0),(2,'角色管理','fa fa-bitbucket-square','system.auth/index',0,1,'',1685457618,1685457618,0),(3,'菜单管理','fa fa-tree','system.menu/index',0,1,'',1685457618,1685457618,0),(4,'节点管理','fa fa-list','system.node/index',0,1,'',1685457618,1685457618,0),(5,'配置管理','fa fa-asterisk','system.config/index',0,1,'',1685457618,1685457618,0),(6,'上传管理','fa fa-arrow-up','system.uploadfile/index',0,1,'',1685457618,1685457618,0),(7,'分类管理','fa fa-calendar-check-o','mall.cate/index',0,1,'',1685457618,1685460911,0),(8,'内容管理','fa fa-list','mall.goods/index',0,1,'图酷',1685457618,1687184464,0);
/*!40000 ALTER TABLE `ul_system_quick` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ul_system_uploadfile`
--

DROP TABLE IF EXISTS `ul_system_uploadfile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ul_system_uploadfile` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `upload_type` char(20) NOT NULL DEFAULT 'local' COMMENT '存储位置',
  `original_name` char(255) NOT NULL DEFAULT '' COMMENT '文件原名',
  `url` char(255) NOT NULL DEFAULT '' COMMENT '链接',
  `save_name` char(255) NOT NULL DEFAULT '' COMMENT '存储名称',
  `image_width` char(30) NOT NULL DEFAULT '' COMMENT '宽度',
  `image_height` char(30) NOT NULL DEFAULT '' COMMENT '高度',
  `image_frames` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '图片帧数',
  `mime_type` char(100) NOT NULL DEFAULT '' COMMENT 'mime类型',
  `file_size` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '文件大小',
  `file_ext` char(100) NOT NULL DEFAULT '' COMMENT '扩展名',
  `sha1` char(40) NOT NULL DEFAULT '' COMMENT '文件 sha1编码',
  `create_time` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '创建时间',
  `update_time` int(11) unsigned NOT NULL DEFAULT '0',
  `delete_time` int(11) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `upload_type` (`upload_type`),
  KEY `original_name` (`original_name`),
  KEY `delete_time` (`delete_time`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8 COMMENT='上传文件表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ul_system_uploadfile`
--

LOCK TABLES `ul_system_uploadfile` WRITE;
/*!40000 ALTER TABLE `ul_system_uploadfile` DISABLE KEYS */;
INSERT INTO `ul_system_uploadfile` VALUES (1,'local_public','AI.png','http://127.0.0.3/storage/upload/20230530/6476128e23b5d.png','upload/20230530/6476128e23b5d.png','','',0,'image/png',2283,'png','617289def3585878c3fd2ab82baf23c96c203efa',1685459598,1685459598,0),(2,'local_public','AI及算法.png','http://127.0.0.3/storage/upload/20230530/647612c88b565.png','upload/20230530/647612c88b565.png','','',0,'image/png',1638,'png','ebf57fe16ce09efa462856091ceda20b4cb12960',1685459656,1685459656,0),(3,'local_public','ai辅助审片.png','http://127.0.0.3/storage/upload/20230530/647612f50faf4.png','upload/20230530/647612f50faf4.png','','',0,'image/png',2651,'png','6eeb18b15c25b485755707d8e62b7c3571870e95',1685459701,1685459701,0),(4,'local_public','www.notion.so.ico','http://127.0.0.3/storage/upload/20230530/647613a8291da.ico','upload/20230530/647613a8291da.ico','','',0,'image/x-icon',2647,'ico','5aa05da5efa515d5db734992c5ebca49df945095',1685459880,1685459880,0),(5,'local_public','www.notion.jpg','http://127.0.0.3/storage/upload/20230530/647613c2b603c.jpg','upload/20230530/647613c2b603c.jpg','','',0,'image/jpeg',39847,'jpg','6c9c5e08c7bfefca89f37ad7456080d8846867f1',1685459906,1685459906,0),(6,'local_public','SSL.png','http://127.0.0.3/storage/upload/20230531/64763f793852c.png','upload/20230531/64763f793852c.png','','',0,'image/png',8364,'png','411dc7a0f27eb5183201f8bbc618840d3271bb52',1685471097,1685471097,0),(7,'local_public','favicon.ico','http://127.0.0.3/storage/upload/20230531/64763f8fe7724.ico','upload/20230531/64763f8fe7724.ico','','',0,'image/x-icon',1150,'ico','df34f60a4001bdcb8c2ab15cd50c92feb6288a31',1685471119,1685471119,0),(8,'local_public','gh_e45b98214fde_258.jpg','http://127.0.0.3/storage/upload/20230531/6476d13eec56a.jpg','upload/20230531/6476d13eec56a.jpg','','',0,'image/jpeg',45675,'jpg','649d6945347b3da8d6f027d6222a0bb76f3de563',1685508414,1685508414,0),(9,'local_public','qrcode_for_gh_954e1dc67232_258.jpg','http://127.0.0.3/storage/upload/20230531/6476d2334a4ef.jpg','upload/20230531/6476d2334a4ef.jpg','','',0,'image/jpeg',27666,'jpg','6d644fad93878487865f3059d4127ce2963601ba',1685508659,1685508659,0),(10,'local_public','nav-ai-Midjourney.png','http://127.0.0.3/storage/upload/20230531/6476ed6c309ee.png','upload/20230531/6476ed6c309ee.png','','',0,'image/png',1281,'png','0156bc97e442e665f6680e37ad8df6c05f8406d6',1685515628,1685515628,0),(11,'local_public','nav-ai-ChatGPT.png','http://127.0.0.3/storage/upload/20230531/6476edc3a0c86.png','upload/20230531/6476edc3a0c86.png','','',0,'image/png',1092,'png','82abeb5a2900fc8e4cca16d5baff08f9452aa2f5',1685515715,1685515715,0),(12,'local_public','nav-ai-stable.png','http://127.0.0.3/storage/upload/20230531/6476ee443642f.png','upload/20230531/6476ee443642f.png','','',0,'image/png',1649,'png','42ce9f28973aadb9d24e0f2b8ca084d2717a48af',1685515844,1685515844,0),(13,'local_public','nav-ai-NijiJourney.png','http://127.0.0.3/storage/upload/20230531/6476eee1b4523.png','upload/20230531/6476eee1b4523.png','','',0,'image/png',1577,'png','cdf73fc8717ab1122e2297a990432aa5701c9c68',1685516001,1685516001,0),(14,'local_public','nav-ai-microsoftdesign.png','http://127.0.0.3/storage/upload/20230531/6476ef407cfd1.png','upload/20230531/6476ef407cfd1.png','','',0,'image/png',2470,'png','4a96b073c675433817d74f9f4df0a2b79fbf9104',1685516096,1685516096,0),(15,'local_public','nav-ai-HuggingFace.png','http://127.0.0.3/storage/upload/20230531/6476efb8bf585.png','upload/20230531/6476efb8bf585.png','','',0,'image/png',842,'png','0dc6f40c1bf572e6bcf1795f8746f5b5415108a0',1685516216,1685516216,0),(16,'local_public','nav-ai-saas.png','http://127.0.0.3/storage/upload/20230531/6476f04b72a3b.png','upload/20230531/6476f04b72a3b.png','','',0,'image/png',1339,'png','cffed10fcf98d9e3604e0cace74954da464a8b9e',1685516363,1685516363,0),(17,'local_public','nav-ai-PromptHero.png','http://127.0.0.3/storage/upload/20230531/6476f1c3f10ab.png','upload/20230531/6476f1c3f10ab.png','','',0,'image/png',3243,'png','1229fcee681e75b7c8f705f29ab08a095209df78',1685516740,1685516740,0),(18,'local_public','nav-ai-vectorizer.png','http://127.0.0.3/storage/upload/20230531/6476f23c714fd.png','upload/20230531/6476f23c714fd.png','','',0,'image/png',502,'png','e2eee5bb177cc973cd2fdd9ad4f0f3a177b85257',1685516860,1685516860,0),(19,'local_public','nav-ai-Runway.png','http://127.0.0.3/storage/upload/20230531/6476f27e3dfb3.png','upload/20230531/6476f27e3dfb3.png','','',0,'image/png',1462,'png','923a77e17de65ffa64bd6338f08d1620b2c79181',1685516926,1685516926,0),(20,'local_public','SSL认证.png','http://127.0.0.3/storage/upload/20230531/6476f2f875207.png','upload/20230531/6476f2f875207.png','','',0,'image/png',4938,'png','d8e3c89d776c2cb7823c2d389ce5417c1244f13a',1685517048,1685517048,0),(21,'local_public','nav-ai-ChatGPT.png','http://127.0.0.3/storage/upload/20230531/6476f71aa9996.png','upload/20230531/6476f71aa9996.png','','',0,'image/png',1092,'png','82abeb5a2900fc8e4cca16d5baff08f9452aa2f5',1685518106,1685518106,0),(22,'local_public','nav-ai-Anthropi.png','http://127.0.0.3/storage/upload/20230531/6476f7497c855.png','upload/20230531/6476f7497c855.png','','',0,'image/png',901,'png','8e271e5c1d9b4b2294628e809616671783770415',1685518153,1685518153,0),(23,'local_public','nav-ai-OpenCat.png','http://127.0.0.3/storage/upload/20230531/6476f7f905943.png','upload/20230531/6476f7f905943.png','','',0,'image/png',3242,'png','e5b80afa44ff885e697564a96335a3cf233d0dc6',1685518329,1685518329,0),(24,'local_public','nav-ai-newbing.png','http://127.0.0.3/storage/upload/20230531/6476f841d6aa0.png','upload/20230531/6476f841d6aa0.png','','',0,'image/png',2663,'png','dd77e6f02e6d2b64f6642765e89e279288b17ad9',1685518401,1685518401,0),(25,'local_public','nav-ai-tongyi.png','http://127.0.0.3/storage/upload/20230531/6476f8a35337e.png','upload/20230531/6476f8a35337e.png','','',0,'image/png',2271,'png','dfb2eeb8b82e7c1b990b73af9788e69c0311bfa0',1685518499,1685518499,0),(26,'local_public','nav-ai-YOU.png','http://127.0.0.3/storage/upload/20230531/6476f916f002e.png','upload/20230531/6476f916f002e.png','','',0,'image/png',2525,'png','9b194d3ef860409df3d8460f1bb057732415ca87',1685518614,1685518614,0),(27,'local_public','nav-ai-Midjourney.png','http://127.0.0.3/storage/upload/20230531/64770a3bee6a7.png','upload/20230531/64770a3bee6a7.png','','',0,'image/png',1281,'png','0156bc97e442e665f6680e37ad8df6c05f8406d6',1685523003,1685523003,0),(28,'local_public','nav-ai-stable.png','http://127.0.0.3/storage/upload/20230531/64770a77be545.png','upload/20230531/64770a77be545.png','','',0,'image/png',1649,'png','42ce9f28973aadb9d24e0f2b8ca084d2717a48af',1685523063,1685523063,0),(29,'local_public','nav-ai-wxyg.png','http://127.0.0.3/storage/upload/20230531/64770b0f6c540.png','upload/20230531/64770b0f6c540.png','','',0,'image/png',483,'png','e61a174da1bccccf8c71d55a6b2c48a01e8f6b29',1685523215,1685523215,0),(30,'local_public','nav-ai-Dreamlike.png','http://127.0.0.3/storage/upload/20230531/64770b5084823.png','upload/20230531/64770b5084823.png','','',0,'image/png',344,'png','27e3159533eb35c6a3585d2b379d2486171c6377',1685523280,1685523280,0),(31,'local_public','nav-ai-DALLE2.png','http://127.0.0.3/storage/upload/20230531/64770ba57f365.png','upload/20230531/64770ba57f365.png','','',0,'image/png',2769,'png','a486173d6bac466f31a6ef2ee1c1f169c71e1515',1685523365,1685523365,0),(32,'local_public','nav-ai-HuggingFace.png','http://127.0.0.3/storage/upload/20230531/64770bfaad411.png','upload/20230531/64770bfaad411.png','','',0,'image/png',842,'png','0dc6f40c1bf572e6bcf1795f8746f5b5415108a0',1685523450,1685523450,0),(33,'local_public','nav-ai-Noonshot.png','http://127.0.0.3/storage/upload/20230531/64771acccbf5c.png','upload/20230531/64771acccbf5c.png','','',0,'image/png',1741,'png','2279282360a06d629c55d7898c66887ca4a2d808',1685527244,1685527244,0),(34,'local_public','avatar.png','http://127.0.0.3/storage/upload/20230531/64775f5209841.png','upload/20230531/64775f5209841.png','','',0,'image/png',27333,'png','75de70fd8c61d726e58961e6cf85a1c1fa8c8103',1685544786,1685544786,0);
/*!40000 ALTER TABLE `ul_system_uploadfile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ul_test_goods`
--

DROP TABLE IF EXISTS `ul_test_goods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ul_test_goods` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cate_id` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '分类ID {relation} (table:mall_cate,relationBindSelect:title)',
  `title` char(20) NOT NULL DEFAULT '' COMMENT '名称',
  `logo` char(255) NOT NULL COMMENT 'logo {image}',
  `images` text NOT NULL COMMENT '图片 {images}',
  `describe` text NOT NULL COMMENT '描述 {editor}',
  `total_stock` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '总库存',
  `sort` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '排序',
  `status` int(1) unsigned NOT NULL DEFAULT '0' COMMENT '状态 {radio} (0:正常,1:禁用)',
  `cert_file` varchar(100) NOT NULL COMMENT '合格证 {file}',
  `verfiy_file` text NOT NULL COMMENT '检测报告 {files}',
  `remark` char(255) NOT NULL DEFAULT '' COMMENT '备注说明',
  `create_time` int(11) unsigned NOT NULL DEFAULT '0',
  `update_time` int(11) unsigned NOT NULL DEFAULT '0',
  `delete_time` int(11) unsigned NOT NULL DEFAULT '0',
  `publish_time` int(10) unsigned NOT NULL COMMENT '发布日期 {date} (date)',
  `sale_time` bigint(20) unsigned NOT NULL COMMENT '售卖日期 {date} (datetime)',
  `intro` varchar(100) NOT NULL COMMENT '简介 {textarea}',
  `time_status` int(5) unsigned NOT NULL COMMENT '秒杀状态 {select} (0:未参加,1:已开始,3:已结束)',
  `is_recommend` int(4) NOT NULL COMMENT '是否推荐 {switch} (0:不推荐,1:推荐)',
  `shop_type` varchar(100) NOT NULL COMMENT '商品类型 {checkbox} (taobao:淘宝,jd:京东)',
  `tag` varchar(100) NOT NULL COMMENT '商品标签 {table} (table:mall_tag,type:checkbox,valueField:id,fieldName:title)',
  `tag_backup` varchar(100) DEFAULT NULL COMMENT '商品标签（单选） {table} (table:mall_tag,type:radio,valueField:id,fieldName:title)',
  `from_area` varchar(100) NOT NULL COMMENT '产地 {city} (name-province:0,code:0)',
  `store_city` varchar(100) NOT NULL DEFAULT '山东省/临沂市' COMMENT '仓库 {city} (level:city)',
  `tag_input` varchar(100) NOT NULL COMMENT '商品标签 （输入） {tag}',
  `uid` varchar(100) NOT NULL COMMENT '唯一id',
  `price` decimal(10,2) DEFAULT NULL COMMENT '价格',
  `detail` text COMMENT '详情',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uid` (`uid`),
  KEY `cate_id` (`cate_id`),
  FULLTEXT KEY `detail` (`detail`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='商品列表';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ul_test_goods`
--

LOCK TABLES `ul_test_goods` WRITE;
/*!40000 ALTER TABLE `ul_test_goods` DISABLE KEYS */;
/*!40000 ALTER TABLE `ul_test_goods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'daohang'
--

--
-- Dumping routines for database 'daohang'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-29  0:15:44
