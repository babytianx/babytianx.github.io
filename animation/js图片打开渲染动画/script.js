/**
 * Episode #9 - Video Masking.
 * @author: Anthony Du Pont <antho.dpnt@gmail.com>
 * @site: https://twitter.com/WebAdventurers
 *
 * You can do really cool effects with Canvas and I am going to show you how to use a video to mask 
 * and image with it. To be honest I am not really sure this gist is really for beginners but I really 
 * wanted to do it. So if you are not comfortable with the code below, take a minute, breathe and maybe
 * start by reading the basics of Canvas. You will quickly start to notice this gist is not so difficult
 * to understand.
 *
 * So what do we need to create this effect ? An image and a video to use as a mask. An important
 * thing to understand when you use an asset as a mask is that every pixels that are 100% black will show
 * the image and every pixels that are 100% white will hide the image. Let's get started!
 *
 * Example:
 * I have an image and a want to apply an animated mask. 
 * I have decided to used a video of ink, this could create some really cool animations.
 **/

// We declare all the variables we will need.
let loop, canvas, context, width, height, image, img, video, vid;

function VideoMask(options) {
    // We start by setting up our variables
    image = options.image;
    video = options.video;
    
    // Then we create our canvas and we get its context
    canvas = document.createElement('canvas');
    context = canvas.getContext('2d');
    
    // We set the width and height of our canvas
    width = canvas.width = options.width;
    height = canvas.height = options.height;
    
    // Finally we append our canvas to the body
    document.body.appendChild(canvas);
    
    // We can now load the image
    loadImage();
}

function loadImage() {
  // You can find more explanations about loading
  // images with Javascript in the episode #6 of
  // "Gist for Javascript Beginners".
  img = new Image();
  img.onload = () => {
    // When our image is loaded we can load
    // our video. You could do this synchronously
    // but I choose to do this asynchronously.
    loadVideo();
  };
  img.src = image;
}

function loadVideo() {
  // To load a video it is basically the same
  // approach than the images. We start
  // by creating a video element in Javascript.
  vid = document.createElement('video');
  
  // Then we set its source.
  vid.src = video;
  
  // We can finally add more options to our video. See the documentation of the
  // video tag for more options.
  vid.preload = 'auto';
  vid.autoplay = true;
  vid.muted = true;
  
  // We wait for our video to be able to play. This is the same logic than the `onload`
  // method on images except that `oncanplay` method will be fired even if our video is
  // not completely loaded.
  vid.oncanplay = () => {
    // We can now render our mask.
    render();
  };
  
  // To improve the performances and to avoid the loop to run for no reason we stop it 
  // when the video has ended.
  vid.onended = () => {
    clear();
  };
}

function render() {
  // Since we are in a loop that will run the exact same code every time, we first need 
  // to clear our canvas. This will empty our canvas to let us draw our mask and image again.
  context.clearRect(0, 0, width, height);
  
  // If you are using transparent PNGs you may want to change the background of your canvas.
  // You could do so in CSS or you can create a rectangle and fill it with a chosen color.
  // Note: I am using a non-transparent PNG here but you can change the image to show.
  context.rect(0, 0, width, height);
  context.fillStyle = '#ffffff';
  context.fill();
  
  // Finally we can draw our image and our video to our canvas. We are not drawing the full video
  // but only the current frame at this point. The trick is to add some blending mode to our 
  // image and video to create this effect of the video masking the image. 
  // Check the documentation of the `globalCompositeOperation` for more blending modes.
  context.globalCompositeOperation = 'source-over';
  context.drawImage(img, 0, 0, width, height);
  context.globalCompositeOperation = 'lighten';
  context.drawImage(vid, 0, 0, width, height);
  
  // We finish by looping over and over again with the `requestAnimationFrame` method.
  // You can find more explanations about `requestAnimationFrame` in  the episode #7 of
  // "Gist for Javascript Beginners".
  loop = window.requestAnimationFrame(render);
}

function clear() {
  // Last but not least we cancel the loop when our video has ended. This avoid the loop to 
  // run for no reason.
  window.cancelAnimationFrame(loop);
}

// We apply our Video Mask. This function takes an object of options.
// image: The image to show
// video: The video to use as a mask. Black = image visible; White = image hidden
// width: The width of our canvas
// height: The height of our canvas
VideoMask({
  image: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/972352/painting.jpg',
  video: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/972352/ink.mp4',
  width: 800,
  height: 600
});