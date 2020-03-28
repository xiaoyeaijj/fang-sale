/**
 * 随机数
 * @param min  最小范围
 * @param max  最大范围
 * @param num  小数的位数，不填默认整数
 */
function getRandomNumber (min, max, num) {
  let random = (min + Math.round(Math.random() * (max - min)));
  let randomNumber = num ? random.toFixed(num) : random
  return randomNumber
}
exports.getRandomNumber = getRandomNumber;