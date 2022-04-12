objectDetector= "";

img = "";
status = "";
objects = [];

function setup() {
    video = createCapture(VIDEO);
    video.hide();
    video.size(380, 380);
    canvas = createCanvas(380, 420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}
function preload() {
    img = loadImage("dog_cat.jpg");
}
function draw() {
    image(video, 0, 0, 380, 380);
    if (status != "") { // printing the message - detected - to the user
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        for (var i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("number_of_objects").innerHTML = "No. of object detected are: " + objects.length;
      
            fill(r,g,b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
          }
    }
}

function modelLoaded() {
    console.log("Model Loaded!")
    status = true;
}
function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    object = results;
}