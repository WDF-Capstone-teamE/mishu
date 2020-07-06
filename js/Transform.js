/*
    module to make sure mishu's transform is consistent
    and decoupled from render logic
*/

const mishuTransform = {
    position: [0,0,0],
    
    scale: [1,1,1],

    setPosition: function(x, y, z) {
        this.position = [x,y,z];
    },
    setScale: function(x, y, z) {
        this.scale = [x,y,z];
    },
    getPosition: function() {
        return [...this.position];
    },
    getScale: function() {
        return [...this.scale];
    }
}

module.exports = {
    mishuTransform
}