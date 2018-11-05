// 加载`laravel-mvc`核心模块
var route = require('laravel-mvc');
// 导出`express`自带系统模块,注意：`=`右面的`route.route`很重要，必须两个，不能多不能少
module.exports = route.route;
 
// 添加测试路由
route.get('/test', 'Test/TestController@test');
 
// 你可以根据项目添加自己的路由
// ... ...