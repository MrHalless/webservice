module.exports = {
  counter: function (value) {
    value++;
    return value;
  },
  searchAdmin: function (user) {
    if (user === 'Admin') {
      return true;
    }
  },
  searchOperator: function (user) {
    if (user === 'Operator') {
      return true;
    }
  },
  searchPr: function (user) {
    if (user === 'Pr') {
      return true;
    }
  },
  searchRuck: function (user) {
    if (user === 'Ruck') {
      return true;
    }
  },
  checked: function (currentValue) {
    return currentValue == true ? 'checked' : '';
  },
  isAdminAPK: function (value) {
    if (value === 'AdminAPK') {
      return true;
    }
  },
  isAdminComplex: function (value) {
    if (value === 'AdminComplex') {
      return true;
    }
  },
  isRuckAPK: function (value) {
    if (value === 'RuckAPK') {
      return true;
    }
  },
  isRuckComplex: function (value) {
    if (value === 'RuckComplex') {
      return true;
    }
  },
  isRuckSubdiv: function (value) {
    if (value === 'RuckSubdiv') {
      return true;
    }
  },
  isOperator: function (value) {
    if (value === 'Operator') {
      return true;
    }
  },
  eachInMap: function (map, block) {
    let output = '';
    for (const [key, value] of map) {
      output += block.fn({ key, value });
    }
    return output;
  },
  checkDomainUser: function (value) {
    if (value === 'Доменная') return true;
  },
};
