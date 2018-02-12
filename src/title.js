const Translation = require('skid/lib/scene/translation');
const TextAvatar = require('skid/lib/scene/text-avatar');
const Group = require('skid/lib/scene/group');
const {addHandler} = require('./event');

addHandler('start', (session) => {
    const group = new Group(session.scene.ui);

    let position = new Translation(group);
    position.x.setTo(.5);
    position.y.setTo(.75 / 2);

    let text = new TextAvatar(position, session.scene.camera);
    text.text = 'Comparative Advantage';
    text.textAlign = 'center';
    text.textBaseline = 'bottom';
    text.fillStyle = '#ffd';
    text.strokeStyle = 'black';
    text.lineWidth = 4;
    text.font = '57px verdana';
    text.layer = 9;

    position = new Translation(group);
    position.x.setTo(.38);
    position.y.setTo(.5);

    text = new TextAvatar(position, session.scene.camera);
    text.text = 'Design and programming by Flaise';
    text.textAlign = 'left';
    text.textBaseline = 'bottom';
    text.fillStyle = '#ffd';
    text.strokeStyle = 'black';
    text.lineWidth = 4;
    text.font = '22px verdana';
    text.layer = 9;

    position = new Translation(group);
    position.x.setTo(.38);
    position.y.setTo(.54);

    text = new TextAvatar(position, session.scene.camera);
    text.text = 'Graphics by __';
    text.textAlign = 'left';
    text.textBaseline = 'bottom';
    text.fillStyle = '#ffd';
    text.strokeStyle = 'black';
    text.lineWidth = 4;
    text.font = '22px verdana';
    text.layer = 9;

    position = new Translation(group);
    position.x.setTo(.52);
    position.y.setTo(.58);

    text = new TextAvatar(position, session.scene.camera);
    text.text = 'Tristion Edison';
    text.textAlign = 'left';
    text.textBaseline = 'bottom';
    text.fillStyle = '#ffd';
    text.strokeStyle = 'black';
    text.lineWidth = 4;
    text.font = '22px verdana';
    text.layer = 9;

    position = new Translation(group);
    position.x.setTo(.38);
    position.y.setTo(.62);

    text = new TextAvatar(position, session.scene.camera);
    text.text = 'Audio by Lauren X. Pham';
    text.textAlign = 'left';
    text.textBaseline = 'bottom';
    text.fillStyle = '#ffd';
    text.strokeStyle = 'black';
    text.lineWidth = 4;
    text.font = '22px verdana';
    text.layer = 9;

    session.title = {group};
});

addHandler('proceed_eat_done', (session) => {
    session.title.group.remove();
});
