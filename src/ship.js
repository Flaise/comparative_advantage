const IconAvatar = require('skid/lib/scene/icon-avatar');
const {addHandler} = require('./event');

addHandler('start', (session) => {
    const icon = session.atlas.get('ship1');
    icon.loadImage('./assets/ship1.png', 'ship1_0_0_1000');
    const avatar = new IconAvatar(session.scene.world, icon, 0, 0, 1, 1);
    avatar.layer = 1.5;
});