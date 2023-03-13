import React, { useCallback, useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  Dimensions
} from "react-native";

import global from './src/components/global'
import Animated from 'react-native-reanimated'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CommonActions, NavigationContainer, useFocusEffect } from "@react-navigation/native";
import Carousel from "./src/components/Carousel";
import FeedCarousel from "./src/components/FeedCarousel";

const Stack = createNativeStackNavigator();

const commentsCarouselHeight = 100
const actionModeCarouselHeight = 500
const feedCarouselHeight = 1000

const {width: WINDOW_WIDTH} = Dimensions.get('window')
const AnimatedImage = Animated.createAnimatedComponent(Image)

const Screen1 = ({ navigation, route }) => {

  return (
    <View style={{ flex: 1 }}>
      <View style={{width: '100%', height: feedCarouselHeight}}>
        <FeedCarousel navigation={navigation} imageWidth={WINDOW_WIDTH} initialIndex={0} carouselHeight={feedCarouselHeight} />
      </View>
    </View>
  );
}

const Screen2 = ({ navigation, route }) => {

  const goBack = useCallback(() => {
    navigation.push('Screen1')
  }, [])

  const goNext = useCallback(() => {
    navigation.push('Screen3')
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <View style={{width: '100%', height: actionModeCarouselHeight}}>
        <Carousel
          navigation={navigation}
          goNext={goNext}
          goBack={goBack}
          imageWidth={300}
          carouselHeight={actionModeCarouselHeight}
        />
      </View>
    </View>
  );
}

function Screen3({ navigation, route }) {

  const goBack = useCallback(() => {
    navigation.push('Screen2')
  }, [])

  return (
    <View style={{ flex: 1, marginTop: 50 }}>
      <View style={{width: '100%', height: commentsCarouselHeight}}>
        <Carousel goBack={goBack} imageWidth={100} carouselHeight={commentsCarouselHeight} />
      </View>
    </View>
  );
}


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 1,
    }
    global.app = this;
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
          <Stack.Screen name="Screen1" component={Screen1} />
          <Stack.Screen name="Screen2" component={Screen2} />
          <Stack.Screen name="Screen3" component={Screen3} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
});

export default App;
