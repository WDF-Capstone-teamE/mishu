/*
    module to make sure mishu's transform is consistent
    and decoupled from render logic
*/

const mishuTransform = {
    transformInitialized: false,
    position: [0,0,0],
    onTransformChange: null,
    setPosition: function(x, y, z) {
        this.position = [x,y,z];
        this.transformInitialized = true;
        if (this.onTransformChange)
            this.onTransformChange();
    },
    getPosition: function() {
        return [...this.position];
    },
}

module.exports = mishuTransform;