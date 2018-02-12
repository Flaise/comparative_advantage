const {Howler} = require('howler');
const {addHandler} = require('./event');
const {overlapsBounds} = require('./bounds');

const muteBounds = {left: 0, top: 0, right: 50, bottom: 50};

addHandler('mousedown', (session, {x, y}) => {
    if (overlapsBounds(x, y, muteBounds)) {
        Howler.mute(!Howler._muted);
    }
});
