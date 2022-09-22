import * as THREE from "three";

export const loadTexture = (path) => {
  return new Promise((resolve, reject) => {
    const loader = new THREE.TextureLoader();
    loader.load(path, (texture) => {
      resolve(texture);
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

  const faceMesh = mindarThree.addFaceMesh();
  const texture = await loadTexture('../../assets/facemesh/face-mask-template/Face_Mask_Template.png');
  faceMesh.material.map = texture;
  faceMesh.material.transparent = true;
  faceMesh.material.needsUpdate = true;

  scene.add(faceMesh);

  await mindarThree.start();

  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
  });
})();
