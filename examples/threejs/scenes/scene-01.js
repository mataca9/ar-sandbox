import { camera, renderer, scene } from "../setups/setup-01";

const geometry = new THREE.BoxBufferGeometry();
const material = new THREE.MeshBasicMaterial({
  color: 0xffffff
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

renderer.setAnimationLoop(() => {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
});