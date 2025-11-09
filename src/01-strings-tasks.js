function concatenateStrings(value1, value2) {
  return value1 + value2;
}

function getStringLength(value) {
  return value.length;
}

function getStringFromTemplate(firstName, lastName) {
  return `Hello, ${firstName} ${lastName}!`;
}

function extractNameFromTemplate(value) {
  return value.replace('Hello, ', '').replace('!', '');
}

function getFirstChar(value) {
  return value[0];
}

function removeLeadingAndTrailingWhitespaces(value) {
  return value.trim();
}

function repeatString(value, count) {
  return value.repeat(count);
}

function removeFirstOccurrences(str, value) {
  return str.replace(value, '');
}

function unbracketTag(str) {
  return str.slice(1, -1);
}

function convertToUpperCase(str) {
  return str.toUpperCase();
}

function extractEmails(str) {
  return str.split(';');
}

function getRectangleString(width, height) {
  if (width < 2 || height < 2) return '';

  const top = `┌${'─'.repeat(width - 2)}┐\n`;
  const middle = `│${' '.repeat(width - 2)}│\n`;
  const bottom = `└${'─'.repeat(width - 2)}┘\n`;

  return top + middle.repeat(height - 2) + bottom;
}

function encodeToRot13(str) {
  return str.replace(/[a-zA-Z]/g, (c) => {
    const base = c <= 'Z' ? 65 : 97;
    return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base);
  });
}

function isString(value) {
  return typeof value === 'string' || value instanceof String;
}

function getCardId(value) {
  const suits = ['♣', '♦', '♥', '♠'];
  const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

  const suit = value.slice(-1);
  const rank = value.slice(0, -1);

  const suitIndex = suits.indexOf(suit);
  const rankIndex = ranks.indexOf(rank);

  return suitIndex * 13 + rankIndex;
}

const cssSelectorBuilder = {
  element() {
    throw new Error('Not implemented');
  },
  id() {
    throw new Error('Not implemented');
  },
  class() {
    throw new Error('Not implemented');
  },
  attr() {
    throw new Error('Not implemented');
  },
  pseudoClass() {
    throw new Error('Not implemented');
  },
  pseudoElement() {
    throw new Error('Not implemented');
  },
  combine() {
    throw new Error('Not implemented');
  },
};

module.exports = {
  concatenateStrings,
  getStringLength,
  getStringFromTemplate,
  extractNameFromTemplate,
  getFirstChar,
  removeLeadingAndTrailingWhitespaces,
  repeatString,
  removeFirstOccurrences,
  unbracketTag,
  convertToUpperCase,
  extractEmails,
  getRectangleString,
  encodeToRot13,
  isString,
  getCardId,
  cssSelectorBuilder,
};
