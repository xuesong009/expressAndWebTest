## 1.说明

使用express搭建服务器测试项目(学生管理);

express如何指定静态资源位置;

使用ES6的promise发送网络请求,必须先判断xhr.readyState == 4;

package.json配置服务器运行命令;

## 2.项目结构

```json
expressDemo
|- package.json
|- /node_modules
|- readme.md
|- /web
  |- /css
    |- index.css
  |- /images
  |- /js
    |- index.js
  |- /libs
    |- reset.css
  |- index.html
|- /server
  |- /config
    |- api.js
  |- /data
    |- classes.json
  |- /router
    |- router.js
  |- server.js
```

## 3.server

### 3.1 server.js

注意路径问题;

```js
...
// 静态资源位置
app.use(express.static(path.join(__dirname, "../web")));

// 添加具体路径，解决跨域问题
app.all('/', function (req, res, next) {
  console.log('Accessing the info section ...');
  //跨域处理
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  next(); // pass control to the next handler
});
...
```

### 3.2 package.json配置

配置package.json, 服务器跑起来

```json
"scripts": {
    "dev": "node ./server/server.js"
  },
```

命令:npm run dev;

## 4.web

### 4.1 index.js

须注意:
<1> 使用promise发送请求时,必须先判断xhr.readyState == 4;
  如果不是,退出;
  否则, promise永远处于rejected状态,不会抛出数据;
<2> 使用activeBtn对象指向被点击的btn;
  这样,可以方便的增删active class;
  最后,必须保证activeBtn --> event.target;

```js
window.onload = function () {
  // var utils = require("./js/utils/utils.js");
  /**
   * @Date 5.3
   * @author xuesong009
   * @fnName getJSON
   * @Description 
   * @param {string} url [description]
   * @return {type} promise
   */
  function getJSON(url) {
    let promise = new Promise(function (resolve, reject) {
      // callback
      let callback = function () {
        // console.log(this);
        // 以下判断 还未生效 promise就进入 rejected状态了
        // 可以获得数据,
        // 但是 promise 不会向外抛出该数据
        // 所以,必须保证xhr.readyState == 4
        // 才可以使用promise获取数据
        // if (this.readyState == 4 && this.status == 200) { // success
        //   resolve(this.responseText);
        // } else {
        //   reject(new Error('Cannot get data from ' + url));
        // }

        // 
        if (this.readyState !== 4) {
          return;
        }
        if (this.status == 200) { // success
          resolve(this.response);
        } else {
          reject(new Error('Cannot get data from ' + url));
        }
      }

      // ajax
      var xhr = new XMLHttpRequest();
      xhr.open('get', url);
      xhr.onreadystatechange = callback;
      xhr.responseType = "json";
      xhr.send();
    });
    return promise;
  }

  var ul = document.querySelector(".test>ul");
  // get male data
  getJSON("http://localhost:8080/male")
    .then(function (res) {
      // console.log(res);
      // parse res
      res.forEach(item => {
        let person = document.createElement("li");
        person.className = "person";

        let spanName = document.createElement("span");
        spanName.className = "perName";
        spanName.innerText = "Name: " + item.name;

        let spanAge = document.createElement("span");
        spanAge.className = "perAge";
        spanAge.innerText = "Age: " + item.age;

        person.append(spanName);
        person.append(spanAge);

        ul.appendChild(person);
      });
    })
    .catch(function (err) {
      console.log(err);
    })

  // buttonGroup
  var buttonGroup = document.querySelector(".buttonGroup");
  // active
  var activeBtn = document.querySelector(".active");

  // 全局url
  const baseURL = "http://localhost:8080/";
  // 事件代理
  buttonGroup.addEventListener('click', function (e) {
    // btn
    // console.log(this)
    event = e || window.event;
    if (event.target.className.lastIndexOf('btn') > -1) {
      // this.target == activeBtn
      if (event.target == activeBtn) { // 点击的是正在显示的,啥也不做
        return;
      } else { // tap 切换
        // activeBtn 删除 active class
        removeClass(activeBtn, 'active');
        // this.target 添加 active class
        addClass(event.target, "active");
        // activeBtn --> event.target
        activeBtn = event.target;

        // 掏空 ul
        ul.innerHTML = "";
        // ajax 请求响应数据
        var url = event.target.getAttribute("data-gender").toLowerCase();
        url = baseURL + url;
        console.log(url)
        getJSON(url)
          .then(function (res) {
            // console.log(res);
            let test = document.getElementsByClassName("test")[0];
            // parse res
            // let ul = document.createElement('ul');
            // 渲染视图
            res.forEach(item => {
              let person = document.createElement("li");
              person.className = "person";

              let spanName = document.createElement("span");
              spanName.className = "perName";
              spanName.innerText = "Name: " + item.name;

              let spanAge = document.createElement("span");
              spanAge.className = "perAge";
              spanAge.innerText = "Age: " + item.age;

              person.append(spanName);
              person.append(spanAge);

              ul.appendChild(person);
            });
            // test.append(ul);
          })
          .catch(function (err) {
            console.log(err);
          })
      }
    }
  });
};
```