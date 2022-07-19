import { camera, renderer, scene, x3 } from "../setups/setup-02";

const path = new THREE.Shape();

path.moveTo(0.3, 1.5);
path.quadraticCurveTo(0.3, 2.2, 0.9, 2.2);
path.quadraticCurveTo(1.3, 2.2, 1.4, 1.7);
path.quadraticCurveTo(1.5, 2.2, 1.9, 2.2);
path.quadraticCurveTo(2.5, 2.2, 2.5, 1.5);
path.quadraticCurveTo(2.5, 1, 1.4, 0.3);
path.quadraticCurveTo(0.3, 1, 0.3, 1.5);


// const geometry = new THREE.ShapeBufferGeometry(path);
const geometry = new THREE.ExtrudeBufferGeometry(path, {
  depth: 0.01,
  bevelEnabled: true,
  bevelSize: 0.1,
  bevelThickness: 0.1
});

const material = new THREE.MeshLambertMaterial({ color: 0xEB3452, side: THREE.DoubleSide });

const draw = new THREE.Mesh(geometry, material);

scene.add(draw);

renderer.setAnimationLoop(() => {
  x3.tick();
  x3.fps(() => {
    renderer.render(scene, camera);
  })
});