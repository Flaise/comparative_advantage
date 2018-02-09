require('./viewport');
require('./water');
require('./port');
require('./vendor');
require('./ship');
require('./proceed');
require('./input');

const Atlas = require('skid/lib/scene/atlas');
const {handle} = require('./event');

window.addEventListener('load', () => {
    const session = Object.create(null);
    window.getSession = () => session; // NOTE: For debugging introspection.
    session.atlas = new Atlas();
    handle(session, 'load');
    handle(session, 'start');
});
