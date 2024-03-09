const regexPatterns = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9]+[a-zA-Z0-9.-].\.[a-zA-Z]{2,}$/,
  firstName: /^[A-Za-z]+(?:['-][A-Za-z]+)?$/,
  lastName: /^[A-Za-z]+(?:['-][A-Za-z]+)?$/,
  username: /.*/,
  password: /.*/,
  confirmPassword: /.*/,
};

/**
 * Available regexPatterns to test
 *  -email
 *  -firstName
 * @param {string} regex
 * @param {string} value
 * @returns
 */
const validate = (regex, value) => {
  return regexPatterns[regex].test(value);
};

export default validate;
