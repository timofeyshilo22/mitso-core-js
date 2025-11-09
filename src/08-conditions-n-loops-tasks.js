function getFizzBuzz(num) {
  if (num % 3 === 0 && num % 5 === 0) return 'FizzBuzz';
  if (num % 3 === 0) return 'Fizz';
  if (num % 5 === 0) return 'Buzz';
  return num;
}

function getFactorial(n) {
  let result = 1;
  for (let i = 2; i <= n; i += 1) {
    result *= i;
  }
  return result;
}

function getSumBetweenNumbers(n1, n2) {
  let sum = 0;
  for (let i = n1; i <= n2; i += 1) {
    sum += i;
  }
  return sum;
}

function isTriangle(a, b, c) {
  return a + b > c && a + c > b && b + c > a;
}

function doRectanglesOverlap(rect1, rect2) {
  return (
    rect1.left < rect2.left + rect2.width
    && rect1.left + rect1.width > rect2.left
    && rect1.top < rect2.top + rect2.height
    && rect1.top + rect1.height > rect2.top
  );
}

function isInsideCircle(circle, point) {
  const distance = Math.sqrt(
    (point.x - circle.center.x) ** 2 + (point.y - circle.center.y) ** 2,
  );
  return distance < circle.radius;
}

function findFirstSingleChar(str) {
  const charCount = {};

  for (let i = 0; i < str.length; i += 1) {
    const char = str[i];
    charCount[char] = (charCount[char] || 0) + 1;
  }

  for (let i = 0; i < str.length; i += 1) {
    if (charCount[str[i]] === 1) {
      return str[i];
    }
  }

  return null;
}

function getIntervalString(a, b, isStartIncluded, isEndIncluded) {
  const start = Math.min(a, b);
  const end = Math.max(a, b);
  const startBracket = isStartIncluded ? '[' : '(';
  const endBracket = isEndIncluded ? ']' : ')';
  return `${startBracket}${start}, ${end}${endBracket}`;
}

function reverseString(str) {
  return str.split('').reverse().join('');
}

function reverseInteger(num) {
  return parseInt(num.toString().split('').reverse().join(''), 10);
}

function isCreditCardNumber(ccn) {
  const digits = ccn.toString().split('').map(Number);
  let sum = 0;
  let isEven = false;

  for (let i = digits.length - 1; i >= 0; i -= 1) {
    let digit = digits[i];

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
}

function getDigitalRoot(num) {
  let result = num;
  while (result > 9) {
    result = result.toString().split('').reduce((sum, digit) => sum + parseInt(digit, 10), 0);
  }
  return result;
}

function isBracketsBalanced(str) {
  const stack = [];
  const brackets = {
    '(': ')',
    '[': ']',
    '{': '}',
    '<': '>',
  };

  for (let i = 0; i < str.length; i += 1) {
    const char = str[i];

    if (brackets[char]) {
      stack.push(char);
    } else {
      const last = stack.pop();
      if (brackets[last] !== char) {
        return false;
      }
    }
  }

  return stack.length === 0;
}

function toNaryString(num, n) {
  return num.toString(n);
}

function getCommonDirectoryPath(pathes) {
  if (pathes.length === 0) return '';

  const parts = pathes.map((path) => path.split('/'));
  let commonPath = '';

  for (let i = 0; i < parts[0].length; i += 1) {
    const currentPart = parts[0][i];

    for (let j = 1; j < parts.length; j += 1) {
      if (parts[j][i] !== currentPart) {
        return commonPath;
      }
    }

    commonPath += currentPart + (i < parts[0].length - 1 ? '/' : '');
  }

  return commonPath;
}

function getMatrixProduct(m1, m2) {
  const result = [];

  for (let i = 0; i < m1.length; i += 1) {
    result[i] = [];
    for (let j = 0; j < m2[0].length; j += 1) {
      let sum = 0;
      for (let k = 0; k < m1[0].length; k += 1) {
        sum += m1[i][k] * m2[k][j];
      }
      result[i][j] = sum;
    }
  }

  return result;
}

function evaluateTicTacToePosition(position) {
  const lines = [
    // Rows
    [position[0][0], position[0][1], position[0][2]],
    [position[1][0], position[1][1], position[1][2]],
    [position[2][0], position[2][1], position[2][2]],
    // Columns
    [position[0][0], position[1][0], position[2][0]],
    [position[0][1], position[1][1], position[2][1]],
    [position[0][2], position[1][2], position[2][2]],
    // Diagonals
    [position[0][0], position[1][1], position[2][2]],
    [position[0][2], position[1][1], position[2][0]],
  ];

  for (let i = 0; i < lines.length; i += 1) {
    const [a, b, c] = lines[i];
    if (a && a === b && a === c) {
      return a;
    }
  }

  return undefined;
}

module.exports = {
  getFizzBuzz,
  getFactorial,
  getSumBetweenNumbers,
  isTriangle,
  doRectanglesOverlap,
  isInsideCircle,
  findFirstSingleChar,
  getIntervalString,
  reverseString,
  reverseInteger,
  isCreditCardNumber,
  getDigitalRoot,
  isBracketsBalanced,
  toNaryString,
  getCommonDirectoryPath,
  getMatrixProduct,
  evaluateTicTacToePosition,
};
