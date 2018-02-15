const {Translation} = require('skid/lib/scene/translation');
const {TextAvatar} = require('skid/lib/scene/text-avatar');
const {Howl} = require('howler');
const {addHandler, handle} = require('skid/lib/event');
const {handleLater} = require('skid/lib/timer');

const RARR = '\u2192';

addHandler('load', (session) => {
    const sound = new Howl({src: ['./assets/game_over.ogg', './assets/game_over.mp3']});
    session.gameover = {sound};
});

addHandler('proceed_starve', (session) => {
    session.gameover.sound.play();

    const position = new Translation(session.scene.ui);
    position.x.setTo(.5);
    position.y.setTo(.75 / 2);

    const text = new TextAvatar(position, session.scene.camera);
    text.text = `0 Food ${RARR} 0 Sailors`;
    text.textAlign = 'center';
    text.textBaseline = 'bottom';
    text.fillStyle = '#fdd';
    text.strokeStyle = 'black';
    text.lineWidth = 5;
    text.font = '37px verdana';
    text.layer = 9;

    session.gameover.text1 = position;

    handleLater(session, 1000, 'gameover');
});

addHandler('gameover', (session) => {
    const position = new Translation(session.scene.ui);
    position.x.setTo(.5);
    position.y.setTo(.75 / 2);

    const text = new TextAvatar(position, session.scene.camera);
    text.text = 'GAME OVER';
    text.textAlign = 'center';
    text.textBaseline = 'top';
    text.fillStyle = '#fdd';
    text.strokeStyle = 'black';
    text.lineWidth = 4;
    text.font = '47px verdana';
    text.layer = 9;

    session.gameover.text2 = position;

    handleLater(session, 1000, 'gameover_replay');
});

addHandler('gameover_replay', (session) => {
    const position = new Translation(session.scene.ui);
    position.x.setTo(.5);
    position.y.setTo(.55);

    const text = new TextAvatar(position, session.scene.camera);
    text.text = 'Play Again?';
    text.textAlign = 'center';
    text.textBaseline = 'top';
    text.fillStyle = '#dfe';
    text.strokeStyle = 'black';
    text.lineWidth = 5;
    text.font = '37px verdana';
    text.layer = 9;

    session.gameover.text3 = position;

    handleLater(session, 150, 'gameover_replay_ready');
});

addHandler('gameover_replay_ready', (session) => {
    session.gameover.ready = true;
});

addHandler('mousedown', (session) => {
    if (!session.gameover.ready) return;
    session.gameover.ready = false;
    session.gameover.text1.remove();
    session.gameover.text2.remove();
    session.gameover.text3.remove();
    handle(session, 'restart');
});
