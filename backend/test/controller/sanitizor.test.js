const sanitizor = require('../../server/controller/sanitizor');

test('aaa is too short', () => {
    expect(() => sanitizor.sanitizeCardName('aa')).toThrowError('Name is too short');
});

test('a{57,} is too long', () => {
    expect(() => sanitizor.sanitizeCardName('a'.repeat(57))).toThrowError('Name is too long');
});

test('Kitt is valid, ', () => {
    expect(sanitizor.sanitizeCardName('Kitt')).toEqual('Kitt');
});

test('kitt is valid, ', () => {
    expect(sanitizor.sanitizeCardName('kitt')).toEqual('kitt');
});

test('kitt123 is valid, ', () => {
    expect(sanitizor.sanitizeCardName('kitt123')).toEqual('kitt123');
});

test('1234 is valid, ', () => {
    expect(sanitizor.sanitizeCardName('1234')).toEqual('1234');
});

test('<script> is not valid, ', () => {
    expect(sanitizor.sanitizeCardName('<script>')).toEqual('&lt;script&gt;');
});

test('kitt<script> is not valid, ', () => {
    expect(sanitizor.sanitizeCardName('kitt<script>')).toEqual('kitt&lt;script&gt;');
});

test('tri-brigade is valid, ', () => {
    expect(sanitizor.sanitizeCardName('tri-brigade')).toEqual('tri-brigade');
});