class Model{
    constructor(){
        // 一些初始化操作
        this.name = 'yuanshang';
        this.sex = 'man';
        this.age = 26;
    }
    
    // 公用方法
    modelExmpleMethod() {
        console.log('Model');
    }
}
 
module.exports = Model;  // 导出父类，供子类继承，注意不要 `new`