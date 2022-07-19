import { camera, renderer, scene, x3 } from "../setups/setup-05";

const loader = new THREE.TextureLoader();

const polyester = new THREE.MeshStandardMaterial({
  map: loader.load('https://gbaptista.s3-sa-east-1.amazonaws.com/threejs/polyester/basecolor.jpg'),
  normalMap: loader.load('https://gbaptista.s3-sa-east-1.amazonaws.com/threejs/polyester/normal.jpg')
})

const wood = new THREE.MeshStandardMaterial({
  map: loader.load('https://gbaptista.s3-sa-east-1.amazonaws.com/threejs/wood/basecolor.jpg'),
  normalMap: loader.load('https://gbaptista.s3-sa-east-1.amazonaws.com/threejs/wood/normal.jpg')
})

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


})

const ball = new THREE.Mesh(
  new THREE.SphereBufferGeometry(1, 60, 60),
  polyester
)

ball.position.x = 1;
ball.position.y = 2;
ball.castShadow = true
scene.add(ball);

const floor = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(10, 10),
  metal
)
floor.rotation.x = THREE.MathUtils.degToRad(-90);
floor.receiveShadow = true
scene.add(floor);
x3.add(floor)

const shadowLight = new THREE.PointLight(0xffffff, 10);
shadowLight.position.y = 5;
shadowLight.castShadow = true;
shadowLight.target = ball;
scene.add(shadowLight);
x3.add(shadowLight);

renderer.setAnimationLoop(() => {
  x3.tick();
  x3.fps(() => {
    renderer.render(scene, camera);
  })
});