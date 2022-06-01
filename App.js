import React from "react";
import { View, Text } from "react-native";
import Expo from "expo";
import { Scene, Mesh, MeshBasicMaterial, PerspectiveCamera } from "three";
import { Renderer } from "expo-three";
import { ExpoWebGLRenderingContext, GLView } from "expo-gl";
import { BoxBufferGeometry } from "three";
import { THREE } from "expo-three";
import { TouchableOpacity } from "react-native";

const App = () => {
  global.THREE = global.THREE || THREE;

  const onContextCreate = async (gl) => {
    //three js code
    const scene = new Scene();
    const camera = new PerspectiveCamera(
      75,
      gl.drawingBufferWidth / gl.drawingBufferHeight,
      0.1,
      1000
    );
    gl.canvas = {
      width: gl.drawingBufferWidth,
      height: gl.drawingBufferHeight,
    };
    camera.position.z = 3;

    const renderer = new Renderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

    const geometry = new BoxBufferGeometry(1, 1, 1);
    const material = new MeshBasicMaterial({
      color: "blue",
    });
    const cube = new Mesh(geometry, material);
    scene.add(cube);

    const render = () => {
      requestAnimationFrame(render);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
      gl.endFrameEXP();
    };

    render();
  };

  return (
    <View>
      <TouchableOpacity onPress={() => console.log("Hello")}>
        <GLView
          onContextCreate={onContextCreate}
          style={{ width: 500, height: 500 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default App;
