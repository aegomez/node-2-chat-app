import expect = require('expect');

import { generateMessage, generateLocationMessage } from './message';

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    let from = 'Subject F';
    let text = 'Testing yo!';
    let testMessage = generateMessage(from, text);
    expect(testMessage).toInclude({ from, text });
    expect(testMessage.date).toBeA('number');
  });
});


describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    let from = 'Big Brother';
    let coords: chatApp.Location = {
      latitude: 10,
      longitude: 10
    };
    let url = 'https://www.google.com/maps?q=10,10';
    let testMessage = generateLocationMessage(from, coords);
    expect(testMessage).toInclude({ from, url });
    expect(testMessage.date).toBeA('number');
  });
});