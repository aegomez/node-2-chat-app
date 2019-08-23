import moment = require('moment');

const generateMessage = (from: string, text: string): chatApp.DatedMessage => ({
  from,
  text,
  date: moment().valueOf()
});

const generateLocationMessage = (from: string, coords: chatApp.Location): chatApp.LocationMessage => ({
  from,
  url: `https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`,
  date: moment().valueOf()
});

export { generateMessage, generateLocationMessage };
