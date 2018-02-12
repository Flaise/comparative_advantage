const {Howl} = require('howler');
const {addHandler} = require('./event');
const {overlapsBounds} = require('./bounds');

const muteBounds = {left: 0, top: 0, right: 50, bottom: 50};

addHandler('load', (session) => {
    const sound = new Howl({
        src: ['./assets/music.ogg', './assets/music.mp3'],
        sprite: {
            first: [0, 4545],
            loop: [4545, 99004, true], // 103549 = entire track
        },
    });
    session.music = {sound, muted: false};
    sound.once('load', () => {
        session.music.state = 'loaded';
    });
    sound.once('end', () => {
        sound.play('loop');
    });
});

addHandler('pagevisible', (session, visible) => {
    if (session.music.muted) return;
    if (visible) {
        session.music.sound.fade(0, 1, 800);
    } else {
        session.music.sound.fade(1, 0, 500);
    }
});

addHandler('mousedown', (session, {x, y}) => {
    if (session.music.state === 'loaded') {
        session.music.sound.play('first');
        session.music.state = 'played';
    }

    if (overlapsBounds(x, y, muteBounds)) {
        session.music.muted = !session.music.muted;
        if (session.music.muted) {
            session.music.sound.fade(1, 0, 500);
        } else {
            session.music.sound.fade(0, 1, 800);
        }
    }
});
