const sanitize = (str: string) => str.replace(/[^a-zA-Z0-9]/g, '');

const isEmail = (str: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str) ? str : false;

const isUsername = (str: string) => /^.{3,}$/.test(str) ? str.toLowerCase() : false;
export { sanitize, isEmail, isUsername };
