const handlers = Object.create(null);

exports.addHandler =  function addHandler(code, handler) {
    if (typeof handler !== 'function') throw new Error();

    let keys;
    if (typeof code === 'string') {
        keys = code.split(' ').filter(a => a);
    } else {
        keys = [code];
    }

    for (const key of keys) {
        if (key === null || key === 'null' || key === undefined || key === 'undefined') {
            throw new Error();
        }
        const prev = handlers[key];
        if (prev) {
            handlers[key].push(handler);
        } else {
            handlers[key] = [handler];
        }
    }
}

exports.handle = function handle(session, code, arg) {
    if (!session) throw new Error();
    if (typeof session !== 'object') throw new Error();
    const list = handlers[code];
    if (!list) return;
    for (const func of list) {
        func(session, arg);
    }
}

window.addEventListener('load', () => {
    const session = Object.create(null);
    window.getSession = () => session; // NOTE: For debugging introspection.
    exports.handle(session, 'start');
});
