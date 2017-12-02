var tempPlayer = require('Player')

cc.Class({
    extends: cc.Component,

    properties: {
        
        dieAudio:{
            default:null,
            url:cc.AudioClip
        }
       
    },
    setInputControl:function(){
        var self = this
        
        var listener = {
            event:cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan:function(touches,event){
                var goAction = cc.moveBy(0.2,cc.p(0,140))
               
                self.node.runAction(goAction)
                
                return true
                
            },
            onTouchMoved:function(touches,event){
                
            },
            onTouchEnd:function(touches,event){
                
            }
        }
        
        cc.eventManager.addListener(listener,self.node)
        
        
        
    },

    // use this for initialization
    onLoad: function () {
        this.setInputControl()
        cc.audioEngine.setEffectsVolume(0.5)
    },
    nodeBox:function(){
        return this.node.getBoundingBoxToWorld()
    },

    // called every frame, uncomment this function to activate update callback
     update: function (dt) {
        
        var player = cc.find('Canvas/normal').getComponent(tempPlayer)
        if(cc.rectIntersectsRect(player.node.getBoundingBoxToWorld(),this.nodeBox())){
            cc.audioEngine.playEffect(this.dieAudio)
            cc.audioEngine.pauseMusic()
            cc.director.loadScene('OverScene')
        }
        
    },
});
