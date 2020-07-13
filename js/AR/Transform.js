/*
    module to make sure mishu's transform is consistent
    and decoupled from render logic
*/

const mishuTransform = {

    // initialize so it's in front of the camera
    position: [0,-.5,-1],
    rotation: [0,0,0],

    onTransformChange: null,

    setPosition: function(x, y, z) {
        this.position = [x,y,z];

        if (this.onTransformChange)
            this.onTransformChange();
    },
    setRotation: function(x, y, z) {
        this.rotation = [x,y,z];

        if (this.onTransformChange)
            this.onTransformChange();
    },
    getPosition: function() {
        return [...this.position];
    },
    getRotation: function() {
        return [...this.rotation];
    }
}

module.exports = mishuTransform;