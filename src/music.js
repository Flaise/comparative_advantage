const {Howl} = require('howler');
const {addHandler} = require('./event');

addHandler('load', (session) => {
    session.music = new Howl({
        src: ['./assets/music.ogg', './assets/music.mp3'],
        loop: true,
    });
    session.music.once('load', () => {
        session.musicState = 'loaded';
    });
});

addHandler('focus', (session) => {
    session.music.fade(0, 1, 800);
});

addHandler('blur', (session) => {
    session.music.fade(1, 0, 500);
});

addHandler('mousedown', (session) => {
    if (session.musicState === 'loaded') {
        session.music.play();
        session.musicState = 'played';
    }
})
