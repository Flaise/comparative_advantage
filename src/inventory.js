const IconAvatar = require('skid/lib/scene/icon-avatar');
const Translation = require('skid/lib/scene/translation');
const {addHandler} = require('./event');
const {commodityOfType} = require('./commodity');

const slotPositions = [
    [.28, .08],
    [.37, .07],
    [.43, .09],
    [.55, .07],
    [.61, .09],
];

addHandler('start', (session) => {
    session.inventory = [];

    for (const [x, y] of slotPositions) {
        makeSlot(session, x, y);
    }

    gainCommodity(session, 'food', 5);
    gainCommodity(session, 'food', 5);
    gainCommodity(session, 'gold', 3);
    gainCommodity(session, 'silver', 9);
});

function makeSlot(session, x, y) {
    const avatar = new IconAvatar(session.scene.world, undefined, x, y, .05, .05);
    avatar.layer = 6;

    const slot = {avatar, name: '???', type: undefined, amount: 0};
    session.inventory.push(slot);
}

function gainCommodity(session, type, amount) {
    for (const slot of session.inventory) {
        if (slot.type === type) {
            slot.amount += amount;
            return;
        }
    }
    const commodity = commodityOfType(type);
    for (const slot of session.inventory) {
        if (slot.type == undefined) {
            slot.type = type;
            slot.amount = amount;
            slot.avatar.icon = commodity.icon;
            slot.name = commodity.name;
            return;
        }
    }
}
