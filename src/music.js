const {Howl} = require('howler');
const {addHandler} = require('./event');

addHandler('load', (session) => {
    session.music = new Howl({
        src: ['./assets/music.ogg', './assets/music.mp3'],
        loop: true,
    });
    session.music.once('load', () => {
        if (!document.hidden) {
            session.music.play();
        }
    });
});

addHandler('focus', (session) => {
    session.music.fade(0, 1, 800);
});

addHandler('blur', (session) => {
    session.music.fade(1, 0, 500);
});
