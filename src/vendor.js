const IconAvatar = require('skid/lib/scene/icon-avatar');
const {addHandler} = require('./event');
const {Visibility} = require('./visibility');
const {overlapsBounds} = require('./bounds');

addHandler('start', (session) => {
    session.vendorsEnabled = true;
    session.vendors = [];
    loadVendor(session, 'vendor1', {left: 139, top: 585, right: 243, bottom: 664});
    loadVendor(session, 'vendor2', {left: 268, top: 434, right: 365, bottom: 508});
    loadVendor(session, 'vendor3', {left: 626, top: 425, right: 718, bottom: 503});
    loadVendor(session, 'vendor4', {left: 792, top: 601, right: 907, bottom: 701});
});

addHandler('proceed', (session) => {
    session.vendorsEnabled = false;
    for (const vendor of session.vendors) {
        vendor.visibility.visible = false;
    }
});

addHandler('endproceed', (session) => {
    session.vendorsEnabled = true;
});

addHandler('mousemove', (session, {x, y}) => {
    if (!session.vendorsEnabled) return;
    for (const vendor of session.vendors) {
        if (overlapsBounds(x, y, vendor.bounds)) {
            vendor.visibility.visible = true;
        } else {
            vendor.visibility.visible = false;
        }
        vendor.visibility.changed();
    }
});

function loadVendor(session, baseName, bounds) {
    const icon = session.atlas.get(baseName);
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
