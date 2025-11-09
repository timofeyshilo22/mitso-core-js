function Rectangle(width, height) {
  this.width = width;
  this.height = height;
}

Rectangle.prototype.getArea = function getArea() {
  return this.width * this.height;
};

function getJSON(obj) {
  return JSON.stringify(obj);
}

function fromJSON(proto, json) {
  const obj = JSON.parse(json);
  Object.setPrototypeOf(obj, proto);
  return obj;
}

class CssSelector {
  constructor() {
    this.parts = [];
    this.usedTypes = new Set();
  }

  element(value) {
    this.validateOrder(1);
    this.validateUnique('element');
    this.parts.push(value);
    this.usedTypes.add('element');
    return this;
  }

  id(value) {
    this.validateOrder(2);
    this.validateUnique('id');
    this.parts.push(`#${value}`);
    this.usedTypes.add('id');
    return this;
  }

  class(value) {
    this.validateOrder(3);
    this.parts.push(`.${value}`);
    return this;
  }

  attr(value) {
    this.validateOrder(4);
    this.parts.push(`[${value}]`);
    return this;
  }

  pseudoClass(value) {
    this.validateOrder(5);
    this.parts.push(`:${value}`);
    return this;
  }

  pseudoElement(value) {
    this.validateOrder(6);
    this.validateUnique('pseudoElement');
    this.parts.push(`::${value}`);
    this.usedTypes.add('pseudoElement');
    return this;
  }

  validateOrder(type) {
    const order = {
      element: 1,
      id: 2,
      class: 3,
      attr: 4,
      pseudoClass: 5,
      pseudoElement: 6,
    };
    if (this.lastType && order[this.lastType] > type) {
      throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    }
    this.lastType = Object.keys(order).find((key) => order[key] === type);
  }

  validateUnique(type) {
    if (this.usedTypes.has(type)) {
      throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
    }
  }

  stringify() {
    return this.parts.join('');
  }
}

const cssSelectorBuilder = {
  element(value) {
    return new CssSelector().element(value);
  },

  id(value) {
    return new CssSelector().id(value);
  },

  class(value) {
    return new CssSelector().class(value);
  },

  attr(value) {
    return new CssSelector().attr(value);
  },

  pseudoClass(value) {
    return new CssSelector().pseudoClass(value);
  },

  pseudoElement(value) {
    return new CssSelector().pseudoElement(value);
  },

  combine(selector1, combinator, selector2) {
    const combined = new CssSelector();
    combined.parts = [`${selector1.stringify()} ${combinator} ${selector2.stringify()}`];
    return combined;
  },
};

module.exports = {
  Rectangle,
  getJSON,
  fromJSON,
  cssSelectorBuilder,
};
