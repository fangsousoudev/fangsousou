
DROP DATABASE IF EXISTS fss_new;
CREATE DATABASE fss_new CHARSET=UTF8;
USE fss_new;
CREATE TABLE fs_dish(
    did INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(64),
    price FLOAT(6,2),
    img_sm VARCHAR(64),
    img_lg VARCHAR(64),
    detail VARCHAR(2048),
    material VARCHAR(2048)
);
INSERT INTO fs_dish(did,img_sm,img_lg,name,price,material,detail) VALUES
(   null,
    '11.jpg',
    '11-1.jpg',
    '碧桂园梅公馆',
    '666',
    '户型：2室/3室',
    '碧桂园梅公馆在售高层住宅和叠拼别墅，建筑面积95平 、97平、127平，叠拼面积130平。'
),
(   null,
    '21.jpg',
    '21-1.jpg',
    '碧桂园梅公馆',
     '666',
    '户型：2室/3室',
    '碧桂园梅公馆在售高层住宅和叠拼别墅，建筑面积95平 、97平、127平，叠拼面积130平。'
),
(    null,
    '31.jpg',
    '31-1.jpg',
    '碧桂园梅公馆',
     '666',
    '户型：2室/3室',
    '碧桂园梅公馆在售高层住宅和叠拼别墅，建筑面积95平 、97平、127平，叠拼面积130平。'
),
(   null,
    '41.jpg',
    '41-1.jpg',
    '碧桂园梅公馆',
     '666',
    '户型：2室/3室',
    '碧桂园梅公馆在售高层住宅和叠拼别墅，建筑面积95平 、97平、127平，叠拼面积130平。'
),
(  null,
    '51.jpg',
    '51-1.jpg',
    '碧桂园梅公馆',
     '666',
    '户型：2室/3室',
    '碧桂园梅公馆在售高层住宅和叠拼别墅，建筑面积95平 、97平、127平，叠拼面积130平。'
),
(  null,
    '11.jpg',
    '11-1.jpg',
    '碧桂园梅公馆',
     '666',
    '户型：2室/3室',
      '碧桂园梅公馆在售高层住宅和叠拼别墅，建筑面积95平 、97平、127平，叠拼面积130平。'
);
  ##SELECT * FROM fs_dish;
  /*用户表*/
  CREATE TABLE fs_users(
      userid INT PRIMARY KEY AUTO_INCREMENT, /*编号*/
      uname VARCHAR(20),                     /*用户名*/
      phone VARCHAR(20),                      /*电话*/
      pwd VARCHAR(20)                       /*密码*/
  );
INSERT INTO fs_users VALUES
(NULL,'mary','11111','13111112345'),
(NULL,'jerry','22222','13819196547'),
(NULL,'john','33333','13819196547');
/*订单表*/
CREATE TABLE fs_order(
    oid INT PRIMARY KEY AUTO_INCREMENT,     /*订单ID*/
    userid INT,                             /*用户*/
    phone VARCHAR(16),                      /*联系电话*/
    user_name VARCHAR(16),                  /*收货方用户名*/
    order_time LONG,                        /*下单时间*/
    addr VARCHAR(256),                      /*订单地址*/
    totalprice FLOAT(6,2)                   /*订单总价*/
);
INSERT INTO fs_order VALUES
(NULL,1,'13501234567','大旭',1445154859209,'大钟寺中鼎B座',20.5),
(NULL,1,'13501257543','琳妹妹',1445154997543,'大钟寺中鼎B座',12.5),
(NULL,2,'13207654321','东东',1445254997612,'大钟寺中鼎B座',55),
(NULL,2,'13899999999','文兄',1445354959209,'大钟寺中鼎B座',35),
(NULL,3,'13683675299','梅姐',1445355889209,'大钟寺中鼎B座',45);
/**购物车表**/
CREATE TABLE kfs_cart(
    ctid INT PRIMARY KEY AUTO_INCREMENT, /*购物车编号*/
    userid INT,                          /*用户编号：假定有用户id为 1 和 3 的两个用户有数据*/
    did INT,                             /*产品编号*/
    dishCount INT                      /*数量*/
);
INSERT INTO fs_cart VALUES (1,1,1,1),
(2,1,2,4),
(3,1,5,2),
(4,3,2,10),
(5,3,6,1);
##SELECT * FROM fs_order;
/**订单详情表**/
CREATE TABLE kf_orderdetails(
    oid INT ,                            /*订单编号*/
    did INT,                             /*产品id*/
    dishCount INT,                     /*购买数量*/
    price FLOAT(8,2)                     /*产品单价：需要记载，因为产品价格可能波动*/
);
INSERT INTO fs_orderdetails VALUES (1,1,2,5),
(1,2,1,10.5),
(2,3,1,12.5),
(3,1,3,5),
(3,2,4,10),
(4,4,7,5),
(5,5,5,4),
(5,6,2,12.5);
