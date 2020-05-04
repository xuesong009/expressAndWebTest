/**
 * @Date 5.4
 * @author xuesong009
 * @fnName hasClass
 * @Description has class
 * @param {string} ele [description]
 * @param {string} classNameStr [description]
 * @return {type} true/false
 */
function hasClass(ele, classNameStr) {
  // RegExp
  var reg = new RegExp(classNameStr, 'g');
  return reg.test(ele.className) ? true : false;
}

/**
 * @Date 5.4
 * @author xuesong009
 * @fnName addClass
 * @Description add class
 * @param {string} ele [description]
 * @param {string} classNameStr [description]
 * @return {type} 
 */
function addClass(ele, classNameStr) {
  ele.className += " " + classNameStr;
}

/**
 * @Date 5.4
 * @author xuesong009
 * @fnName removeClass
 * @Description remove class
 * @param {string} ele [description]
 * @param {string} classNameStr [description]
 * @return {type}
 */
function removeClass(ele, classNameStr) {
  // arr
  var arr = ele.className.split(" ");
  var index = 0;
  for (let i in arr) {
    if (arr[i] === classNameStr) {
      index = i;
    }
  }
  delete arr[index];
  arr.length--;
  ele.className = arr.join(" ");
}

// module.exports = {
//   hasClass: hasClass,
//   addClass: addClass,
//   removeClass: removeClass
// };