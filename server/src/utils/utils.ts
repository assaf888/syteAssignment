export const isValidName = (name: string): boolean => {
  const regex = /^[A-Za-z]+$/;
  return regex.test(name);
};