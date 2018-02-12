const {Howler} = require('howler');
const IconAvatar = require('skid/lib/scene/icon-avatar');
const Translation = require('skid/lib/scene/translation');
const {addHandler} = require('./event');
const {overlapsBounds} = require('./bounds');

const muteBounds = {left: 0, top: 0, right: 75, bottom: 75};

addHandler('load', (session) => {
    const iconSound = session.atlas.get('sound');
    iconSound.loadImage(`./assets/sound.png`, `sound_0_0_75`);
    const iconMute = session.atlas.get('mute');
    iconMute.loadImage(`./assets/mute.png`, `mute_0_0_75`);
    session.mute = {iconSound, iconMute};
});

addHandler('start', (session) => {
    const position = new Translation(session.scene.world);
    position.x.setTo(0);
    position.y.setTo(0);

    const avatar = new IconAvatar(position, session.mute.iconSound, 0, 0, 75.0/1000, 75.0/1000);
    avatar.layer = 3;

    session.mute.avatar = avatar;
});

addHandler('mousedown', (session, {x, y}) => {
    if (overlapsBounds(x, y, muteBounds)) {
        const muted = !Howler._muted;
        Howler.mute(muted);
        if (muted) {
            session.mute.avatar.icon = session.mute.iconMute;
        } else {
            session.mute.avatar.icon = session.mute.iconSound;
        }
    }
});
