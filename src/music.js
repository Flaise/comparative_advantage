const {addHandler} = require('skid/lib/event');
const {loadAudio} = require('skid/lib/audio');

addHandler('load', (state) => {
    loadAudio(state, 'music', {
        src: ['./assets/music.ogg', './assets/music.mp3'],
        sprite: {
            first: [0, 4545],
            loop: [4545, 99004, true], // 103549 = entire track
        },
    }).then((sound) => {
        state.music = {sound, played: false, volume: 1, silenced: false};
        sound.once('end', () => {
            sound.play('loop');
        });
    });
});

function fadeIn(state) {
    if (state.music.volume === 1) return;
    state.music.volume = 1;
    state.music.sound.fade(0, 1, 800);
}

function fadeOut(state) {
    if (state.music.volume === 0) return;
    state.music.volume = 0;
    state.music.sound.fade(1, 0, 500);
}

addHandler('pagehide', fadeOut);

addHandler('pageshow', (state) => {
    if (state.music.silenced) return;
    fadeIn(state);
});

addHandler('mousemove', (state) => {
    if (!state.music.played) {
        state.music.played = true;
        state.music.sound.play('first');
    }
});

addHandler('proceed_starve', (state) => {
    fadeOut(state);
    state.music.silenced = true;
});

addHandler('restart', (state) => {
    fadeIn(state);
    state.music.silenced = false;
});
