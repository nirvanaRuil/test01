class ParamError extends Error{
    constructor(msg){
        super(msg);
        this.name = "ParamError";
    }  //继承内部错误类,拿到消息
}
class HttpError extends Error{
    constructor(msg){
        super(msg);
        this.name = "HttpError";
    }  //继承内部错误类,拿到消息
}
function ajax(url) {
    return new Promise((resolve, reject) => {
        //loading.style.display = 'block'; //让样式显示出来
        if(!/^http/.test(url)){
            throw new ParamError("请求地址格式错误")
        } //如果不是http开头就报错ParamError类"请求地址格式错误"
        let xhr = new XMLHttpRequest();
        xhr.open("GET",url);
        xhr.send();
        xhr.onload = function () {  //这里开始是异步网络请求,所以 else if下面要用reject同步,不能直接用throw new
            if (this.status == 200){
                resolve(JSON.parse(this.response));
            }else if (this.status == 404){
                reject(new HttpError("用户不存在"));  //必须同步使用,异步请求不可以
            } else {
                reject("加载失败");
            }
        }
        xhr.onerror = function () {
            reject(this);  //发生的其他错误
        }  //onerror事件会在文档或图像加载过程中发生错误时被触发。
    });
}