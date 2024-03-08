/**
 * This function takes the email and returns whether it is a valid email or not s
 * @param {} email
 * @returns Boolean
 */
const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9]+[a-zA-Z0-9.-].\.[a-zA-Z]{2,}$/;

  return regex.test(email);
};

export default validateEmail;
