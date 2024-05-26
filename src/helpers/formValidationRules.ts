export const required = (
  value: string | number,
  invalidMsg = 'This field is required'
) => {
  return Boolean(value) || invalidMsg;
};

export const isEmailValid = (
  value: string,
  invalidMsg = 'Please enter a valid email'
) => {
  return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value) || invalidMsg;
};

export const minLength = (
  value: string,
  length: number,
  fieldName?: string,
  invalidMsg = `${
    'The ' + fieldName || 'This field'
  } must have at least ${length} characters`
) => {
  return value.length >= length || invalidMsg;
};

export const hasLetter = (
  value: string,
  invalidMsg = 'This field must have at least 1 letter'
) => {
  return /[A-Za-z]/.test(value) || invalidMsg;
};

export const hasNumber = (
  value: string,
  invalidMsg = 'This field must have at least 1 number'
) => {
  return /\d/.test(value) || invalidMsg;
};

export const isPasswordValid = (value: string) => {
  value = value.trim();
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\s\S]{5,}$/;

  if (regex.test(value)) return true;
  if (typeof hasLetter(value) === 'string') return hasLetter(value);
  if (typeof hasNumber(value) === 'string') return hasNumber(value);
  if (typeof minLength(value, 5) === 'string') return minLength(value, 5);
  return 'Invalid password';
};
