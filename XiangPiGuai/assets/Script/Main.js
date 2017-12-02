cc.Class({
    extends: cc.Component,

    properties: {
        player:{
            default:null,
            type:cc.Node
        },
        dici:{
          default:null,
          type:cc.Prefab
        },
        timeLabel:{
            default:null,
            type:cc.Label
        },
        scoreLabel:{
            default:null,
            type:cc.Label
        },
        bgAudio:{
            default:null,
            url:cc.AudioClip
        },
        jumpAudio:{
            default:null,
            url:cc.AudioClip
        },
        dieAudio:{
            default:null,
            url:cc.AudioClip
        },
        playerJumpHeight:30,
        wallWidth:80,
        diciCount:0,
        dici_duration:140,
        gameTime:60,
        score:0
        
    },
    playerMoveRight:function(){
        var goRight = cc.moveTo(0.2,cc.p(this.node.width/2-this.wallWidth,this.player.getPositionY()))
        var goR1 = cc.moveTo(0.1,cc.p(this.node.width/2-this.wallWidth-30,this.player.getPositionY()))
        var goR2 = cc.moveTo(0.1,cc.p(this.node.width/2-this.wallWidth,this.player.getPositionY()))
        var seq = cc.sequence(goR1,goR2)
        
        if(this.player.rotationY == 180){
            
            this.player.runAction(seq)
        }else{
            this.player.runAction(goRight)
        }
        this.player.rotationY = 180
         
        
    },
    playerMoveLeft:function(){
        var goLeft = cc.moveTo(0.2,cc.p(-this.node.width/2+this.wallWidth,this.player.getPositionY()))
        var goL1 = cc.moveTo(0.1,cc.p(-this.node.width/2+this.wallWidth+30,this.player.getPositionY()))
        var goL2 = cc.moveTo(0.1,cc.p(-this.node.width/2+this.wallWidth,this.player.getPositionY()))
        var seq = cc.sequence(goL1,goL2)
        
        if(this.player.rotationY == 0){
            this.player.runAction(seq)
        }else{
            this.player.runAction(goLeft)
        }
        this.player.rotationY = 0
        
    },
    
    setInputControl:function(){
        var self = this
        
        var listener = {
            event:cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan:function(touches,event){
                
                cc.audioEngine.playEffect(self.jumpAudio,false)
                
                var target = event.getCurrentTarget()
                var locationInNode = target.convertToNodeSpace(touches.getLocation())
                
                if(locationInNode.x > self.node.width/2){
                    self.playerMoveRight()
                }else{
                    self.playerMoveLeft()
                    
                }
               
               self.newDici()
               self.score++
               self.scoreLabel.string = self.score
               cc.sys.localStorage.setItem('score',self.score) 
               return true
            },
            onTouchMoved:function(touches,event){
                
            },
            onTouchEnd:function(touches,event){
                
            }
        }
        cc.eventManager.addListener(listener,self.node)
    },
    newDici:function(){
        this.diciCount++
        var newDici = cc.instantiate(this.dici)
        
        this.node.addChild(newDici)
        var randD = cc.random0To1()
        if(randD >= 0.5){
            newDici.rotationY = 0
        }else{
            newDici.rotationY = 180
        }
        newDici.setPosition(this.diciPosition(randD))
        
    },
    diciPosition:function(randD){
        var randX = 0
        var randY = 0
    
        if(randD >= 0.5){
            randX = this.node.width/2 - this.wallWidth
        }else{
            randX = - this.node.width/2 + this.wallWidth
        }
        if(this.diciCount <= 8){
            randY = this.node.height/2 - this.dici_duration*this.diciCount - this.dici_duration
        }else{
            randY = this.node.height/2 - this.dici_duration*8 - this.dici_duration
        }
        
        return cc.p(randX,randY)
    },

    onLoad: function () {
        this.diciCount = 0
        
        cc.audioEngine.setEffectsVolume(0.5)
        cc.audioEngine.playMusic(this.bgAudio,true)
        this.setInputControl()
        this.player.setPosition(-this.node.width/2+this.wallWidth,this.node.height/2 - 175)
        cc.director.preloadScene('OverScene')
        for(var i=0;i<8;i++){
            this.newDici()
        }
        this.timeLabel.string = '倒计时:' + this.gameTime
        this.schedule(function(){
            this.gameTime--
            this.timeLabel.string = '倒计时:' + this.gameTime
            if(this.gameTime <= 0){
                cc.audioEngine.playEffect(this.dieAudio)
                cc.audioEngine.pauseMusic()
                cc.director.loadScene('OverScene')
            }
        },1)
    },


    // update: function (dt) {

    // },
});
