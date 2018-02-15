const {load} = require('skid/lib/load');
const {addHandler, handle} = require('skid/lib/event');
require('./viewport');
require('./water');
require('./port');
require('./vendor');
require('./ship');
require('./proceed');
require('./input');
require('./inventory');
require('./commodity');
require('./eat');
require('./gameover');
require('./title');
require('./music');
require('./mute');

window.addEventListener('load', () => {
    const state = Object.create(null);
    window.getState = () => state; // NOTE: For debugging introspection.
    load(state);
});

addHandler('load_done', (state) => handle(state, 'start'));
