const {Howl} = require('howler');
const {addHandler} = require('./event');

addHandler('load', (session) => {
    session.music = new Howl({
        src: ['./assets/music.ogg', './assets/music.mp3'],
        sprite: {
            first: [0, 4545],
            loop: [4545, 99004, true], // 103549 = entire track
        },
    });
    session.music.once('load', () => {
        session.musicState = 'loaded';
    });
    session.music.once('end', () => {
        session.music.play('loop');
    });
});

addHandler('pagevisible', (session, visible) => {
    if (visible) {
        session.music.fade(0, 1, 800);
    } else {
        session.music.fade(1, 0, 500);
    }
});

addHandler('mousedown', (session) => {
    if (session.musicState === 'loaded') {
        session.music.play('first');
        session.musicState = 'played';
    }
});
