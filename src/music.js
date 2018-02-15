const {addHandler} = require('skid/lib/event');
const {loadAudio} = require('./audio');

addHandler('load', (session) => {
    const sound = loadAudio(session, {
        src: ['./assets/music.ogg', './assets/music.mp3'],
        sprite: {
            first: [0, 4545],
            loop: [4545, 99004, true], // 103549 = entire track
        },
    });
    session.music = {sound, state: 'loading'};
    sound.once('load', () => {
        session.music.state = 'loaded';
    });
    sound.once('end', () => {
        sound.play('loop');
    });
});

addHandler('pagehide', (session) => {
    session.music.sound.fade(1, 0, 500);
});

addHandler('pageshow', (session) => {
    session.music.sound.fade(0, 1, 800);
});

addHandler('mousemove', (session) => {
    if (session.music.state === 'loaded') {
        session.music.sound.play('first');
        session.music.state = 'played';
    }
});

addHandler('proceed_starve', (session) => {
    session.music.sound.fade(1, 0, 500);
});

addHandler('restart', (session) => {
    session.music.sound.fade(0, 1, 800);
});
