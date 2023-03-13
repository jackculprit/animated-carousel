import {Image, View} from "react-native";
import React from "react";

import Animated, {withSpring} from 'react-native-reanimated';
import { SharedTransition } from 'react-native-reanimated';

const transition = SharedTransition.custom((values) => {
  'worklet';
  return {
    height: withSpring(values.targetHeight),
    width: withSpring(values.targetWidth),
  };
});

const AnimatedImage = Animated.createAnimatedComponent(Image)

const CarouselItem = (props) => {
    const {itemWidth, item, imageWidth} = props;

    return (
        <View style={{width: itemWidth, display: 'flex', alignItems: "center", justifyContent: 'center'}}>
            <AnimatedImage sharedTransitionTag={`sharedTag-${item.id}`} source={{uri: item.uri}} style={{height: '100%', width: imageWidth, borderRadius: 20}} />
        </View>
    )
}

export default CarouselItem
