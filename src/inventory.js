const IconAvatar = require('skid/lib/scene/icon-avatar');
const Translation = require('skid/lib/scene/translation');
const TextAvatar = require('skid/lib/scene/text-avatar');
const {linear} = require('skid/lib/tween');
const {addHandler, handle} = require('./event');
const {commodityOfType, commodityDisplay} = require('./commodity');
const {Visibility} = require('./visibility');
const {overlapsBounds} = require('./bounds');

const slotPositions = [
    {left: .29, top: .15, width: .05, height: .05},
    {left: .37, top: .17, width: .05, height: .05},
    {left: .43, top: .19, width: .05, height: .05},
    {left: .55, top: .17, width: .05, height: .05},
    {left: .61, top: .19, width: .05, height: .05},
];

addHandler('start', (session) => {
    session.inventory = [];

    for (const {left, top} of slotPositions) {
        makeSlot(session, left, top);
    }

    updateSlot(session.inventory[0], 'food', 30);
    updateSlot(session.inventory[1], 'gold', 2);
    updateSlot(session.inventory[2], 'silver', 20);
});

addHandler('mousemove', (session, {x, y}) => {
    for (let i = 0; i < slotPositions.length; i += 1) {
        if (overlapsBounds(x / 1000.0, y / 1000.0, slotPositions[i])
        && session.inventory[i].amount) {
            session.inventory[i].textVisible.visible = true;
        } else {
            session.inventory[i].textVisible.visible = false;
        }
    }
});

function makeSlot(session, x, y) {
    const textVisible = new Visibility(session.scene.ui);
    textVisible.visible = false;

    const textPosition = new Translation(textVisible);
    textPosition.x.setTo(x + .025);
    textPosition.y.setTo(y);

    const text = new TextAvatar(textPosition, session.scene.camera);
    text.text = '???';
    text.textAlign = 'center';
    text.textBaseline = 'bottom';
    text.fillStyle = 'white';
    text.strokeStyle = 'black';
    text.lineWidth = 4;
    text.font = '24px verdana';

    const avatar = new IconAvatar(session.scene.world, undefined, x, y, .05, .05);
    avatar.layer = 6;

    const slot = {avatar, text, textVisible, type: undefined, amount: 0,
                  index: session.inventory.length};
    session.inventory.push(slot);
}

function updateSlot(slot, type, amount) {
    slot.type = type;
    if (type) {
        slot.amount = amount;
    } else {
        slot.amount = 0;
    }

    if (slot.amount <= 0) {
        slot.amount = 0;
        slot.type = undefined;
        slot.avatar.icon = undefined;
    } else {
        const commodity = commodityOfType(type);
        slot.avatar.icon = commodity.icon;
        slot.text.text = commodityDisplay(commodity, slot.amount);
    }
}

function risingText(session, x, y, content) {
    const textPosition = new Translation(session.scene.ui);
    textPosition.x.setTo(x);
    textPosition.y.setTo(y);
    textPosition.y.mod(-.035, 900, linear, () => textPosition.remove());

    const text = new TextAvatar(textPosition, session.scene.camera);
    text.text = content;
    text.textAlign = 'center';
    text.textBaseline = 'bottom';
    text.fillStyle = 'white';
    text.strokeStyle = 'black';
    text.lineWidth = 4;
    text.font = '22px verdana';
}

function slotRisingText(session, slot, content) {
    const position = slotPositions[slot.index];
    risingText(session, position.left + position.width / 2, position.top, content);
}

addHandler('gain', (session, {type, amount}) => {
    for (const slot of session.inventory) {
        if (slot.type === type) {
            updateSlot(slot, type, slot.amount + amount);
            slotRisingText(session, slot, '+' + amount);
            return;
        }
    }
    for (const slot of session.inventory) {
        if (slot.type == undefined) {
            updateSlot(slot, type, amount);
            slotRisingText(session, slot, '+' + amount);
            return;
        }
    }
});

addHandler('lose', (session, {type, amount}) => {
    if (amount === 0) return;
    for (const slot of session.inventory) {
        if (slot.type === type) {
            updateSlot(slot, type, slot.amount - amount);
            slotRisingText(session, slot, '-' + amount);
            return;
        }
    }
});

function amountOf(session, type) {
    if (typeof type !== 'string') throw new Error();
    for (const slot of session.inventory) {
        if (slot.type === type) {
            return slot.amount;
        }
    }
    return 0;
}
exports.amountOf = amountOf;

function slotsFree(session) {
    let result = 0;
    for (const slot of session.inventory) {
        if (slot.type == undefined) {
            result += 1;
        }
    }
    return result;
}

exports.canTrade = function canTrade(session, inType, outType, outAmount) {
    const heldOutAmount = amountOf(session, outType);
    if (heldOutAmount < outAmount) return false;
    if (heldOutAmount === outAmount) return true;
    if (amountOf(session, inType) > 0) return true;
    if (slotsFree(session) > 0) return true;
    return false;
};
