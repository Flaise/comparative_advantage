const IconAvatar = require('skid/lib/scene/icon-avatar');
const {addHandler} = require('./event');
const {Visibility} = require('./visibility');

addHandler('start', (session) => {
    session.vendors = [];
    loadVendor(session, 'vendor1', { left: 139, top: 585, right: 243, bottom: 664 });
    loadVendor(session, 'vendor2', { left: 268, top: 434, right: 365, bottom: 508 });
    loadVendor(session, 'vendor3', { left: 626, top: 425, right: 718, bottom: 503 });
    loadVendor(session, 'vendor4', { left: 792, top: 601, right: 907, bottom: 701 });

    canvas.addEventListener('mousemove', (event) => onMouseMove(session, event));
});

function between(n, min, max) {
    return n >= min && n <= max;
}

function overlapsVendor(x, y, vendor) {
    const { left, top, right, bottom } = vendor.bounds;
    return between(x, left, right) && between(y, top, bottom);
}

function onMouseMove(session, event) {
    const x = event.pageX - canvas.offsetLeft;
    const y = event.pageY - canvas.offsetTop;
    console.log('mouse', x, y);

    for (const vendor of session.vendors) {
        if (overlapsVendor(x, y, vendor)) {
            vendor.visibility.visible = true;
        } else {
            vendor.visibility.visible = false;
        }
        vendor.visibility.changed();
    }
}

function loadVendor(session, baseName, bounds) {
    const icon = session.scene.atlas.get(baseName);
    icon.loadImage(`./assets/${baseName}.png`, `${baseName}_0_0_1000`);
    const visibility = new Visibility(session.scene.world);
    visibility.visible = false;
    const avatar = new IconAvatar(visibility, icon, 0, 0, 1, 1);
    avatar.layer = 3;
    session.vendors.push({
        visibility,
        bounds,
    });
}
