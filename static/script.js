const modelParams = {
    flipHorizontal: false,
    scoreThreshold: 0.7
  }
const video = document.querySelector("#video")
let canvas = document.querySelector("#canvas")
let ctx = canvas.getContext('2d')
let canvas1 = document.querySelector("#canvas1")
let ctx1 = canvas1.getContext('2d')
let model
var x1,y1,x2,y2,width = 220,height = 220
let flagBox = false
var currX = 30 + width/2, currY = 30 + height/2
var maxwidth,maxheight

handTrack.load(modelParams).then(lmodel => {
    model = lmodel
})


handTrack.startVideo(video).then(status => {
    if (status) {
        navigator.getUserMedia({video: {}}, stream =>{
            video.srcObject = stream
            setTimeout(() => {
                maxwidth = video.videoWidth 
                maxheight = video.videoHeight;
                ctx.canvas.width = maxwidth
                ctx.canvas.height = maxheight
                setInterval(DetectHand,0)
            }, 5000);
            
        },
        err => console.log(err)
        )
    }
})

function position(curr,dim,maxdim) {

    pos = curr - (dim/2)
    if (pos < 0) return 0
    if ((pos+dim) > maxdim ) return (maxdim - dim)
    return pos
    
}



function DetectHand() {
    
    model.detect(video).then(predictions => {
        ctx.drawImage(video, 0, 0);
        if (flagBox) {
            x1 = position(currX,width,maxwidth)
            y1= position(currY,height,maxheight)
            x2= width
            y2= height
            


            ctx.beginPath()
            ctx.lineWidth = "0"
            ctx.strokeStyle = "limegreen"
            ctx.rect(x1, y1, x2, y2);
            ctx.stroke()
        }
        else if (predictions.length > 0){

            x1 = predictions[0].bbox[0]-35
            y1 = predictions[0].bbox[1]-40
            x2 = width + 35
            y2 = height + 40
            ctx.beginPath()
            ctx.lineWidth = "0"
            ctx.strokeStyle = "limegreen"
            ctx.rect(x1, y1, x2, y2);
            ctx.stroke()
            
        }
        
        //model.renderPredictions(predictions,canvas1,ctx1,video)
    })
}














canvas.addEventListener('click', e =>{
    //console.log(e)
    currX = (e.clientX - canvas.offsetLeft + document.documentElement.scrollTop + document.documentElement.scrollLeft);
    currY = (e.clientY - canvas.offsetTop + document.documentElement.scrollTop + document.documentElement.scrollLeft);
    //console.log(currX)
    //console.log(currY)
})
canvas.addEventListener('mousemove', e =>{
    
    if (e.buttons == 1){
        //console.log(e)
        currX = (e.clientX - canvas.offsetLeft + document.documentElement.scrollTop + document.documentElement.scrollLeft);
        currY = (e.clientY - canvas.offsetTop + document.documentElement.scrollTop + document.documentElement.scrollLeft);
        //console.log(currX)
        //console.log(currY)
    }
})
function checkBoxChecked() {
    var checkBox = document.getElementById("myCheck");

    if (checkBox.checked == true){
        console.log("checked")
        flagBox = true
    } else {
        console.log("unchecked")
        flagBox = false
    }
  }
