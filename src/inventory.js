const IconAvatar = require('skid/lib/scene/icon-avatar');
const Translation = require('skid/lib/scene/translation');
const TextAvatar = require('skid/lib/scene/text-avatar');
const {addHandler} = require('./event');
const {commodityOfType} = require('./commodity');
const {Visibility} = require('./visibility');
const {overlapsBounds} = require('./bounds');

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

    gainCommodity(session, 'food', 5);
    gainCommodity(session, 'food', 5);
    gainCommodity(session, 'gold', 3);
    gainCommodity(session, 'silver', 9);
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
    text.font = '26px verdana';

    const avatar = new IconAvatar(session.scene.world, undefined, x, y, .05, .05);
    avatar.layer = 6;

    const slot = {avatar, text, textVisible, type: undefined, amount: 0};
    session.inventory.push(slot);
}

function gainCommodity(session, type, amount) {
    const commodity = commodityOfType(type);
    for (const slot of session.inventory) {
        if (slot.type === type) {
            slot.amount += amount;
            slot.text.text = amount + ' ' + commodity.name;
            return;
        }
    }
    for (const slot of session.inventory) {
        if (slot.type == undefined) {
            slot.type = type;
            slot.amount = amount;
            slot.avatar.icon = commodity.icon;
            slot.text.text = amount + ' ' + commodity.name;
            return;
        }
    }
}
