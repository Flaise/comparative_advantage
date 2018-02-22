const {IconAvatar} = require('skid/lib/scene/icon-avatar');
const {addHandler} = require('skid/lib/event');
const {loadIcon} = require('skid/lib/scene/icon');
const {loadAudio} = require('skid/lib/audio');

addHandler('load', (session) => {
    loadAudio(session, 'sail', {
        src: ['./assets/sail.ogg', './assets/sail.mp3'],
        loop: true,
    }).then((sound) => {
        session.sailSound = sound;
        sound.on('fade', () => {
            sound.stop();
            sound.volume(1);
        });
    });
    session.shipIcon = loadIcon(session, `./assets/ship1.png`, 0, 0, 1000);
});

addHandler('load_done', (session) => {
    const avatar = new IconAvatar(session.scene.world, session.shipIcon, 0, 0, 1, 1);
    avatar.layer = 1.5;
});

addHandler('proceed', (session) => {
    session.sailSound.play();
});

addHandler('proceed_done proceed_starve', (session) => {
    session.sailSound.fade(1, 0, 500);
});
