/* eslint-disable @typescript-eslint/no-throw-literal */

const wrapPromise = (promise: Promise<any>) => {
  let status = 'pending';
  let result: any;
  let suspender = promise.then(
    read => {
      status = 'success';
      result = read;
    },
    error => {
      status = 'error';
      result = error;
    },
  );
  return {
    read() {
      if (status === 'pending') {
        throw suspender;
      } else if (status === 'error') {
        throw result;
      } else if (status === 'success') {
        return result;
      }
    },
  };
};

export default wrapPromise;
