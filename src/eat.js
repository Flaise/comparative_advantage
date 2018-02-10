const {addHandler, handle, handleLater} = require('./event');
const {amountOf} = require('./inventory');

addHandler('proceed', (session) => {
    session.foodCost = Math.floor(Math.random() * 3) + 1;
});

addHandler('proceed_eat', (session) => {
    if (session.foodCost <= 0) {
        handle(session, 'proceed_eat_done');
        return;
    }
    const foodHeld = amountOf(session, 'food');
    if (foodHeld > 0) {
        const amount = Math.min(foodHeld, session.foodCost);
        session.foodCost -= amount;
        handle(session, 'lose', {type: 'food', amount});
    } else if (amountOf(session, 'slave') > 0) {
        handle(session, 'lose', {type: 'slave', amount: 1});
        handle(session, 'gain', {type: 'food', amount: 6});
    } else {
        handle(session, 'proceed_starve');
        return;
    }
    handleLater(session, 900, 'proceed_eat');
});
