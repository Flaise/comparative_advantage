const IconAvatar = require('skid/lib/scene/icon-avatar');
const {addHandler} = require('./event');

addHandler('start', (session) => {
    const icon = session.scene.atlas.get('port_1');
    icon.loadImage('./assets/port_1.png', 'port1_0_0_1000');
    new IconAvatar(session.scene.world, icon, 0, 0, 1, .75);
});
