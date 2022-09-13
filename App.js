import React, {useState} from 'react';
import {StyleSheet, SafeAreaView, View} from 'react-native';
import {
  ViroARScene,
  ViroText,
  ViroTrackingStateConstants,
  ViroARSceneNavigator,
  ViroBox,
  ViroMaterials,
  ViroAnimations
} from '@viro-community/react-viro';


const InitialScene = () =>{

    ViroMaterials.createMaterials({
      wood:{
        diffuseTexture:require('./assets/woodTexture.jpeg')
      }
    })

    ViroAnimations.registerAnimations({
      rotate:{
        duration:2500,
        properties:{
          rotateY:'+=090'
        }
      }
    })

  return(

   <ViroARScene>
    {/* <ViroText 
    text="Hello World"
    position={[0,-2,0]}
    style={{
      fontSize:50,
      // fontFamily:'Arial',
      color:'red'
    }}
  /> */}
    <ViroBox 
      height={2}
      length={2}
      width={2}
      scale={[.2,0.2,0.2]}
      position={[0,-1,-1]}
      materials={['wood']}
      animation={{name:'rotate', loop:true,run:true}}
      />
  </ViroARScene>
  )
}

export default () => {
  return (
    <ViroARSceneNavigator 
      initialScene={{
        scene:InitialScene
      }}
      styles={{flex:1}}
    />
  );
};

var styles = StyleSheet.create({
 
 
});
