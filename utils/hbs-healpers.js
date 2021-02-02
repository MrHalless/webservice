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
    if (value === 'Админ АПК') {
      return true;
    }
  },
  isAdminComplex: function (value) {
    if (value === 'Админ комплекса') {
      return true;
    }
  },
  isRuckAPK: function (value) {
    if (value === 'Руководитель АПК') {
      return true;
    }
  },
  isRuckComplex: function (value) {
    if (value === 'Руководитель комплекса') {
      return true;
    }
  },
  isRuckSubdiv: function (value) {
    if (value === 'Руководитель подразделения') {
      return true;
    }
  },
  isOperator: function (value) {
    if (value === 'Оператор') {
      return true;
    }
  },
  eachInMap: function (map, block) {
    let output = '';
    for (const [key, value] of map) {
      output += block.fn({
        key,
        value
      });
    }
    return output;
  },
  checkDomainUser: function (value) {
    if (value === 'Доменная') return true;
  },
  checkFileHandling: function (val1, val2, val3, val4, val5, val6, val7, val8, val9) {

    if (val1 || val2 || val3 || val4 || val5 || val6 || val7 || val8 || val9) {
      console.log(true);
      return true;
    } else {
      console.log(false);
      return false;
    }
  },
  checkTask: function (val1, val2, val3, val4, val5, val6, val7, val8) {
    if (val1 || val2 || val3 || val4 || val5 || val6 || val7 || val8) {
      return true;
    } else {
      return false;
    }
  },
  checkPMS: function (val1, val2) {
    if (val1 || val2) {
      return true;
    } else {
      return false;
    }
  },
  checkStructure: function (val1, val2, val3, val4, val5) {
    if (val1 || val2 || val3 || val4 || val5) {
      return true;
    } else {
      return false;
    }
  },
  checkRole: function (current, check) {
    if (current !== check) {
      return false;
    } else {
      return true;
    }
  },
  checkLanguagesPairs: function (current, check) {
    if (current !== check) {
      return false;
    } else {
      return true;
    }
  },
};