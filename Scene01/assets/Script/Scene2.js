cc.Class({
    extends: cc.Component,

    properties: {
        timeLabel:{
            default:null,
            type:cc.Label
        }
    },

    // use this for initialization
    onLoad: function () {
        var timeIn = 5
        this.schedule(function(){
            timeIn--
            this.timeLabel.string = timeIn
            
            if(timeIn === 0){
                cc.director.loadScene('Scene3')
            }
            
        },1)

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
