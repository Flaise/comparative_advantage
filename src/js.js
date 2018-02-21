const {load} = require('skid/lib/load');
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
require('./preloader');

window.addEventListener('load', () => {
    load(true);
});
