import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

function loadGLTF(path) {
  return new Promise((resolve) => {
    const loader = new GLTFLoader();
    loader.load(path, (gltf) => {
      resolve(gltf);
    });
  });
}

(async () => {
  const mindarThree = new window.MINDAR.FACE.MindARThree({
    container: document.body,
  });

  const { renderer, scene, camera } = mindarThree;

  // Setting light
  const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
  scene.add(light);

  // Glasses
  // - Loading model
  const glasses = await loadGLTF('../assets/models/glasses/scene.gltf');

  glasses.scene.scale.multiplyScalar(0.008);
  glasses.scene.renderOrder = 1;

  // - Attaching model to anchor
  const anchor = mindarThree.addAnchor(168);
  anchor.group.add(glasses.scene);

  // Occluder (invisible head)
  // - Loading model
  const occluder = await loadGLTF(
    '../assets/models/sparkar-occluder/headOccluder.glb'
  );

  occluder.scene.scale.multiplyScalar(0.065);
  occluder.scene.position.set(0, -0.3, 0.15);
  occluder.scene.renderOrder = 0;

  // Occlusion material
  const occluderMaterial = new THREE.MeshBasicMaterial({ colorWrite: false });
  occluder.scene.traverse((obj) => {
    if (obj.isMesh) {
      obj.material = occluderMaterial;
    }
  });

  // - Attaching model to anchor
  const anchor2 = mindarThree.addAnchor(168);
  anchor2.group.add(occluder.scene);

  await mindarThree.start();

  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
  });
})();
