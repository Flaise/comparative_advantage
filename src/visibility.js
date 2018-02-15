const {Group} = require('skid/lib/scene/group');

exports.Visibility = class Visibility extends Group {
    constructor(group) {
        super(group);
        this.visible = true;
    }

    draw(context) {
        if (this.visible) super.draw(context);
    }
}
