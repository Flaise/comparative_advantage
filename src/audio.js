const {Howl, Howler} = require('howler');
const {startLoading, doneLoading} = require('skid/lib/load');
const {addHandler} = require('skid/lib/event');

exports.loadAudio = function loadAudio(session, howlArgs) {
    startLoading(session);
    const sound = new Howl(howlArgs);
    sound.once('load', () => {
        doneLoading(session);
    });
    return sound;
};

exports.loadAudio2 = function loadAudio2(session, code, howlArgs) {
    const sound = exports.loadAudio(session, howlArgs);
    addHandler(code, () => sound.play());
    addHandler(`${code}_stop`, () => sound.stop());
}

exports.muted = function muted() {
    return Howler._muted;
};

exports.setMuted = function setMuted(muted) {
    Howler.mute(muted);
};
