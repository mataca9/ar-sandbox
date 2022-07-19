import { camera, renderer, scene, x3 } from "../setups/setup-challenge-03";

const loader = new THREE.TextureLoader();


// Materials
const metal = new THREE.MeshStandardMaterial({
  transparent: true,
  side: THREE.DoubleSide,
  map: loader.load('https://gbaptista.s3-sa-east-1.amazonaws.com/threejs/metal/basecolor.jpg'),
  alphaMap: loader.load('https://gbaptista.s3-sa-east-1.amazonaws.com/threejs/metal/opacity.jpg'),
  metalnessMap: loader.load('https://gbaptista.s3-sa-east-1.amazonaws.com/threejs/metal/metallic.jpg'),
  emissiveMap: loader.load('https://gbaptista.s3-sa-east-1.amazonaws.com/threejs/metal/emissive.jpg'),
  normalMap: loader.load('https://gbaptista.s3-sa-east-1.amazonaws.com/threejs/metal/normal.jpg'),
  aoMap: loader.load('https://gbaptista.s3-sa-east-1.amazonaws.com/threejs/metal/occlusion.jpg'),
  roughnessMap: loader.load('https://gbaptista.s3-sa-east-1.amazonaws.com/threejs/metal/roughness.jpg')
});

const metal2 = new THREE.MeshStandardMaterial({
  side: THREE.DoubleSide,
  map: loader.load('../textures/metal/Metal_006_basecolor.jpg'),
  metalnessMap: loader.load('../textures/metal/Metal_006_metallic.jpg'),
  normalMap: loader.load('../textures/metal/Metal_006_normal.jpg'),
  aoMap: loader.load('../textures/metal/Metal_006_ambientOcclusion.jpg'),
  roughnessMap: loader.load('../textures/metal/Metal_006_roughness.jpg')
});

const metal3 = new THREE.MeshStandardMaterial({
  side: THREE.DoubleSide,
  map: loader.load('../textures/metal/Metal_006_basecolor.jpg'),
  metalnessMap: loader.load('../textures/metal/Metal_006_metallic.jpg'),
  normalMap: loader.load('../textures/metal/Metal_006_normal.jpg'),
  aoMap: loader.load('../textures/metal/Metal_006_ambientOcclusion.jpg'),
  roughnessMap: loader.load('../textures/metal/Metal_006_roughness.jpg'),
  color: 0xff0000,
});


// Objects
const floor = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(10, 10),
  metal
)
floor.rotation.x = THREE.MathUtils.degToRad(-90);
floor.receiveShadow = true
scene.add(floor);
x3.add(floor)

// Rocket
const body = new THREE.Mesh(
  new THREE.CylinderBufferGeometry(
    0.5, 0.5, 2, 20
  ),
  metal2
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
  new THREE.SphereBufferGeometry(
    0.5, 32, 32, Math.PI / 2, Math.PI * 2, 0, Math.PI / 2 
  ),
  metal3,
)
head.position.x = 0;
head.position.y = 3;

const glass = new THREE.Mesh(
  new THREE.SphereBufferGeometry(
    0.3, 20, 20
  ),
  new THREE.MeshPhysicalMaterial({
    color: 0x73b0e3,
    side: THREE.DoubleSide,
    transmission: 0.4,
    transparent: true
  })
)
glass.position.x = 0;
glass.position.y = 2.5;
glass.position.z = 0.3;
x3.add(glass);

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

const support1 = new THREE.Mesh(geometry, metal);
support1.position.x = -1;

const support2 = new THREE.Mesh(geometry, metal);
support2.position.x = 1;
support2.rotation.y = THREE.MathUtils.degToRad(-180);

const support3 = new THREE.Mesh(geometry, metal);
support3.position.x = 0;
support3.position.z = -1;
support3.rotation.y = THREE.MathUtils.degToRad(-90);

const support4 = new THREE.Mesh(geometry, metal);
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

const shadowLight = new THREE.PointLight(0xffffff, 10);
shadowLight.position.y = 5;
shadowLight.position.x = 3;
shadowLight.castShadow = true;
shadowLight.target = rocket;
scene.add(shadowLight);
x3.add(shadowLight);

const shadowLight2 = new THREE.PointLight(0xffffff, 10);
shadowLight2.position.y = 5;
shadowLight2.position.x = -3;
shadowLight2.position.z = 3;
shadowLight2.castShadow = true;
shadowLight2.target = rocket;
scene.add(shadowLight2);
x3.add(shadowLight2);

const shadowLight3 = new THREE.PointLight(0xffffff, 10);
shadowLight3.position.y = 5;
shadowLight3.position.x = -3;
shadowLight3.position.z = -3;
shadowLight3.castShadow = true;
shadowLight3.target = rocket;
scene.add(shadowLight3);
x3.add(shadowLight3);

renderer.setAnimationLoop(() => {
  x3.tick();
  x3.fps(() => {
    rocket.rotation.y += 0.001;
    renderer.render(scene, camera);
  })
});