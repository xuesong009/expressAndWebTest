var express = require("express");
var path = require("path");
var app = express();
var router = require("./router/router.js");

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

app.use("/", router);

app.listen(8080, function () {
  console.log('$ server is running at 8080 port $');
});