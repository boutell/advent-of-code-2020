const fs = require('fs');

const data = fs.readFileSync('input18.txt', 'utf8');
// const data = `
// 2 * 3 + (4 * 5)
// 5 + (8 * 3 + 9 + 3 * 4 * 3)
// 5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))
// ((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2
// `;
// const data = `1 + 1 * 5`;

const lines = data.split('\n').map(line => line.trim()).filter(line => line.length);

// problem -> expr
// expr -> term (operator term)*
// term -> \d+
// term -> ( expr )

let sum = 0;
for (const line of lines) {
  let tokens = line.split(/([\s()+\-*/])/).filter(token => token.replace(/\s+/, '').length).map(token => {
    if (token.match(/^\d+$/)) {
      return parseInt(token);
    } else {
      return token;
    }
  });
  const ast = parseMultiplyExpr();
  // console.log(JSON.stringify(ast, null, '  '));
  console.log(evalAst(ast));
  sum += evalAst(ast);
  function parseMultiplyExpr() {
    const addExprs = [];
    addExprs.push(parseAddExpr());
    while (true) {
      if (!accept('*')) {
        break;
      }
      addExprs.push(parseAddExpr());
    }
    return {
      type: '*',
      addExprs
    };
  }
  function parseAddExpr() {
    const terms = [];
    terms.push(parseTerm());
    while (true) {
      if (!accept('+')) {
        break;
      }
      terms.push(parseTerm());
    }
    return {
      type: '+',
      terms
    };
  }
  function parseTerm() {
    if (accept('(')) {
      const inner = parseMultiplyExpr();
      expect(')');
      return inner;
    }
    const value = expect('number');
    return {
      type: 'number',
      value: value.number
    };
  }
  function accept(...options) {
    const token = tokens[0];
    if (!token) {
      return false;
    }
    for (const option of options) {
      if (token === option) {
        consume();
        return token;
      }
      if ((option === 'number') && ((typeof token) === option)) {
        consume();
        return { number: token };
      }
    }
    return false;
  }
  function expect(option) {
    const result = accept(option);
    if (!result) {
      throw `Expected ${option}`;
    }
    return result;
  }
  function consume() {
    tokens.shift();
  }
}

console.log(sum);

function evalAst(ast) {
  if (ast.type === '*') {
    let value = 1;
    for (const addExpr of ast.addExprs) {
      value *= evalAst(addExpr);
    }
    return value;
  } else if (ast.type === '+') {
    let value = 0;
    for (const term of ast.terms) {
      value += evalAst(term);
    }
    return value;
  } else if (ast.type === 'number') {
    return ast.value;
  }
}
