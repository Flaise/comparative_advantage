const {extname} = require('path');
const {Howl, Howler} = require('howler');
const {loadData, startLoading, doneLoading, progressLoading} = require('skid/lib/load');
const {addHandler} = require('skid/lib/event');

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
    const id = startLoading(state, 0); // 0 size so 'load_progress' event can fire
    let src = howlArgs.src;
    if (!Array.isArray(src)) src = [src];
    for (const path of src) {
        const extension = extname(path);
        if (Howler.codecs(extension)) {
            return loadData(state, path).then((source) => {
                howlArgs.src = [source];
                howlArgs.format = [extension];
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
