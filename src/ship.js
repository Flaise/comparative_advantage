const {IconAvatar} = require('skid/lib/scene/icon-avatar');
const {addHandler} = require('skid/lib/event');
const {loadIcon} = require('skid/lib/load');
const {loadAudio} = require('./audio');

addHandler('load', (session) => {
    session.sailSound = loadAudio(session, {
        src: ['./assets/sail.ogg', './assets/sail.mp3'],
        loop: true,
    });
    session.sailSound.on('fade', () => {
        session.sailSound.stop();
        session.sailSound.volume(1);
    });
    session.shipIcon = loadIcon(session, `./assets/ship1.png`, 0, 0, 1000);
});

addHandler('start', (session) => {
    const avatar = new IconAvatar(session.scene.world, session.shipIcon, 0, 0, 1, 1);
    avatar.layer = 1.5;
});

addHandler('proceed', (session) => {
    session.sailSound.play();
});

addHandler('proceed_done', (session) => {
    session.sailSound.fade(1, 0, 500);
});
