/*
    seperate module holding a refrence to the Viro AR Scene,
    since we need it to call methods for hit testing in the world
*/

const sceneReference = {

    ref: null,

    setReference(ref) {
        this.ref = ref;
    },
    getReference() {
        return this.ref;
    }
};


module.exports = sceneReference;