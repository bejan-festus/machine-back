const generateUid = () => {
    return "ABC" + new Date().getTime();
  };
  
  module.exports = generateUid