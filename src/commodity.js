const {addHandler} = require('./event');

const commodities = Object.create(null);

function iconOf(session, iconName, stats) {
    const icon = session.atlas.get(iconName);
    icon.loadImage(`./assets/${iconName}.png`, `${iconName}_${stats}`);
    return icon;
}

addHandler('load', (session) => {
    commodities['food'] = {name: 'Food', icon: iconOf(session, 'food', '0_0_50'), fmv: .5};
    commodities['gold'] = {name: 'Gold', icon: iconOf(session, 'gold', '0_0_50'), fmv: 20};
    commodities['silver'] = {name: 'Silver', icon: iconOf(session, 'silver', '0_0_50'), fmv: 1};
    commodities['sugar'] = {name: 'Sugar', icon: iconOf(session, 'sugar', '0_0_50'), fmv: .2};
    commodities['cocaine'] = {name: 'Cocaine', icon: iconOf(session, 'sugar', '0_0_50'), fmv: .6};
    // commodities['salt'] = {name: 'Salt', icon: iconOf(session, 'sugar', '0_0_50'), fmv: .6};
    commodities['cutlass'] = {name: 'Cutlasses', icon: iconOf(session, 'cutlass', '0_0_50'), fmv: 5};
    commodities['cutlad'] = {name: 'Cutlads', icon: iconOf(session, 'cutlad', '0_0_50'), fmv: 6};
    commodities['slave'] = {name: 'Slaves', icon: iconOf(session, 'slave', '0_0_50'), fmv: 8};
    commodities['tulip'] = {name: 'Tulips', icon: iconOf(session, 'tulip', '0_0_50'), fmv: 4};

    for (const type of Object.keys(commodities)) {
        commodities[type].type = type;
    }
});

exports.commodityOfType = function commodityOfType(type) {
    return commodities[type];
};

exports.commodityTypes = function commodityTypes() {
    return Object.keys(commodities);
};
