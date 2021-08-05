module.exports.validUrl = (url) => {
  const regex = /(\b(https?):\/\/)?[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/i;
  return regex.test(url);
};
