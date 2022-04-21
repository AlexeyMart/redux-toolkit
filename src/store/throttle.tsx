export const throttle = (callback: (...args: any[]) => any, delay: number) => {
  let shouldWait: boolean = false;

  let waitingArgs: null | any[] = null;

  const timeoutFunc = () => {
    if (!waitingArgs) {
      shouldWait = false;
    } else {
      callback(...waitingArgs);

      waitingArgs = null;

      setTimeout(timeoutFunc, delay);
    }
  };

  return (...args: any[]) => {
    if (shouldWait) {
      waitingArgs = args;

      return;
    }

    callback(...args);

    shouldWait = true;

    setTimeout(timeoutFunc, delay);
  };
};
