const IconAvatar = require('skid/lib/scene/icon-avatar');
const Translation = require('skid/lib/scene/translation');
const {addHandler, handle} = require('./event');
const {overlapsBounds} = require('./bounds');

const buttonBounds = {left: 880, top: 23, right: 977, bottom: 112};

addHandler('load', (session) => {
    const iconNormal = session.atlas.get('proceed');
    iconNormal.loadImage(`./assets/proceed.png`, `proceed_0_0_75`);
    const iconHighlight = session.atlas.get('proceedhighlight');
    iconHighlight.loadImage(`./assets/proceedhighlight.png`, `proceedhighlight_0_0_75`);
    session.proceed = {iconNormal, iconHighlight};
});

addHandler('start', (session) => {
    const position = new Translation(session.scene.world);
    position.x.setTo(.88);
    position.y.setTo(.02);

    const avatar = new IconAvatar(position, session.proceed.iconNormal, 0, 0, .1, .1);
    avatar.layer = 3;

    session.proceed.avatar = avatar;
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
    if (session.proceed.moving) return;
    if (overlapsBounds(x, y, buttonBounds)) {
        session.proceed.avatar.icon = session.proceed.iconHighlight;
    } else {
        session.proceed.avatar.icon = session.proceed.iconNormal;
    }
});

addHandler('mousedown', (session, {x, y}) => {
    if (session.proceed.moving) return;
    if (overlapsBounds(x, y, buttonBounds)) {
        handle(session, 'proceed');
    }
});
