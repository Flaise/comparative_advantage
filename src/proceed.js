const {IconAvatar} = require('skid/lib/scene/icon-avatar');
const {Translation} = require('skid/lib/scene/translation');
const {addHandler, handle} = require('skid/lib/event');
const {loadIcon} = require('skid/lib/scene/icon');
const {overlapsBounds} = require('./bounds');

const buttonBounds = {left: 880, top: 23, right: 977, bottom: 112};

addHandler('load', (session) => {
    const iconNormal = loadIcon(session, `./assets/proceed.png`, 0, 0, 75);
    const iconHighlight = loadIcon(session, `./assets/proceedhighlight.png`, 0, 0, 75);
    session.proceed = {iconNormal, iconHighlight};
});

addHandler('load_done', (session) => {
    const position = new Translation(session.scene.world);
    position.x.setTo(.88);
    position.y.setTo(.02);

    const avatar = new IconAvatar(position, session.proceed.iconNormal, 0, 0, .1, .1);
    avatar.layer = 3;

    session.proceed.avatar = avatar;
    session.proceed.initial = true;
});

addHandler('proceed_done', (session) => {
    session.proceed.moving = false;
    session.proceed.avatar.icon = session.proceed.iconNormal;
});

addHandler('proceed', (session) => {
    session.proceed.moving = true;
    session.proceed.avatar.icon = undefined;
});

addHandler('mousemove', (session, {x, y}) => {
    if (session.proceed.moving || !session.proceed.avatar) return;
    if (overlapsBounds(x, y, buttonBounds)) {
        session.proceed.avatar.icon = session.proceed.iconHighlight;
    } else {
        session.proceed.avatar.icon = session.proceed.iconNormal;
    }
});

addHandler('mousedown', (session, {x, y}) => {
    if (session.proceed.moving || session.vendorTrading) return;
    if (overlapsBounds(x, y, buttonBounds)) {
        if (session.proceed.initial) {
            session.proceed.initial = false;
            handle(session, 'proceed_eat_done');
        } else {
            handle(session, 'proceed');
        }
    }
});
