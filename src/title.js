const {Translation} = require('skid/lib/scene/translation');
const {TextAvatar} = require('skid/lib/scene/text-avatar');
const {Group} = require('skid/lib/scene/group');
const {addHandler, handle} = require('skid/lib/event');
const {loadAudio} = require('skid/lib/audio');

addHandler('load', (state) => {
    loadAudio(state, 'title', {
        src: ['./assets/menu.ogg', './assets/menu.mp3'],
        loop: true,
    }).then((sound) => {
        state.title.sound = sound;
    });
    state.title = {played: false, done: false};
});

addHandler('load_done', (state) => {
    const group = new Group(state.scene.ui);

    let position = new Translation(group);
    position.x.setTo(.5);
    position.y.setTo(.75 / 2);

    let text = new TextAvatar(position, state.scene.camera);
    text.text = 'Comparative Advantage';
    text.textAlign = 'center';
    text.textBaseline = 'middle';
    text.fillStyle = '#dfdfef';
    text.strokeStyle = '#444';
    text.lineWidth = 4;
    text.font = '73px verdana';
    text.layer = 9;

    position = new Translation(group);
    position.x.setTo(.38);
    position.y.setTo(.52);

    text = new TextAvatar(position, state.scene.camera);
    text.text = 'Design and programming by Flaise';
    text.textAlign = 'left';
    text.textBaseline = 'bottom';
    text.fillStyle = '#ffe';
    text.strokeStyle = '#484848';
    text.lineWidth = 3.5;
    text.font = '26px verdana';
    text.layer = 9;

    position = new Translation(group);
    position.x.setTo(.38);
    position.y.setTo(.56);

    text = new TextAvatar(position, state.scene.camera);
    text.text = 'Graphics by Joy Hua';
    text.textAlign = 'left';
    text.textBaseline = 'bottom';
    text.fillStyle = '#ffe';
    text.strokeStyle = '#555';
    text.lineWidth = 3.5;
    text.font = '24px verdana';
    text.layer = 9;

    position = new Translation(group);
    position.x.setTo(.532);
    position.y.setTo(.6);

    text = new TextAvatar(position, state.scene.camera);
    text.text = 'Tristion Edison';
    text.textAlign = 'left';
    text.textBaseline = 'bottom';
    text.fillStyle = '#ffe';
    text.strokeStyle = '#555';
    text.lineWidth = 3.5;
    text.font = '24px verdana';
    text.layer = 9;

    position = new Translation(group);
    position.x.setTo(.38);
    position.y.setTo(.64);

    text = new TextAvatar(position, state.scene.camera);
    text.text = 'Audio by Lauren X. Pham';
    text.textAlign = 'left';
    text.textBaseline = 'bottom';
    text.fillStyle = '#ffe';
    text.strokeStyle = '#555';
    text.lineWidth = 3.5;
    text.font = '24px verdana';
    text.layer = 9;

    state.title.group = group;
});

addHandler('proceed_eat_done', (state) => {
    if (state.title.done) return;
    state.title.done = true;
    state.title.group.remove();
    handle(state, 'title_stop');
});

addHandler('mousemove', (state) => {
    if (!state.title.played) {
        state.title.played = true;
        handle(state, 'title');
    }
});

addHandler('pagehide', (state) => {
    if (state.title.done) return;
    state.title.sound.fade(1, 0, 500);
});

addHandler('pageshow', (state) => {
    if (state.title.done) return;
    state.title.sound.fade(0, 1, 800);
});
