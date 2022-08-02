import * as THREE from 'three';
import { mockImage, mockVideo } from '../utils/camera-mock';

let acceleration = 0.001;
let ySpeed = 0;
let xSpeed = 0;
const friction = 0.0001;
let rotationSpeed = 0;

(async () => {
  const mindarThree = new window.MINDAR.IMAGE.MindARThree({
    container: document.body,
    imageTargetSrc: '../assets/targets-3.mind'
  });
  
  // mocking sample video
  //await mockVideo('../assets/sapiens.jpg');
  mockImage('../assets/sapiens.jpg')

  const { renderer, scene, camera } = mindarThree;

  const geometry = new THREE.PlaneBufferGeometry(1, 1);
  const material = new THREE.MeshBasicMaterial({
    color: 0x0000ff, transparent: true, opacity: 0.5
  });

  const plane = new THREE.Mesh(geometry, material);

  const cube = new THREE.Mesh(
    new THREE.BoxBufferGeometry(0.5, 0.5, 0.5),
    new THREE.MeshBasicMaterial({
      color: 0xff0000
    })
  )

  cube.position.z = 0.3;    

  const anchor = mindarThree.addAnchor(0);
  anchor.group.add(cube);
  anchor.group.add(plane);

  await mindarThree.start();
  renderer.setAnimationLoop(() => {
    

    if (xSpeed > 0) {
      xSpeed -= friction;
    } else if (xSpeed < 0) {
      xSpeed += friction;
    }

    if (ySpeed > 0) {
      ySpeed -= friction;
    } else if (xSpeed < 0) {
      ySpeed += friction;
    }

    if (rotationSpeed > 0) {
      rotationSpeed -= friction;
    } else if (rotationSpeed < 0) {
      rotationSpeed += friction;
    }


    cube.position.x += xSpeed;
    cube.position.y += ySpeed;
    cube.rotation.z += rotationSpeed;

    renderer.render(scene, camera);
  });

  document.addEventListener("keydown", onDocumentKeyDown, false);  
  function onDocumentKeyDown(event) {
      switch(event.key) {
        case "w":        
          ySpeed += acceleration;
          break;
        case "s":
          ySpeed -= acceleration;
          break;
        case "a":
          xSpeed -= acceleration;
          break;
        case "d":
          xSpeed += acceleration;
          break;
        case "w":        
          cube.position.y += ySpeed;
          break;
        case "q":        
          rotationSpeed -= 0.001;
          break;
        case "e":        
          rotationSpeed += 0.001;
          break;
        case ' ':
            cube.position.x = 0;
            cube.position.y = 0;
            break;
      }
  };
})();