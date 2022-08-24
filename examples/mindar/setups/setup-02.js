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
    imageTargetSrc: "../assets/targets-2.mind",
    maxTrack: 2,
  });

  // Mocking camera image
  // mockWithImage('../assets/sapiens.jpg');
  const { renderer, scene, camera } = mindarThree;

  // Setting light
  const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
  scene.add(light);

  // Raccoon
  // - Loading model
  const raccoon = await loadGLTF(
    "../assets/models/musicband-raccoon/scene.gltf"
  );

  // - Setting model animation
  const mixer = new THREE.AnimationMixer(raccoon.scene);
  const action = mixer.clipAction(raccoon.animations[0]);
  action.play();

  // - Fixing model position
  raccoon.scene.scale.set(0.1, 0.1, 0.1);
  raccoon.scene.position.set(0, 0, 0);
  raccoon.scene.rotation.x = THREE.MathUtils.degToRad(90);

  // - Attaching to anchor
  const anchor = mindarThree.addAnchor(0);
  anchor.group.add(raccoon.scene);

  // Bear
  // - Loading model
  const bear = await loadGLTF("../assets/models/musicband-bear/scene.gltf");

  // - Setting model animation
  const mixer2 = new THREE.AnimationMixer(bear.scene);
  const action2 = mixer2.clipAction(bear.animations[0]);
  action2.play();

  // - Fixing model position
  bear.scene.scale.set(0.1, 0.1, 0.1);
  bear.scene.position.set(0, 0, 0);
  bear.scene.rotation.x = THREE.MathUtils.degToRad(90);

  // Attaching to anchor
  const anchor2 = mindarThree.addAnchor(1);
  anchor2.group.add(bear.scene);

  // Audio Setup
  const listener = new THREE.AudioListener();
  camera.add(listener);

  // - Music 1
  const audioClipDrums = await loadAudio("../assets/sounds/drums.wav");
  const audioDrums = new THREE.PositionalAudio(listener);

  anchor.group.add(audioDrums);
  audioDrums.setRefDistance(200);
  audioDrums.setBuffer(audioClipDrums);
  audioDrums.setLoop(true);

  // - Music 2
  const audioClipCello = await loadAudio("../assets/sounds/cello.wav");
  const listenerCello = new THREE.AudioListener();
  const audioCello = new THREE.PositionalAudio(listener);

  camera.add(listenerCello);
  anchor2.group.add(audioCello);
  audioCello.setRefDistance(300);
  audioCello.setBuffer(audioClipCello);
  audioCello.setLoop(true);

  // - Drumset
  const audioClipDrums2 = await loadAudio(
    "../assets/sounds/musicband-drum-set.mp3"
  );
  const audioDrums2 = new THREE.Audio(listener);
  audioDrums2.setBuffer(audioClipDrums2);

  // Found and lost events: start and stop music
  anchor.onTargetFound = () => {
    audioDrums.play();
  };

  anchor.onTargetLost = () => {
    audioDrums.pause();
  };

  // Found and lost events: start and stop music
  anchor2.onTargetFound = () => {
    audioCello.play();
  };

  anchor2.onTargetLost = () => {
    audioCello.pause();
  };

  await mindarThree.start();

  // helper: set raccoon clickable (not a threejs feature)
  raccoon.scene.userData.clickable = true;

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
      // audioDrums2.play();
      let obj = intersects[0].object;
      while (obj.parent && !obj.userData.clickable) {
        obj = obj.parent;
      }

      console.log(obj);

      if (obj.userData.clickable) {
        if (obj === raccoon.scene) {
          audioDrums2.play();
        }
      }
    }
  });

  const clock = new THREE.Clock();
  renderer.setAnimationLoop(() => {
    const delta = clock.getDelta();
    mixer.update(delta);
    mixer2.update(delta);
    renderer.render(scene, camera);
  });
})();
