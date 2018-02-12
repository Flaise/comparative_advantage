const {addHandler} = require('./event');

const commodities = Object.create(null);

function iconOf(session, iconName, stats) {
    const icon = session.atlas.get(iconName);
    icon.loadImage(`./assets/${iconName}.png`, `${iconName}_${stats}`);
    return icon;
}

addHandler('load', (session) => {
    commodities['food'] = {
        name: 'Food', icon: iconOf(session, 'food', '0_0_50'), fmv: .5, singular: 'Food',
    };
    commodities['gold'] = {
        name: 'Gold', icon: iconOf(session, 'gold', '0_0_50'), fmv: 20, singular: 'Gold',
    };
    commodities['silver'] = {
        name: 'Silver', icon: iconOf(session, 'silver', '0_0_50'), fmv: 1, singular: 'Silver',
    };
    commodities['sugar'] = {
        name: 'Sugar', icon: iconOf(session, 'sugar', '0_0_50'), fmv: .4, singular: 'Sugar',
    };
    commodities['cocaine'] = {
        name: 'Cocaines', icon: iconOf(session, 'sugar', '0_0_50'), fmv: .6, singular: 'Cocaine',
    };
    // commodities['salt'] = {name: 'Salt', icon: iconOf(session, 'sugar', '0_0_50'), fmv: .6};
    commodities['cutlass'] = {
        name: 'Cutlasses', icon: iconOf(session, 'cutlass', '0_0_50'), fmv: 5, singular: 'Cutlass',
    };
    commodities['cutlad'] = {
        name: 'Cutlads', icon: iconOf(session, 'cutlad', '0_0_50'), fmv: 6, singular: 'Cutlad',
    };
    commodities['slave'] = {
        name: 'Slaves', icon: iconOf(session, 'slave', '25_25_50'), fmv: 8, singular: 'Slave',
    };
    commodities['tulip'] = {
        name: 'Tulips', icon: iconOf(session, 'tulip', '0_0_50'), fmv: 4, singular: 'Tulip',
    };

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

exports.commodityDisplay = function commodityDisplay(commodity, count) {
    if (commodity.type === 'tulip' && count === 2) return 'Twolips';
    if (count === 1) return `1 ${commodity.singular}`;
    return `${count} ${commodity.name}`;
}
