const $element = $('#demo-video-player');
const imagePath = '../video/ppDemo';
const totalFrames = 89;

var animationDuration = 2000;
const timePerFrame = animationDuration / totalFrames;

let timeWhenLastUpdate;
let timeFromLastUpdate;
let frameNumber = 0;

// 'step' function will be called each time browser rerender the content
// we achieve that by passing 'step' as a parameter to the 'requestAnimationFrame' function
function step(startTime) {
  // 'startTime' is provided by requestAnimationName function, and we can consider it as current time
  // first of all we calculate how much time has passed from the last time when frame was update
  if (!timeWhenLastUpdate) timeWhenLastUpdate = startTime;
  timeFromLastUpdate = startTime - timeWhenLastUpdate;
  
  // then we check if it is time to update the frame
  if (timeFromLastUpdate > timePerFrame) {
    // and update it accordingly
    $element.attr('src', imagePath + `/ppDemo_${frameNumber}.png`);
    // reset the last update time
    timeWhenLastUpdate = startTime;
    
    // then increase the frame number or reset it if it is the last frame
    if (frameNumber >= totalFrames) {
      self.stopAnimating();
    } else {
      frameNumber = frameNumber + 1;
    }        
  }
  
  requestAnimationFrame(step);
}

function stopAnimating() {
  self.animationDuration = 0;
}

// create a set of hidden divs
// and set their background-image attribute to required images
// that will force browser to download the images
$(document).ready(() => {
  for (var i = 1; i < totalFrames + 1; i++) {
    $('body').append(`<div id="preload-image-${i}" style="background-image: url('${imagePath}/ppDemo_${i}.png');"></div>`);
  }
});

// wait for images to be downloaded and start the animation
$(window).on('load', () => {
  requestAnimationFrame(step);
});