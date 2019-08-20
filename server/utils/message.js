const generateMessage = (from, text) => {
  return {
    from,
    text,
    date: new Date().getTime()
  };
};

module.exports = { generateMessage };
