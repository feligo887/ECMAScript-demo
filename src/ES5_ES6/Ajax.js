function ajax (url, callback) {
    var xmlhttp

    if (window.XMLHttpRequest) {

        xmlhttp = new XMLHttpRequest()

    } else { // 兼容早期浏览器

        xmlhttp = new ActiveXObject('Microsoft.XMLHTTP')

    }

    //  发送请求
    xmlHttp.open('GET',url,true);
    xmlHttp.send();

    //  服务器响应

    xmlhttp.onreadystatechange = function () {

        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {

            var obj = JSON.parse(xmlhttp.responseText)
            // console.log(obj)
            return callback ? callback (data) : data;

        }
    }
}
// var url = 'https://api.bilibili.com/x/player/online/total?aid=509920968&cid=553014192&bvid=BV1Au411q7ba&ts=55554322'
// ajax(url,'GET');

