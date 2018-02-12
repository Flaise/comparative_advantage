const {Howl} = require('howler');
const {addHandler} = require('./event');

addHandler('load', (session) => {
    const sound = new Howl({
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

addHandler('pagevisible', (session, visible) => {
    if (visible) {
        session.music.sound.fade(0, 1, 800);
    } else {
        session.music.sound.fade(1, 0, 500);
    }
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
