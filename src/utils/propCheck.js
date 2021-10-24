const propLengthCheck = (reqObj) => new Promise((resolve, reject) => {
  const { reqArr, reqBody } = reqObj;

  for (let i = 0; i < reqArr.length; i + 1) {
    if (reqBody[reqArr[i]].length < 1) {
      const err = new Error('Missing required field in profile update form');
      err.name = 'ValidationError';
      reject(err);
    }
  }

  resolve(reqObj);
});

const propEmptyCheck = (reqObj) => new Promise((resolve, reject) => {
  const { reqArr, reqBody } = reqObj;

  for (let i = 0; i < reqArr.length; i + 1) {
    if (reqBody[reqArr[i]].charAt(0) === ' ') {
      const err = new Error('Missing required field in profile update form');
      err.name = 'ValidationError';
      reject(err);
    }
  }

  resolve(reqObj);
});

const propValidation = (arr, req) => new Promise((resolve, reject) => {
  const isPropertyPresent = (element) => Object.prototype.hasOwnProperty.call(req.body, element);
  const containsAllProps = arr.every(isPropertyPresent);
  console.log('arr:', arr.length);

  if (containsAllProps) {
    const reqObj = arr.reduce((ac, a) => ({ ...ac, [a]: '' }), {});
    const newObj = {
      reqBody: reqObj,
    };

    resolve(newObj);
  } else {
    const err = new Error('Does not contain necessary form properties');
    err.name = 'ValidationError';
    reject(err);
  }
});

module.exports.containsValidProps = (arr, req) => new Promise((resolve, reject) => {
  propValidation(arr, req)
    .then((reqBody) => propLengthCheck(reqBody))
    .then((reqBody) => propEmptyCheck(reqBody))
    .then((reqObj) => {
      resolve(reqObj);
    })
    .catch((err) => {
      reject(err);
    });
});
