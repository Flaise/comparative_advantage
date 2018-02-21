const {addHandler, handle} = require('skid/lib/event');
const {handleLater} = require('skid/lib/timer');
const {amountOf} = require('./inventory');
const {loadAudio} = require('./audio');

addHandler('load', (session) => {
    loadAudio(session, 'cook', {src: ['./assets/cook.ogg', './assets/cook.mp3']});
    loadAudio(session, 'eat', {src: ['./assets/eat.ogg', './assets/eat.mp3']});
});

addHandler('proceed', (session) => {
    session.foodCost = Math.floor(Math.random() * 5) + 1;
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
        handle(session, 'eat');
        handle(session, 'lose', {type: 'food', amount});
        if (session.foodCost === 0) {
            handle(session, 'proceed_eat_done');
            return;
        }
    } else if (amountOf(session, 'slave') > 0) {
        handle(session, 'cook');
        handle(session, 'lose', {type: 'slave', amount: 1});
        handle(session, 'gain', {type: 'food', amount: 6});
    } else {
        handle(session, 'proceed_starve');
        return;
    }
    handleLater(session, 900, 'proceed_eat');
});
