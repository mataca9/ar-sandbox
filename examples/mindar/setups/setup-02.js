import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { mockWithImage } from "../utils/camera-mock";

function loadGLTF(path) {
  return new Promise((resolve) => {
    const loader = new GLTFLoader();
    loader.load(path, (gltf) => {
      resolve(gltf);
    });
  });
}

function loadAudio(path) {
  return new Promise((resolve) => {
    const loader = new THREE.AudioLoader();
    loader.load(path, (buffer) => {
      resolve(buffer);
    });
  });
}

(async () => {
  const mindarThree = new window.MINDAR.IMAGE.MindARThree({
    container: document.body,
    imageTargetSrc: "../assets/targets.mind",
  });

  // Mocking camera image
  // mockWithImage('../assets/sapiens.jpg');
  const { renderer, scene, camera } = mindarThree;

  // Setting light
  const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
  scene.add(light);

  // Loading model - Raccoon
  const raccoon = await loadGLTF(
    "../assets/models/musicband-raccoon/scene.gltf"
  );

  // Setting model animation - Raccoon
  const mixer = new THREE.AnimationMixer(raccoon.scene);
  const action = mixer.clipAction(raccoon.animations[0]);
  action.play();

  // Fixing model position - Raccoon
  raccoon.scene.scale.set(0.1, 0.1, 0.1);
  raccoon.scene.position.set(0, 0, 0);
  raccoon.scene.rotation.x = THREE.MathUtils.degToRad(90);

  // Loading model - Cake
  const cake = await loadGLTF("../assets/models/cake.gltf");

  // attaching to anchor
  const anchor = mindarThree.addAnchor(0);
  anchor.group.add(raccoon.scene);

  // attaching to anchor
  const anchor2 = mindarThree.addAnchor(1);
  anchor2.group.add(cake.scene);

  // Audio Setup
  const audioClip = await loadAudio(
    "../assets/sounds/musicband-background.mp3"
  );
  const listener = new THREE.AudioListener();
  const audio = new THREE.PositionalAudio(listener);

  const audioClip2 = await loadAudio("../assets/sounds/musicband-drum-set.mp3");
  const audio2 = new THREE.Audio(listener);
  audio2.setBuffer(audioClip2);

  camera.add(listener);
  anchor.group.add(audio);
  audio.setRefDistance(100);
  audio.setBuffer(audioClip);
  audio.setLoop(true);

  // Found and lost events: start and stop music
  anchor.onTargetFound = () => {
    audio.play();
  };

  anchor.onTargetLost = () => {
    audio.pause();
  };

  await mindarThree.start();

  // helper: set raccoon clickable (not a threejs feature)
  raccoon.userData.clickable = true;

  document.body.addEventListener("click", (e) => {
    const { innerWidth, innerHeight } = window;

    // Normalize coordinates
    const mouseX = (e.clientX / innerWidth) * 2 - 1;
    const mouseY = -1 * (e.clientY / innerHeight) * 2 + 1;
    const mouse = new THREE.Vector2(mouseX, mouseY);

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children, true);
    if (intersects.length > 0) {
      audio2.play();
      let obj = intersects[0].object;
      while (obj.parent && !obj.userData.clickable) {
        obj = obj.parent;
      }

      if (obj.userData.clickable) {
        if (obj === raccoon.scene) {
          audio2.play();
        }
      }
    }
  });

  const clock = new THREE.Clock();
  renderer.setAnimationLoop(() => {
    const delta = clock.getDelta();
    mixer.update(delta);
    renderer.render(scene, camera);
  });
})();
