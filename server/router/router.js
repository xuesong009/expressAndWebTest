var express = require("express");
var config = require("../config/config.js");
var data = require(("../data/data.json"));
var url = require("url");
var router = express.Router();

router.get(config.classInfo, function (req, res) {
  res.json(data.classInfo);
});

// 我只想要看到男生
router.get(config.male, function (req, res) {
  res.json(data.students.filter(function (stu) { // stu参数代表每一个学生
    // {
    // "name": "周一帆",
    // "age": 25,
    // "sex": "man"
    // }
    return stu && stu.gender == "male";
  }));

});

router.get(config.female, function (req, res) {
  res.json(data.students.filter(function (stu) { // stu参数代表每一个学生
    return stu.gender == "female";
  }));

});

// age对比计算
router.get(config.age, function (req, res) {
  var path_url = url.parse(req.url, true);
  var query = path_url.query;
  // age=10
  if (query.age) {
    res.json(data.students.filter(function (stu) {
      return stu.age > query.age;
    }));
  } else {
    res.json({
      code: 100,
      msg: "error"
    });
  }
});

module.exports = router;