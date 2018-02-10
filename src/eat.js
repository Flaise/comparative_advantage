const {addHandler, handle} = require('./event');
const {amountOf, loseCommodity, gainCommodity} = require('./inventory');

addHandler('proceed', (session) => {
    session.foodCost = Math.floor(Math.random() * 9) + 1;
});

addHandler('proceed_eat', (session) => {
    if (session.foodCost <= 0) {
        handle(session, 'proceed_eat_done');
        return;
    }
    const foodHeld = amountOf(session, 'food');
    if (foodHeld > 0) {
        const consumed = Math.min(foodHeld, session.foodCost);
        loseCommodity(session, 'food', consumed);
        session.foodCost -= consumed;
    } else if (amountOf(session, 'slave')) {
        loseCommodity(session, 'slave', 1);
        gainCommodity(session, 'food', 5);
    }
    setTimeout(() => handle(session, 'proceed_eat'), 1000);
});
