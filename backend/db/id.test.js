const assert = require('assert');
const { generateID } = require('./database');

describe('generateUniqueId', function() {
  
  it('should generate an ID that starts with "UI"', function() {
    const id = generateID();
    assert.strictEqual(id.startsWith("UI"), true, `Expected ID to start with "UI", but got ${id}`);
  });

  it('should generate an ID with exactly 7 characters', function() {
    const id = generateID();
    assert.strictEqual(id.length, 7, `Expected length to be 7, but got ${id.length}`);
  });

  it('should generate an ID where the last 5 characters are alphanumeric', function() {
    const id = generateID();
    const randomPart = id.substring(2);
    const alphanumericRegex = /^[A-Z0-9]{5}$/;
    assert.strictEqual(alphanumericRegex.test(randomPart), true, `Expected alphanumeric characters, but got ${randomPart}`);
  });

  it('should generate different IDs each time', function() {
    const id1 = generateID();
    const id2 = generateID();
    assert.notStrictEqual(id1, id2, `Expected different IDs, but got the same: ${id1}`);
  });

  it('should always generate an uppercase ID for alphanumeric characters', function() {
    const id = generateID();
    const randomPart = id.substring(2);
    assert.strictEqual(randomPart, randomPart.toUpperCase(), `Expected uppercase characters, but got ${randomPart}`);
  });

});

