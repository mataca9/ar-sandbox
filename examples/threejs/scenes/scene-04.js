import { camera, renderer, scene, x3 } from "../setups/setup-04";

const cube = new THREE.Mesh(
  new THREE.BoxBufferGeometry(),
  new THREE.MeshLambertMaterial({
    color: 0x368ED1
  })
)

cube.position.x = 1;
cube.position.y = 1;
cube.castShadow = true
scene.add(cube);

const floor = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(10, 10),
  new THREE.MeshPhongMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide
  })
)
floor.rotation.x = THREE.MathUtils.degToRad(-90);
floor.receiveShadow = true
scene.add(floor);

const shadowLight = new THREE.SpotLight(0xffffff, 3, 10, 0.4);
shadowLight.position.y = 4;
shadowLight.castShadow = true;
shadowLight.target = cube;
scene.add(shadowLight);
x3.add(shadowLight);

renderer.setAnimationLoop(() => {
  x3.tick();
  x3.fps(() => {
    renderer.render(scene, camera);
  })
});