const {Howl, Howler} = require('howler');
const {loadData, startLoading, doneLoading} = require('skid/lib/load');
const {addHandler} = require('skid/lib/event');

function supportsFormat(format) {
    const a = document.createElement('audio');
    return !!(a.canPlayType && a.canPlayType(format).replace(/no/, ''));
}

const vorbisSupported = supportsFormat('audio/ogg; codecs="vorbis"');
const mp3Supported = supportsFormat('audio/mpeg;');

function load(state, eventCode, howlArgs, id) {
    return new Promise((resolve, reject) => {
        const sound = new Howl(howlArgs);
        addHandler(eventCode, () => sound.play());
        addHandler(`${eventCode}_stop`, () => sound.stop());
        sound.once('loaderror', (id, error) => reject(error));
        sound.once('load', () => {
            resolve(sound);
            doneLoading(state, id);
        });
    });
}

exports.loadAudio = function loadAudio(state, eventCode, howlArgs) {
    const id = startLoading(state);
    let src = howlArgs.src;
    if (!Array.isArray(src)) src = [src];
    for (const path of src) {
        if ((path.endsWith('.mp3') && mp3Supported)
        || (path.endsWith('.ogg') && vorbisSupported)) {
            return loadData(state, path).then((source) => {
                howlArgs.src = [source];
                howlArgs.format = [path.substr(path.length - 3)];
                return load(state, eventCode, howlArgs, id);
            });
        }
    }
    return load(state, eventCode, howlArgs, id);
};

exports.muted = function muted() {
    return Howler._muted;
};

exports.setMuted = function setMuted(muted) {
    Howler.mute(muted);
};
