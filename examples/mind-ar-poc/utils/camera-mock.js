export async function mockVideo(src) {
  return new Promise(resolveStart => {
    const button = document.createElement('button');
    button.innerText = "Start Vídeo"
    button.style.position = "absolute";
    button.style.zIndex = 30;

    button.addEventListener("click", function () {
      navigator.mediaDevices.getUserMedia = () => {
        return new Promise((resolve, reject) => {
          const video = document.createElement("video");
          video.setAttribute("src", src);
          video.setAttribute("loop", "");

          video.oncanplay = () => {
            video.play();
            resolve(video.captureStream());
          }
        });
      }
      resolveStart();
    }, { once: true });

    document.body.appendChild(button);
  })
}

export const mockImage = (src) => {
  navigator.mediaDevices.getUserMedia = () => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext('2d');

      const image = new Image();
      image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0, image.width, image.height);
        const stream = canvas.captureStream();
        resolve(stream);
      }
      image.src = src;
    });
  };
}