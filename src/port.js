const IconAvatar = require('skid/lib/scene/icon-avatar');
const Translation = require('skid/lib/scene/translation');
const {reverseSine, sine} = require('skid/lib/tween');
const {addHandler, handleLater} = require('./event');

addHandler('start', (session) => {
    const icon = session.atlas.get('port1');
    icon.loadImage('./assets/port1.png', 'port1_0_0_1000');
    const position = new Translation(session.scene.world);
    const avatar = new IconAvatar(position, icon, 0, 0, 1, 1);
    avatar.layer = 2;
    session.port = {position};
});

addHandler('proceed', (session) => {
    session.port.position.x.modTo(-1, 2000, reverseSine);
    handleLater(session, 2000, 'proceed_eat');
});

addHandler('proceed_eat_done', (session) => {
    session.port.position.x.setTo(1);
    session.port.position.x.modTo(0, 2000, sine);
    handleLater(session, 2000, 'proceed_done');
});
