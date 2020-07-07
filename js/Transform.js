/*
    module to make sure mishu's transform is consistent
    and decoupled from render logic
*/

const mishuTransform = {

    // initialize so it's in front of the camera
    position: [0,0,-1],
    
    rotation: [0,0,0],

    setPosition: function(x, y, z) {
        this.position = [x,y,z];
    },
    setRotation: function(x, y, z) {
        this.rotation = [x,y,z];
    },
    getPosition: function() {
        return [...this.position];
    },
    getRotation: function() {
        return [...this.rotation];
    }
}

module.exports = {
    mishuTransform
}