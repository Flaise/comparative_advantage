const IconAvatar = require('skid/lib/scene/icon-avatar');
const Translation = require('skid/lib/scene/translation');
const TextAvatar = require('skid/lib/scene/text-avatar');
const {addHandler, handle, handleLater} = require('./event');
const {Visibility} = require('./visibility');
const {overlapsBounds} = require('./bounds');
const {commodityTypes, commodityOfType, commodityDisplay} = require('./commodity');
const {canTrade, amountOf} = require('./inventory');
const {inputEnabled} = require('./input');

const RARR = '\u2192';

addHandler('load', (session) => {
    loadImage(session, 'vendor1');
    loadImage(session, 'vendor2');
    loadImage(session, 'vendor3');
    loadImage(session, 'vendor4');
    loadImage(session, 'vendor5');
    loadImage(session, 'vendor6');
})

addHandler('start', (session) => {
    session.vendorsEnabled = true;
    session.vendors = [];
    makeVendor(session, 'vendor1', {left: 139, top: 585, right: 243, bottom: 664});
    makeVendor(session, 'vendor2', {left: 268, top: 434, right: 365, bottom: 508});
    makeVendor(session, 'vendor3', {left: 626, top: 425, right: 718, bottom: 503});
    makeVendor(session, 'vendor4', {left: 792, top: 601, right: 907, bottom: 701});
    makeVendor(session, 'vendor5', {left: 420, top: 582, right: 524, bottom: 651});
    makeVendor(session, 'vendor6', {left: 790, top: 450, right: 900, bottom: 530});
});

addHandler('proceed', (session) => {
    session.vendorsEnabled = false;
    for (const vendor of session.vendors) {
        vendor.visibility.visible = false;
    }
});

addHandler('proceed_done', (session) => {
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

addHandler('mousedown', (session, {x, y}) => {
    if (!session.vendorsEnabled) return;
    for (const vendor of session.vendors) {
        if (overlapsBounds(x, y, vendor.bounds)
        && canTrade(session, vendor.sell.type, vendor.buy.type, vendor.buyCount)) {
            // Save these here because vendor gets rescaled during 'lose' event.
            const {buyCount, sellCount} = vendor;
            handle(session, 'inputconfigure', {type: 'mousedown', enabled: false});
            handle(session, 'lose', {type: vendor.buy.type, amount: buyCount});
            handleLater(session, 200, 'gain', {type: vendor.sell.type, amount: sellCount});
            handleLater(session, 450, 'inputconfigure', {type: 'mousedown', enabled: true});
            return;
        }
    }
});

function loadImage(session, baseName) {
    const icon = session.atlas.get(baseName);
    icon.loadImage(`./assets/${baseName}.png`, `${baseName}_0_0_1000`);
}

function makeVendor(session, baseName, bounds) {
    const visibility = new Visibility(session.scene.world);
    visibility.visible = false;

    const avatar = new IconAvatar(visibility, session.atlas.get(baseName), 0, 0, 1, 1);
    avatar.layer = 3;

    const textPosition = new Translation(session.scene.world);
    textPosition.x.setTo((bounds.right + bounds.left) / 2.0 / 1000.0);
    textPosition.y.setTo(bounds.top / 1000.0);

    const text = new TextAvatar(textPosition, session.scene.camera);
    text.textAlign = 'center';
    text.textBaseline = 'bottom';
    text.fillStyle = 'white';
    text.font = '24px verdana';
    text.layer = 4;

    session.vendors.push({visibility, bounds, text});
}

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

addHandler('start proceed_done', (session) => {
    // Can't have same commodity on both sides of the exchange in one town or else free money.
    const types = shuffle(commodityTypes());
    const buys = [];
    const sells = [];
    for (const type of types) {
        if (buys.length < 3) {
            buys.push(type);
        } else if (!sells.length < 3) {
            sells.push(type);
        } else if (Math.random() > .5) {
            buys.push(type);
        } else {
            sells.push(type);
        }
    }

    const combinations = {};

    for (const vendor of session.vendors) {
        // Every vendor must have a unique pair of commodity types
        let buyType, sellType;
        do {
            buyType = buys[Math.floor(Math.random() * buys.length)];
            sellType = sells[Math.floor(Math.random() * sells.length)];
        } while (combinations[buyType + sellType]);
        combinations[buyType + sellType] = true;

        const buy = commodityOfType(buyType);
        const sell = commodityOfType(sellType);

        vendor.buy = buy;
        vendor.sell = sell;

        const buyValue = buy.fmv * (1 + Math.random() * .8 - .4);
        const sellValue = sell.fmv * (1 + Math.random() * .8 - .4);

        let buyCount = 1;
        let sellCount = buyValue / sellValue;
        if (buyCount < 1) {
            sellCount /= buyCount;
            buyCount = 1;
        } else if (sellCount < 1) {
            buyCount /= sellCount;
            sellCount = 1;
        }

        vendor.baseBuyCount = buyCount;
        vendor.baseSellCount = sellCount;
    }

    scaleVendors(session);
});

function buyText(vendor) {
    return commodityDisplay(vendor.buy, vendor.buyCount);
}

function sellText(vendor) {
    return commodityDisplay(vendor.sell, vendor.sellCount);
}

function scaleVendors(session) {
    if (!session.vendors) return;
    for (const vendor of session.vendors) {
        vendor.buyCount = vendor.baseBuyCount;
        vendor.sellCount = vendor.baseSellCount;
        const amountHeld = amountOf(session, vendor.buy.type);
        if (amountHeld >= vendor.baseBuyCount * 20) {
            vendor.buyCount *= 10;
            vendor.sellCount *= 10;
        } else if (amountHeld >= vendor.baseBuyCount * 10) {
            vendor.buyCount *= 5;
            vendor.sellCount *= 5;
        }
        vendor.buyCount = Math.ceil(vendor.buyCount);
        vendor.sellCount = Math.ceil(vendor.sellCount);
        vendor.text.text = `${buyText(vendor)} ${RARR} ${sellText(vendor)}`;
    }
}

function updateVendorTextColor(session) {
    // this file imports inventory so inventory always fires 'gain' events first
    if (!session.vendors) return;
    if (!session.vendorsEnabled) {
        for (const vendor of session.vendors) {
            vendor.text.fillStyle = 'transparent';
            vendor.text.changed();
        }
        return;
    }
    if (!inputEnabled(session, 'mousedown')) {
        for (const vendor of session.vendors) {
            vendor.text.fillStyle = '#aaa';
            vendor.text.changed();
        }
        return;
    }
    for (const vendor of session.vendors) {
        if (amountOf(session, vendor.buy.type) >= vendor.buyCount) {
            vendor.text.fillStyle = 'white';
        } else {
            vendor.text.fillStyle = '#ccc';
        }
        vendor.text.changed();
    }
}

addHandler('start proceed_done gain lose inputconfigure proceed', (session) => {
    updateVendorTextColor(session);
});

addHandler('gain lose', (session) => {
    scaleVendors(session);
});
