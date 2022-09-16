import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  ViroARScene,
  ViroText,
  ViroTrackingStateConstants,
  ViroARSceneNavigator,
  ViroBox,
  ViroMaterials,
  ViroAnimations,
  Viro3DObject,
  ViroAmbientLight
} from '@viro-community/react-viro';

const InitialScene = (props) => {

  let [position, setPosition] =useState([0,0,-1])
  let [rotation, setRotation] =useState([-90,0,0])
  const [tvScale, setTvScale] = useState([.001,.001,.001])
  const [skullScale, setSkullScale] = useState([.010,.010,.010])
  let data = props.sceneNavigator.viroAppProps
  ViroMaterials.createMaterials({
    wood: {
      diffuseTexture: require('./assets/woodTexture.jpeg'),
    },
    tv:{
      diffuseTexture: require('./assets/tv/Old_Tv/TV_Body_material_Base_Color.png')
    }
  });

  ViroAnimations.registerAnimations({
    rotate: {
      duration: 2500,
      properties: {
        rotateY: '+=090',
      },
    },
  });

  const moveObject = (newPosition) => {
    setPosition(newPosition)
  }
  const rotateObject = (rotateState, rotationFactor, source) => {
    if(rotateState === 3){
      let newRotation = [rotation[0]-rotationFactor,rotation[1]-rotationFactor,rotation[2]-rotationFactor ]
      setRotation(newRotation)
    }
  }

  const scaleTvObject = (pinchState, scaleFactor, source) =>{
    if(pinchState === 3) {
      let newScale = tvScale[0]*scaleFactor
     
      setTvScale([newScale,newScale,newScale])
    }
  }

  const scaleSkullObject = (pinchState, scaleFactor, source) =>{
    if(pinchState === 3) {
      let newScale = skullScale[0]*scaleFactor
    
      setSkullScale([newScale,newScale,newScale])
    }
  }

  return (
    <ViroARScene>
      <ViroAmbientLight color="#fff" />
      {/* <ViroText 
    text="Hello World"
    position={[0,.5,-2]}
    style={{
      fontSize:25,
      // fontFamily:'Arial',
      color:'red'
    }}
  /> */}
      {/* <ViroBox
        height={2}
        length={2}
        width={2}
        scale={[0.2, 0.2, 0.2]}
        position={[0, -1, -1]}
        materials={['wood']}
        animation={{name: 'rotate', loop: true, run: true}}
      /> */}
      {
        data.displayModel === 'skull'&&
      <Viro3DObject 
      source={require('./assets/skull/12140_Skull_v3_L2.obj')}
      position={position}
      scale={skullScale}
      rotation={rotation}
      type="OBJ"
      onDrag={moveObject}
      onRotate={rotateObject}
      onPinch={scaleSkullObject}
      dragType={'FixedToWorld'}
      />
    }
      {
        data.displayModel === 'tv'&&
        <Viro3DObject 
        source={require('./assets/tv/Old_Tv/Old_Tv.obj')}
        position={position}
        scale={tvScale}
        rotation={rotation}
        type="OBJ"
        materials={['tv']}
        onDrag={moveObject}
        onRotate={rotateObject}
        onPinch={scaleTvObject}
        dragType={'FixedToPlane'}
        />
    }
    </ViroARScene>
  );
};

export default () => {

  const [displayModel,setDisplayModel] = useState('skull')

  return (
    <View style={styles.mainView}>
      <ViroARSceneNavigator
        initialScene={{
          scene: InitialScene,
        }}
        viroAppProps={{displayModel:displayModel}}
        styles={{flex: 1}}
      />
      <View style={styles.controlsView}>
        <TouchableOpacity onPress={()=>setDisplayModel('skull')}>
          <Text style={styles.text}>Display Skull</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>setDisplayModel('tv')}>
          <Text style={styles.text}>Display TV</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

var styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  controlsView: {
    width: '100%',
    height: 100,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text:{
    margin:20,
    backgroundColor:'#9d9d9d',
    padding:10,
    fontWeight:'bold'
  }
});
