
objects=[];
status="";

function preload(){
    video=createVideo('video.mp4');
}
function setup(){
    canvas=createCanvas(400,400);
    canvas.center();
    video.hide();
}

function start(){
    objectDetector=ml5.objectDetector('cocossd', modelLaoded);
    document.getElementById("status").innerHTML="Status : Detecting object";
}

function modelLaoded(){
    console.log('model is laoded');
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}

function draw(){
    image(video,0,0,400,400);
    if(status !=""){
        objectDetector.detect(video, gotResult);
        r= random(255);
        g= random(255);
        b= random(255);
        for(i=0;i <objects.length; i++){
            document.getElementById("status").innerHTML="Status : object Detected";
            document.getElementById("no_of_objects").innerHTML="Number of object"+objects.length;
            fill("#ffffff");
            pecent=floor(objects[i].confidence * 100);
            text(objects[i].label+" " + pecent+"%",objects[i].x+15, objects[i].y+15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}