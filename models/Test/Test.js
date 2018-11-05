var config = require('laravel-mvc-config'); // 导入配置文件
var Model = require('../Model'); // 导入父类
 
class Test extends Model{
    constructor(){
        super(); // 调用父类的构造方法，必须的一行，否则下面的 `this` 将无法使用
        // 一些初始化的操作，自定义自己的一些属性
        
    }
    
    model_test() {
        console.log('test_model');
    }
}
 
module.exports = new Test(); // 导出实例化的 `Test` 供控制器调用