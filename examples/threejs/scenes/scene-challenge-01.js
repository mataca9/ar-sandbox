import { camera, renderer, scene, x3 } from "../setups/setup-challenge-01";

const body = new THREE.Mesh(
  new THREE.CylinderBufferGeometry(0.5, 0.5, 2, 20),
  new THREE.MeshLambertMaterial({
    color: 0x555555,
    side: THREE.DoubleSide,
  })
);
body.position.x = 2;
body.position.y = 2;

const thruster = new THREE.Mesh(
  new THREE.CylinderBufferGeometry(0.3, 0.3, 0.2, 20),
  new THREE.MeshLambertMaterial({
    color: 0x999999,
    side: THREE.DoubleSide,
  })
);
thruster.position.x = 2;
thruster.position.y = 1;

const head = new THREE.Mesh(
  new THREE.ConeBufferGeometry(0.5, 0.5, 20),
  new THREE.MeshLambertMaterial({
    color: 0xfb3452,
    side: THREE.DoubleSide,
  })
);
head.position.x = 2;
head.position.y = 3.25;

const glass = new THREE.Mesh(
  new THREE.SphereBufferGeometry(0.3, 20, 20),
  new THREE.MeshLambertMaterial({
    color: 0x73b0e3,
    side: THREE.DoubleSide,
  })
);
glass.position.x = 2;
glass.position.y = 2.5;
glass.position.z = 0.3;

const path = new THREE.Shape();

path.moveTo(0, 0.5);
path.lineTo(0.5, 1.2);
path.lineTo(0.5, 1);
path.lineTo(0, 0.5);

// const geometry = new THREE.ShapeBufferGeometry(path);
const geometry = new THREE.ExtrudeBufferGeometry(path, {
  depth: 0.01,
  bevelEnabled: true,
  bevelSize: 0.1,
  bevelThickness: 0.1,
});

const material = new THREE.MeshLambertMaterial({
  color: 0xeb3452,
  side: THREE.DoubleSide,
});

const support1 = new THREE.Mesh(geometry, material);
support1.position.x = 1;

const support2 = new THREE.Mesh(geometry, material);
support2.position.x = 3;
support2.rotation.y = THREE.MathUtils.degToRad(-180);

const support3 = new THREE.Mesh(geometry, material);
support3.position.x = 2;
support3.position.z = -1;
support3.rotation.y = THREE.MathUtils.degToRad(-90);

const support4 = new THREE.Mesh(geometry, material);
support4.position.x = 2;
support4.position.z = 1;
support4.rotation.y = THREE.MathUtils.degToRad(90);

scene.add(support1);
scene.add(support2);
scene.add(support3);
scene.add(support4);
scene.add(body);
scene.add(head);
scene.add(glass);
scene.add(thruster);

renderer.setAnimationLoop(() => {
  x3.tick();
  x3.fps(() => {
    renderer.render(scene, camera);
  });
});
