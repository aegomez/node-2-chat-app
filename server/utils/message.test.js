const expect = require('expect');

const { generateMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    let from = 'Subject F';
    let text = 'Testing yo!';
    let testMessage = generateMessage(from, text);
    expect(testMessage).toInclude({ from, text });
    expect(testMessage.date).toBeA('number');
  });
});