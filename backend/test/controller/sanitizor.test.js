const sanitize = require('../../server/misc/sanitize');

test('aaa is too short', () => {
    expect(() => sanitize.cardName('aa')).toThrowError('Name is too short');
});

test('a{57,} is too long', () => {
    expect(() => sanitize.cardName('a'.repeat(57))).toThrowError('Name is too long');
});

test('Kitt is valid, ', () => {
    expect(sanitize.cardName('Kitt')).toEqual('Kitt');
});

test('kitt is valid, ', () => {
    expect(sanitize.cardName('kitt')).toEqual('kitt');
});

test('kitt123 is valid, ', () => {
    expect(sanitize.cardName('kitt123')).toEqual('kitt123');
});

test('1234 is valid, ', () => {
    expect(sanitize.cardName('1234')).toEqual('1234');
});

test('<script> is not valid, ', () => {
    expect(sanitize.cardName('<script>')).toEqual('&lt;script&gt;');
});

test('kitt<script> is not valid, ', () => {
    expect(sanitize.cardName('kitt<script>')).toEqual('kitt&lt;script&gt;');
});

test('tri-brigade is valid, ', () => {
    expect(sanitize.cardName('tri-brigade')).toEqual('tri-brigade');
});