const {addHandler, handle} = require('skid/lib/event');
const {startMouseEvent} = require('skid/lib/input');

addHandler('load_done', (session) => {
    startMouseEvent(session, 'mousemove', canvas);
    startMouseEvent(session, 'mousedown', canvas);
});
