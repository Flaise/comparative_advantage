const IconAvatar = require('skid/lib/scene/icon-avatar');
const Translation = require('skid/lib/scene/translation');
const TextAvatar = require('skid/lib/scene/text-avatar');
const {addHandler} = require('./event');
const {commodityOfType} = require('./commodity');
const {Visibility} = require('./visibility');
const {overlapsBounds} = require('./bounds');
const {linear} = require('skid/lib/tween');

const slotPositions = [
    {left: .28, top: .08, width: .05, height: .05},
    {left: .37, top: .07, width: .05, height: .05},
    {left: .43, top: .09, width: .05, height: .05},
    {left: .55, top: .07, width: .05, height: .05},
    {left: .61, top: .09, width: .05, height: .05},
];

addHandler('start', (session) => {
    session.inventory = [];

    for (const {left, top} of slotPositions) {
        makeSlot(session, left, top);
    }

    gainCommodity(session, 'food', 5, true);
    gainCommodity(session, 'gold', 3, true);
    gainCommodity(session, 'silver', 9, true);
    gainCommodity(session, 'slave', 2, true);
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
    text.font = '24px verdana';

    const avatar = new IconAvatar(session.scene.world, undefined, x, y, .05, .05);
    avatar.layer = 6;

    const slot = {avatar, text, textVisible, type: undefined, amount: 0,
                  index: session.inventory.length};
    session.inventory.push(slot);
}

function gainCommodity(session, type, amount, silent = false) {
    const commodity = commodityOfType(type);
    for (const slot of session.inventory) {
        if (slot.type === type) {
            slot.amount += amount;
            slot.text.text = slot.amount + ' ' + commodity.name;
            if (!silent) {
                const position = slotPositions[slot.index];
                risingText(session, position.left + position.width / 2, position.top, '+' + amount);
            }
            return;
        }
    }
    for (const slot of session.inventory) {
        if (slot.type == undefined) {
            slot.type = type;
            slot.amount = amount;
            slot.avatar.icon = commodity.icon;
            slot.text.text = amount + ' ' + commodity.name;
            if (!silent) {
                const position = slotPositions[slot.index];
                risingText(session, position.left + position.width / 2, position.top, '+' + amount);
            }
            return;
        }
    }
}
exports.gainCommodity = gainCommodity;

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
    text.font = '22px verdana';
}

function loseCommodity(session, type, amount) {
    if (amount === 0) return;
    const commodity = commodityOfType(type);
    for (const slot of session.inventory) {
        if (slot.type === type) {
            slot.amount -= amount;
            slot.text.text = slot.amount + ' ' + commodity.name;

            const position = slotPositions[slot.index];
            risingText(session, position.left + position.width / 2, position.top, '-' + amount);

            if (slot.amount <= 0) {
                slot.amount = 0;
                slot.type = undefined;
                slot.avatar.icon = undefined;
            }
            return;
        }
    }
}
exports.loseCommodity = loseCommodity;

function amountOf(session, type) {
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
    if (slotsFree(session) > 0) return true;
    return false;
};
