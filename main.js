Webcam.set[{
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
}];
camera = document.getElementById("camera");
Webcam.attach("#camera");
function takeSnapshot () {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='capture_image' src='"+ data_uri +"'>";
    });
}
console.log('ml5 version:', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/jSmk9PLQX/model.json', modelLoaded);
function modelLoaded () {
    console.log("model is loaded!");
}
function speaking () {
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is " + prediction_1;
    speak_data_2 = "And the second prediction is" + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}
function check () {
    img = document.getElementById("capture_image");
    classifier.classify(img, gotResult);
}
function gotResult (error, result) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(result);
        document.getElementById("result_emotion_name1").innerHTML = result[0].label;
        document.getElementById("result_emotion_name2").innerHTML = result[1].label;
        prediction_1 = result[0].label;
        prediction_2 = result[1].label;
        speaking();
        if (prediction_1 == "Happy") {
            document.getElementById("update_emoji1").innerHTML= '&#128512';
        }
        if (prediction_1 == "Sad") {
            document.getElementById("update_emoji1").innerHTML= '&#128549';
        }
        if (prediction_1 == "Angry") {
            document.getElementById("update_emoji1").innerHTML= '&#128545';
        }
        if (prediction_1 == "Neutral") {
            document.getElementById("update_emoji1").innerHTML= '&#128528';
        }
        if (prediction_2 == "Happy") {
            document.getElementById("update_emoji2").innerHTML= '&#128512';
        }
        if (prediction_2 == "Sad") {
            document.getElementById("update_emoji2").innerHTML= '&#128549';
        }
        if (prediction_2 == "Angry") {
            document.getElementById("update_emoji2").innerHTML= '&#128545';
        }
        if (prediction_2 == "Neutral") {
            document.getElementById("update_emoji2").innerHTML= '&#128528';
        }
    }
}