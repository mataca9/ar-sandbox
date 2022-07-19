import { camera, renderer, scene, x3 } from "../setups/setup-02";

const material = new THREE.MeshLambertMaterial({
  color: 0x348feb,
  side: THREE.DoubleSide
});

const cube = new THREE.Mesh(
  new THREE.BoxBufferGeometry(1, 1, 1),
  material
);

const circle = new THREE.Mesh(
  new THREE.CircleBufferGeometry(
    0.5, 20
  ),
  material
)
circle.position.x = -2;
circle.rotation.x = THREE.MathUtils.degToRad(-90)

const cone = new THREE.Mesh(
  new THREE.ConeBufferGeometry(
    0.3, 0.5
  ),
  material
)
cone.position.x = 2;

const cylinder = new THREE.Mesh(
  new THREE.CylinderBufferGeometry(
    0.5, 0.5, 1
  ),
  material
)
cylinder.position.z = 2;

const plane = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(
    1, 1
  ),
  material
)
plane.position.z = 2;
plane.position.x = 2;
plane.rotation.x = THREE.MathUtils.degToRad(-90)

const sphere = new THREE.Mesh(
  new THREE.SphereBufferGeometry(
    0.5, 20, 20
  ),
  material
)
sphere.position.z = -2;

scene.add(cube);
scene.add(circle);
scene.add(cone);
scene.add(cylinder);
scene.add(plane);
scene.add(sphere);

x3.add(circle, { label: 'circle' });
x3.add(cube, { label: 'cube' });
x3.add(cone, { label: 'cone' });
x3.add(cylinder, { label: 'cylinder' });

renderer.setAnimationLoop(() => {
  x3.tick();
  x3.fps(() => {
    renderer.render(scene, camera);
  })
});