const { auth_login, auth_register, register } = require('../../server/endpoints/auth');
const { drop } = require('../../server/crud');


/*
test('lucas@gmail.com is already signed in', () => {
    expect(() => register('luuuucas', 'lucas@gmail.com', '5cf881eg273c9060d75028ddz9dd05c1777a7048118fea6dee6f52a5f31e7838')
    .expect({ status: 'error', message: 'An error occured, Code : E104' }));
});
*/