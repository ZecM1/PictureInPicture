const videoElement = document.getElementById('video');
const buttonElement = document.getElementById('button');

// Prompt to select media stream, pass to video element, then play
async function startCapture(displayMediaOptions) {
  let captureStream = null;

  try {
    captureStream = await navigator.mediaDevices.getDisplayMedia(
      displayMediaOptions,
    );
    videoElement.srcObject = captureStream;
    videoElement.play();
    // Wait for the video's metadata to load before attempting to enter PiP mode
    videoElement.addEventListener(
      'loadedmetadata',
      () => {
        // Check if the browser supports the Picture-in-Picture API
        if (videoElement.requestPictureInPicture) {
          videoElement.requestPictureInPicture().catch((error) => {
            console.error('Error entering Picture-in-Picture mode:', error);
          });
        } else {
          console.log(
            'Picture-in-Picture API is not supported in this browser.',
          );
        }
      },
      { once: true },
    ); // Use { once: true } to ensure the event listener is removed after it's called once
  } catch (error) {
    console.error('Error: ', error);
  }
}

// Attach an event listener to the button to start capture when clicked
buttonElement.addEventListener('click', () => {
  const displayMediaOptions = {
    video: true,
    audio: true,
  };
  startCapture(displayMediaOptions);
});
