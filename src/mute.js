const {IconAvatar} = require('skid/lib/scene/icon-avatar');
const {Translation} = require('skid/lib/scene/translation');
const {addHandler} = require('skid/lib/event');
const {loadIcon} = require('skid/lib/load');
const {overlapsBounds} = require('./bounds');
const {muted, setMuted} = require('./audio');

const muteBounds = {left: 0, top: 0, right: 75, bottom: 75};

addHandler('load', (session) => {
    const iconSound = loadIcon(session, `./assets/sound.png`, 0, 0, 75);
    const iconMute = loadIcon(session, `./assets/mute.png`, 0, 0, 75);
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
        const m = !muted();
        setMuted(m);
        if (m) {
            session.mute.avatar.icon = session.mute.iconMute;
        } else {
            session.mute.avatar.icon = session.mute.iconSound;
        }
    }
});
