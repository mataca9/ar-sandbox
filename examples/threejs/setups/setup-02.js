const options = {
  targetSelector: '#scene',
  backgroundColor: 0x222222,
  width: 800,
  height: 600
}

export const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(options.width, options.height);
renderer.setPixelRatio(window.devicePixelRatio);

document.querySelector(options.targetSelector).appendChild(renderer.domElement);

export const scene = new THREE.Scene();
scene.background = new THREE.Color(options.backgroundColor);
export const camera = new THREE.PerspectiveCamera(50, options.width / options.height);
camera.position.x = 2.5;
camera.position.y = 6.5;
camera.position.z = 9;

const light = new THREE.HemisphereLight(0xFFFFBB, 0x080820, 2);
scene.add(light);

export const x3 = new THREEx3({
  THREE,
  OrbitControls: THREE.OrbitControls,
  camera,
  renderer,
  scene
});

x3.add(camera, { open: false });
x3.add(light);