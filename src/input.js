const {addHandler, handle} = require('./event');

addHandler('start', (session) => {
    canvas.addEventListener('mousemove', (event) => {
        handle(session, 'mousemove', mouseXY(event));
    });

    canvas.addEventListener('mousedown', (event) => {
        handle(session, 'mousedown', mouseXY(event));
    });
});

function mouseXY(event) {
    const x = event.pageX - canvas.offsetLeft;
    const y = event.pageY - canvas.offsetTop;
    return {x, y};
}
