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
camera.position.x = 0;
camera.position.y = 7.05;
camera.position.z = -6.75;

const light = new THREE.HemisphereLight(0xFFFFFF, 0x080820, 0.3);
scene.add(light);

export const x3 = new THREEx3(
  {
    THREE,
    OrbitControls: THREE.OrbitControls,
    camera,
    renderer,
    scene,
  },
  {
    grid: { visible: false },
    axes: { visible: false }
  }
);

x3.add(camera, { open: false });
x3.add(light);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;