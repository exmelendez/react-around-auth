const propLengthCheck = (reqObj) => new Promise((resolve, reject) => {
  const { reqArr, reqBody } = reqObj;
  console.log('reqObj in propLengthCheck', reqObj);
  // console.log('reqBody element:', reqBody[reqArr[1]]);

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
  // const { name, about } = reqBody;
  const { reqArr, reqBody } = reqObj;

  for (let i = 0; i < reqArr.length; i + 1) {
    if (reqBody[reqArr[i]].charAt(0) === ' ') {
      const err = new Error('Missing required field in profile update form');
      err.name = 'ValidationError';
      reject(err);
    }
  }

  console.log('propEmptyCheck:', reqObj);
  resolve(reqObj);
  /*
  if (name.charAt(0) !== ' ' && about.charAt(0) !== ' ') {
    resolve(reqBody);
  } else {
    const err = new Error('Field contains empty space at beginning');
    err.name = 'ValidationError';
    reject(err);
  }
  */
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

    /*
    for (let i = 0; i < arr.length; i + 1) {
      // newObj.arr[i] = req.body[arr[i]];
      console.log(i);
    }
    */

    console.log('propValidation:', newObj);
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
