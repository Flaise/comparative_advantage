const {IconAvatar} = require('skid/lib/scene/icon-avatar');
const {Translation} = require('skid/lib/scene/translation');
const {reverseSine, sine} = require('skid/lib/tween');
const {addHandler,} = require('skid/lib/event');
const {handleLater} = require('skid/lib/timer');
const {loadIcon} = require('skid/lib/load');

addHandler('load', (session) => {
    const icon = loadIcon(session, `./assets/port1.png`, 0, 0, 1000);
    session.port = {icon};
});

addHandler('start', (session) => {
    const position = new Translation(session.scene.world);
    position.x.setTo(2);
    const avatar = new IconAvatar(position, session.port.icon, 0, 0, 1, 1);
    avatar.layer = 2;
    session.port.position = position;
});

addHandler('proceed', (session) => {
    session.port.position.x.mod(-2, 1500, reverseSine);
    handleLater(session, 1500, 'proceed_eat');
});

addHandler('proceed_eat_done restart', (session) => {
    session.port.position.x.setTo(2);
    session.port.position.x.modTo(-.5, 1200, sine);
    handleLater(session, 1200, 'proceed_done');
});
