cc.Class({
    extends: cc.Component,

    properties: {
        startButton:{
            default:null,
            type:cc.Node
        }
    },

    // use this for initialization
    onLoad: function () {
        
        cc.director.preloadScene('MainScene')
        var scaleTo = cc.scaleTo(0.8,0.8)
        var reverse = cc.scaleTo(0.8,1)
        var seq = cc.sequence(scaleTo,reverse)
        var repeat = cc.repeatForever(seq)
        
        this.startButton.runAction(repeat)
        this.startButton.on('touchstart',function(touches,event){
            cc.director.loadScene('MainScene')
        })

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
