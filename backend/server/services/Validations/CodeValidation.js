const codeValidation = (code, length) => {
  const numberPattern = new RegExp(`^[0-9]{${length}}$`);
  return code !== "" && numberPattern.test(code);
};

module.exports = codeValidation;
