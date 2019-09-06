/*this app will not work on older browsers 
browser must have support for Web Audio API*/

//frist create sound context and then add diffrent modules for controling sound

(function() {
  var mySoundContext,
    myGain,
    myDistorsion,
    myOscillator,


    originalYPos,
    originalXPos,

    originalFrequency,
    scaleFrequencies = [
      110,
      123.47,
      130.81,
      146.83,
      164.81,
      174.61,
      196,
      220,
      246.94,
      261.63,
      293.66,
      329.63,
      349.23,
      392,
      440,
      493.88,
      523.25,
      587.33,
      659.25,
      698.46,
      783.99,
      880,
      987.77,
      1046.5,
      1174.66,
      1318.51,
      1396.91,
      1567.98,
      1760
    ];
  //check browser supprt for Audio API

  var contextClass = window.AudioContext || window.webkitAudioContext;

  //if browser do not support Audio API display warnnig massage
  //if browser has Audio API support initalize contextClas

  if (contextClass) {
    mySoundContext = new contextClass();
  } else {
    document.querySelector(".app").innerHTML =
      '<div class="container alert alert-danger">Sorry, this app requires the Web Audio API, which your browser does not support</div>';
  }

  var appNode = document.querySelector(".app");

  var appWidth = appNode.offsetWidth;



  appNode.style.background =
    "repeating-linear-gradient(to right, #FDF6E4,#FDF6E4 50%,#F7EFD7 50%,#F7EFD7)";

  appNode.style.backgroundSize =
    (appWidth / scaleFrequencies.length) * 2 + "px 100%";

  appNode.addEventListener("mousedown", e => {
    if (myOscillator) {
      myOscillator.stop();
    }

    //attach result from the  mouseDown of appNode event to the created x and y variables

    mouseXPos = e.clientX;
    mouseYpos = e.clientY;
    originalYPos = mouseYpos;

    //next you can calculate frequency

    originalFrequency =
      scaleFrequencies[
        Math.floor((mouseXPos / appWidth) * scaleFrequencies.length)
      ];
    //initalize sound object

    myOscillator = mySoundContext.createOscillator();
    myOscillator.type = "sine";
    myOscillator.frequency.value = originalFrequency;

    myOscillator.start();

    myGain = mySoundContext.createGain();

    myGain.gain.value = 0.1;

    myDistorsion = mySoundContext.createWaveShaper();

    myOscillator.connect(myDistorsion);

    myDistorsion.connect(myGain);

    //"plug evrithing in"

    myGain.connect(mySoundContext.destination);


    appNode.addEventListener("mousemove", e => {
      var distanceY = e.clientY - originalYPos;

      mouseXPos = e.clientX;
      appWidth = appNode.offsetWidth;

      myGain.gain.value = mouseXPos / appWidth;
      myOscillator.frequency.value = originalFrequency + distanceY;

      appNode.style.backgroundSize =
        (appWidth / scaleFrequencies.length) * 2 + "px 100%";
    });
  });

  //create events that controls when sound is played

  appNode.addEventListener("mouseup", e => {
    myOscillator.stop();

    appNode.removeEventListener("mousemove", null);
  });
})();
