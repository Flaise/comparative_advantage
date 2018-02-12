const {addHandler, handle} = require('./event');

addHandler('start', (session) => {
    session.events = {};
    startMouseEvent(session, 'mousemove');
    startMouseEvent(session, 'mousedown');

    window.addEventListener('focus', () => handle(session, 'focus'));
    window.addEventListener('blur', () => handle(session, 'blur'));

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            handle(session, 'pagevisible', false);
        } else {
            handle(session, 'pagevisible', true);
        }
    });
});

function mouseXY(event) {
    const x = event.pageX - canvas.offsetLeft;
    const y = event.pageY - canvas.offsetTop;
    return {x, y};
}

function startMouseEvent(session, name) {
    session.events[name] = true;
    canvas.addEventListener(name, (event) => {
        if (session.events[name]) handle(session, name, mouseXY(event));
    });
}

addHandler('inputconfigure', (session, {type, enabled}) => {
    session.events[type] = enabled;
});

exports.inputEnabled = function inputEnabled(session, type) {
    return session.events[type];
};
