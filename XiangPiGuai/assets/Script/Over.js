cc.Class({
    extends: cc.Component,

    properties: {
       button:{
           default:null,
           type:cc.Node
       },
       scoreLabel:{
           default:null,
           type:cc.Label
       }
    },

    // use this for initialization
    onLoad: function () {
        cc.director.preloadScene('MainScene')
        
        this.button.on('touchstart',function(touches,event){
            cc.director.loadScene('MainScene')
        })
        
        this.scoreLabel.string = '最终得分:' + cc.sys.localStorage.getItem('score')

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
