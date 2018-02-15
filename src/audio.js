const {Howl, Howler} = require('howler');
const {startLoading, doneLoading} = require('skid/lib/load');

exports.loadAudio = function loadAudio(session, howlArgs) {
    startLoading(session);
    const sound = new Howl(howlArgs);
    sound.once('load', () => {
        doneLoading(session);
    });
    return sound;
};

exports.muted = function muted() {
    return Howler._muted;
};

exports.setMuted = function setMuted(muted) {
    Howler.mute(muted);
};
