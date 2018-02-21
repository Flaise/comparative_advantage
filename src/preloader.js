const {PieAvatar} = require('skid/lib/scene/pie-avatar');
const {Translation} = require('skid/lib/scene/translation');
const {TextAvatar} = require('skid/lib/scene/text-avatar');
const {addHandler} = require('skid/lib/event');

addHandler('load', (state) => {
    const meter = new PieAvatar(state.scene.ui);
    meter.x.setTo(.5);
    meter.y.setTo(.75 / 2);
    meter.w.setTo(.03);
    meter.h.setTo(.03);
    meter.fillStyle = 'black';

    const textPosition = new Translation(state.scene.ui);
    textPosition.x.setTo(.5);
    textPosition.y.setTo(.75 / 2 + .032);

    const text = new TextAvatar(textPosition, state.scene.camera);
    text.textAlign = 'center';
    text.textBaseline = 'top';
    text.fillStyle = 'black';
    text.font = '18px verdana';
    text.text = 'Loading...';

    state.preloader = {meter, textPosition};
});

addHandler('load_progress', (state, progress) => {
    state.preloader.meter.breadth.setTo(-progress);
});

addHandler('load_done', (state) => {
    state.preloader.meter.remove();
    state.preloader.textPosition.remove();
});
