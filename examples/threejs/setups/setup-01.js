const options = {
  targetSelector: '#scene',
  backgroundColor: 0x222222,
  width: 800,
  height: 600
}

export const renderer = new THREE.WebGLRenderer();
renderer.setSize(options.width, options.height);

document.querySelector(options.targetSelector).appendChild(renderer.domElement);

export const scene = new THREE.Scene();
scene.background = new THREE.Color(options.backgroundColor);
export const camera = new THREE.PerspectiveCamera(50, options.width / options.height);
camera.position.z = 5;