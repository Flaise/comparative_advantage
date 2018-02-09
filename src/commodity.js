const {addHandler} = require('./event');

const commodities = Object.create(null);

function iconOf(session, iconName, stats) {
    const icon = session.atlas.get(iconName);
    icon.loadImage(`./assets/${iconName}.png`, `${iconName}_${stats}`);
    return icon;
}

addHandler('load', (session) => {
    commodities['food'] = {name: 'Food', icon: iconOf(session, 'food', '0_0_50')};
    commodities['gold'] = {name: 'Gold', icon: iconOf(session, 'gold', '0_0_50')};
    commodities['silver'] = {name: 'Silver', icon: iconOf(session, 'silver', '0_0_50')};
    // commodities['sugar'] = {name: 'Sugar', icon: iconOf(session, 'sugar', '0_0_50')};
    // commodities['cocaine'] = {name: 'Cocaine', icon: iconOf(session, 'sugar', '0_0_50')};
    // commodities['salt'] = {name: 'Salt', icon: iconOf(session, 'sugar', '0_0_50')};
    // commodities['cutlass'] = {name: 'Cutlasses', icon: iconOf(session, 'cutlass', '0_0_50')};
    // commodities['cutlad'] = {name: 'Cutlads', icon: iconOf(session, 'cutlad', '0_0_50')};
    // commodities['slave'] = {name: 'Slaves', icon: iconOf(session, 'slave', '0_0_50')};
    // commodities['tulip'] = {name: 'Tulips', icon: iconOf(session, 'tulip', '0_0_50')};
});

exports.commodityOfType = function commodityOfType(type) {
    return commodities[type];
};
