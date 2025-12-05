/* ************************************************************************************************
 *                                                                                                *
 * Please read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 ************************************************************************************************ */

/**
 * Returns the rectangle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    const r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
  this.width = width;
  this.height = height;
}

Rectangle.prototype.getArea = function getArea() {
  return this.width * this.height;
};

/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
  return JSON.stringify(obj);
}

/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    const r = fromJSON(Circle.prototype, '{"radius":10}');
 *
 */
function fromJSON(proto, json) {
  const obj = JSON.parse(json);
  return Object.setPrototypeOf(obj, proto);
}

/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class
 * and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurrences
 *
 * All types of selectors can be combined using the combination ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy
 * and implement the functionality to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string representation
 * according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple,
 * clear and readable as possible.
 *
 * @example
 *
 *  const builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()
 *    => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()
 *    => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()
 *    => 'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */

class CssSelector {
  constructor() {
    this.parts = {
      element: '',
      id: '',
      classes: [],
      attributes: [],
      pseudoClasses: [],
      pseudoElement: '',
    };
    this.order = [];
  }

  element(value) {
    this.validateOrder('element');
    if (this.parts.element) {
      throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
    }
    this.parts.element = value;
    this.order.push('element');
    return this;
  }

  id(value) {
    this.validateOrder('id');
    if (this.parts.id) {
      throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
    }
    this.parts.id = value;
    this.order.push('id');
    return this;
  }

  class(value) {
    this.validateOrder('class');
    this.parts.classes.push(value);
    this.order.push('class');
    return this;
  }

  attr(value) {
    this.validateOrder('attr');
    this.parts.attributes.push(value);
    this.order.push('attr');
    return this;
  }

  pseudoClass(value) {
    this.validateOrder('pseudoClass');
    this.parts.pseudoClasses.push(value);
    this.order.push('pseudoClass');
    return this;
  }

  pseudoElement(value) {
    this.validateOrder('pseudoElement');
    if (this.parts.pseudoElement) {
      throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
    }
    this.parts.pseudoElement = value;
    this.order.push('pseudoElement');
    return this;
  }

  validateOrder(type) {
    const orderRules = ['element', 'id', 'class', 'attr', 'pseudoClass', 'pseudoElement'];
    const lastType = this.order[this.order.length - 1];

    if (lastType && orderRules.indexOf(type) < orderRules.indexOf(lastType)) {
      throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    }
  }

  stringify() {
    let result = '';

    if (this.parts.element) {
      result += this.parts.element;
    }

    if (this.parts.id) {
      result += `#${this.parts.id}`;
    }

    if (this.parts.classes.length > 0) {
      result += this.parts.classes.map((cls) => `.${cls}`).join('');
    }

    if (this.parts.attributes.length > 0) {
      result += this.parts.attributes.map((attr) => `[${attr}]`).join('');
    }

    if (this.parts.pseudoClasses.length > 0) {
      result += this.parts.pseudoClasses.map((pseudo) => `:${pseudo}`).join('');
    }

    if (this.parts.pseudoElement) {
      result += `::${this.parts.pseudoElement}`;
    }

    return result;
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
    combined.parts = {
      ...selector1.parts,
      combined: {
        selector1: selector1.stringify(),
        combinator,
        selector2: selector2.stringify(),
      },
    };
    combined.stringify = function stringify() {
      return `${this.parts.combined.selector1} ${this.parts.combined.combinator} ${this.parts.combined.selector2}`;
    };
    return combined;
  },
};

module.exports = {
  Rectangle,
  getJSON,
  fromJSON,
  cssSelectorBuilder,
};
