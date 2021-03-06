const {IconAvatar} = require('skid/lib/scene/icon-avatar');
const {addHandler} = require('skid/lib/event');
const {loadIcon} = require('skid/lib/scene/icon');

addHandler('load', (session) => {
    session.waterIcon = loadIcon(session, `./assets/water1.png`, 0, 0, 1000);
});

addHandler('load_done', (session) => {
    const avatar = new IconAvatar(session.scene.world, session.waterIcon, 0, 0, 1, 1);
    avatar.layer = 1;
});
