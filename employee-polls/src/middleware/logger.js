const logger = (store) => (next) => (action) => {
    const returnValue = next(action);
    console.groupEnd();
    return returnValue;
  };
  
  export default logger;
  