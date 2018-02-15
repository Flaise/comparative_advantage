const {Translation} = require('skid/lib/scene/translation');
const {TextAvatar} = require('skid/lib/scene/text-avatar');
const {Group} = require('skid/lib/scene/group');
const {Howl} = require('howler');
const {addHandler} = require('skid/lib/event');

addHandler('load', (session) => {
    const sound = new Howl({
        src: ['./assets/menu.ogg', './assets/menu.mp3'],
        loop: true,
    });
    session.title = {sound, played: false};
});

addHandler('start', (session) => {
    const group = new Group(session.scene.ui);

    let position = new Translation(group);
    position.x.setTo(.5);
    position.y.setTo(.75 / 2);

    let text = new TextAvatar(position, session.scene.camera);
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

    text = new TextAvatar(position, session.scene.camera);
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

    text = new TextAvatar(position, session.scene.camera);
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

    text = new TextAvatar(position, session.scene.camera);
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

    text = new TextAvatar(position, session.scene.camera);
    text.text = 'Audio by Lauren X. Pham';
    text.textAlign = 'left';
    text.textBaseline = 'bottom';
    text.fillStyle = '#ffe';
    text.strokeStyle = '#555';
    text.lineWidth = 3.5;
    text.font = '24px verdana';
    text.layer = 9;

    session.title.group = group;
});

addHandler('proceed_eat_done', (session) => {
    session.title.group.remove();
    session.title.sound.stop();
});

addHandler('mousemove', (session) => {
    if (!session.title.played) {
        session.title.played = true;
        session.title.sound.play();
    }
});
