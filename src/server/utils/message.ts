const generateMessage = (from: string, text: string): chatApp.DatedMessage => ({
  from,
  text,
  date: new Date().getTime()
});

const generateLocationMessage = (from: string, coords: chatApp.Location): chatApp.LocationMessage => ({
  from,
  url: `https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`,
  date: new Date().getTime()
});

export { generateMessage, generateLocationMessage };
