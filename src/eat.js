const {addHandler, handle, handleLater} = require('./event');
const {amountOf, loseCommodity, gainCommodity} = require('./inventory');

addHandler('proceed', (session) => {
    session.foodCost = Math.floor(Math.random() * 7) + 1;
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
    } else if (amountOf(session, 'slave') > 0) {
        loseCommodity(session, 'slave', 1);
        gainCommodity(session, 'food', 5);
    } else {
        handle(session, 'proceed_starve');
        return;
    }
    handleLater(session, 900, 'proceed_eat');
});
