const Viewport = require('skid/lib/scene/viewport');
const ClearAll = require('skid/lib/scene/clear-all');
const Smoothing = require('skid/lib/scene/smoothing');
const Camera = require('skid/lib/scene/camera');
const Group = require('skid/lib/scene/group');
const Atlas = require('skid/lib/scene/atlas');
const {addHandler} = require('./event');

addHandler('start', (session) => {
    const renderer = new Viewport();
    const clearAll = new ClearAll(renderer);
    const smoothing = new Smoothing(renderer, true);
    const camera = new Camera(smoothing);
    const world = new Group(camera);
    const atlas = new Atlas();

    camera.w.setTo(1);
    camera.h.setTo(.5);
});
