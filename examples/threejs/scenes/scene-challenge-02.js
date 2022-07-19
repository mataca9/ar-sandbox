import { camera, renderer, scene, x3 } from "../setups/setup-challenge-02";

// Floor
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

// Rocket
const body = new THREE.Mesh(
  new THREE.CylinderBufferGeometry(
    0.5, 0.5, 2, 20
  ),
  new THREE.MeshPhongMaterial({
    color: 0x555555,
    side: THREE.DoubleSide
  })
)
body.position.x = 0;
body.position.y = 2;

const thruster = new THREE.Mesh(
  new THREE.CylinderBufferGeometry(
    0.3, 0.3, 0.2, 20
  ),
  new THREE.MeshPhongMaterial({
    color: 0x999999,
    side: THREE.DoubleSide
  })
)
thruster.position.x = 0;
thruster.position.y = 1;

const head = new THREE.Mesh(
  new THREE.ConeBufferGeometry(
    0.5, 0.5, 20
  ),
  new THREE.MeshPhongMaterial({
    color: 0xFB3452,
    side: THREE.DoubleSide
  })
)
head.position.x = 0;
head.position.y = 3.25;

const glass = new THREE.Mesh(
  new THREE.SphereBufferGeometry(
    0.3, 20, 20
  ),
  new THREE.MeshPhongMaterial({
    color: 0x73b0e3,
    side: THREE.DoubleSide
  })
)
glass.position.x = 0;
glass.position.y = 2.5;
glass.position.z = 0.3;

const path = new THREE.Shape();

path.moveTo(0, 0.5);
path.lineTo(0.5, 1.2);
path.lineTo(0.5, 1);
path.lineTo(0, 0.5);

const geometry = new THREE.ExtrudeBufferGeometry(path, {
  depth: 0.01,
  bevelEnabled: true,
  bevelSize: 0.1,
  bevelThickness: 0.1
});

const material = new THREE.MeshPhongMaterial({ color: 0xEB3452, side: THREE.DoubleSide });

const support1 = new THREE.Mesh(geometry, material);
support1.position.x = -1;

const support2 = new THREE.Mesh(geometry, material);
support2.position.x = 1;
support2.rotation.y = THREE.MathUtils.degToRad(-180);

const support3 = new THREE.Mesh(geometry, material);
support3.position.x = 0;
support3.position.z = -1;
support3.rotation.y = THREE.MathUtils.degToRad(-90);

const support4 = new THREE.Mesh(geometry, material);
support4.position.x = 0;
support4.position.z = 1;
support4.rotation.y = THREE.MathUtils.degToRad(90);

const rocket = new THREE.Group();
rocket.add(support1);
rocket.add(support2);
rocket.add(support3);
rocket.add(support4);
rocket.add(body);
rocket.add(head);
rocket.add(glass);
rocket.add(thruster);

scene.add(rocket);

// Light
const light01 = new THREE.SpotLight(0xffffff, 3, 10, 0.4);
light01.position.y = 5;
light01.position.x = -7;
light01.castShadow = true;
light01.target = body;
scene.add(light01);

const light02 = new THREE.SpotLight(0xffffff, 3, 10, 0.4);
light02.position.y = 7;
light02.position.z = -7;
light02.castShadow = true;
light02.target = body;
scene.add(light02);

const light03 = new THREE.SpotLight(0xffffff, 3, 10, 0.4);
light03.position.y = 7;
light03.position.z = 7;
light03.castShadow = true;
light03.target = body;
scene.add(light03);

renderer.setAnimationLoop(() => {
  rocket.rotation.y += 0.01

  x3.tick();
  x3.fps(() => {
    renderer.render(scene, camera);
  })
});