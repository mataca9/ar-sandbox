import * as THREE from 'three';
import { ARButton } from 'three/examples/jsm/webxr/ARButton';

// Example: placing boxes in current location
document.addEventListener('DOMContentLoaded', () => {
  (async () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera();

    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    scene.add(light);

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.xr.enabled = true;

    const arButton = ARButton.createButton(renderer, {
      requiredFeatures: ['hit-test'],
      optionalFeatures: ['dom-overlay'],
      domOverlay: { root: document.body },
    });
    document.body.append(renderer.domElement);
    document.body.appendChild(arButton);

    const controller = renderer.xr.getController(0);
    scene.add(controller);

    controller.addEventListener('selectstart', () => {});
    controller.addEventListener('selectend', () => {});
    controller.addEventListener('select', () => {
      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(0.5, 0.5, 0.5),
        new THREE.MeshBasicMaterial({
          color: 0xffffff * Math.random(),
        })
      );

      mesh.position.applyMatrix4(controller.matrixWorld);
      mesh.quaternion.setFromRotationMatrix(controller.matrixWorld);
      scene.add(mesh);
    });

    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
  })();
});
