const {addHandler, handle} = require('./event');

addHandler('start', (session) => {
    canvas.addEventListener('mousemove', (event) => {
        const x = event.pageX - canvas.offsetLeft;
        const y = event.pageY - canvas.offsetTop;
        console.log('mouse', x, y);

        handle(session, 'mousemove', {x, y});
    });
});
