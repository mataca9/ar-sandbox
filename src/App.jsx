import './App.css'

import React, { useRef } from "react";
import { ARCanvas, ARMarker } from "@artcom/react-three-arjs"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useLoader, useFrame } from '@react-three/fiber'

function MyObj() {
  const obj = useLoader(GLTFLoader, '/data/Shine_Sprite.gltf')
  const objRef = useRef({});
  useFrame(({ clock }) => {
    objRef.current.rotation.y += 0.01;
  })

  return <primitive ref={objRef} object={obj.scene} />
}

function App() {

  return (
    <ARCanvas
      camera={ { position: [0, 0, 0] } }
      onCreated={ ({ gl }) => {
        gl.setSize(window.innerWidth, window.innerHeight)
      } }>
      <ambientLight />
      <pointLight position={ [0, 0, 0] }  />
      <ARMarker
        type={ "pattern" }
        patternUrl={ "data/hiro.patt" }>
        <MyObj/>
      </ARMarker>
    </ARCanvas>
  )
}

export default App
