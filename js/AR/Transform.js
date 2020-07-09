/*
    module to make sure mishu's transform is consistent
    and decoupled from render logic
*/


import sceneReference from './SceneReference';

const mishuTransform = {

    // initialize so it's in front of the camera
    position: [0,-.5,-1],

    rotation: [90,0,0],

    setPosition: function(x, y, z) {
        this.position = [x,y,z];

        // update the scene so react re-renders
        sceneReference.updateScene();
    },
    setRotation: function(x, y, z) {
        this.rotation = [x,y,z];

        // update the scene so react re-renders
        sceneReference.updateScene();
    },
    getPosition: function() {
        return [...this.position];
    },
    getRotation: function() {
        return [...this.rotation];
    }
}

module.exports = mishuTransform;