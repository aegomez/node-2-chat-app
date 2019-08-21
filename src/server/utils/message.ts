const generateMessage = (from: string, text: string): chatApp.Message => ({
  from,
  text,
  date: new Date().getTime()
});

export { generateMessage };
