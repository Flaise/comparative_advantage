const IconAvatar = require('skid/lib/scene/icon-avatar');
const {Howl} = require('howler');
const {addHandler} = require('./event');

addHandler('load', (session) => {
    session.sailSound = new Howl({
        src: ['./assets/sail.ogg', './assets/sail.mp3'],
        loop: true,
    });
    session.sailSound.on('fade', () => {
        session.sailSound.stop();
        session.sailSound.volume(1);
    })
});

addHandler('start', (session) => {
    const icon = session.atlas.get('ship1');
    icon.loadImage('./assets/ship1.png', 'ship1_0_0_1000');
    const avatar = new IconAvatar(session.scene.world, icon, 0, 0, 1, 1);
    avatar.layer = 1.5;
});

addHandler('proceed', (session) => {
    session.sailSound.play();
});

addHandler('proceed_done', (session) => {
    session.sailSound.fade(1, 0, 500);
});
