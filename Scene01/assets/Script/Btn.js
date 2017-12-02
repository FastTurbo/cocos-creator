cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    // use this for initialization
    onLoad: function () {
       this.node.on('mousedown',function(){
           cc.director.loadScene('Scene2')
       })
    },

    // called every frame
    update: function (dt) {

    },
});
