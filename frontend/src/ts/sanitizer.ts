const sanitize = (str: string) => str.replace(/[^a-zA-Z0-9]/g, '');

const isEmail = (str: string) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/.test(str) ? str : false;

const isUsername = (str: string) => /^[a-z][a-z]+\d*$|^[a-z]\d{2,}$/i.test(str) ? str.toLowerCase() : false;

export { sanitize, isEmail, isUsername };
