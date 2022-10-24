function ajax (url,requestType) {
    console.log('ajax');

    var xmlHttp = null;

    if(window.XMLHttpRequest) {
        //  创建 XMLHttpRequest 对象
        xmlHttp = new XMLHttpRequest();
    }else {
        //  支持早期浏览器
        xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
    }

    //  发送请求
    xmlHttp.open(requestType,url,true);
    xmlHttp.send();

    //  服务器响应
    xmlHttp.onreadystatechange = function () {

        if(xmlhttp.readyState === 4 && xmlhttp.status === 200) {

            var data = JSON.parse(xmlhttp.responseText)

            console.log('data: ', data);

            return data;

        }
    }
}

var url = 'https://api.bilibili.com/x/player/online/total?aid=509920968&cid=553014192&bvid=BV1Au411q7ba&ts=55554322'
ajax(url,'GET');

