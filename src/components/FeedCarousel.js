import React, { useCallback, useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, Image, View, TouchableOpacity, Text } from "react-native";
import Animated from 'react-native-reanimated'
import global from './global'
[]
const AnimatedImage = Animated.createAnimatedComponent(Image)

const data = [
  {id: '1', resizeMode: 'contain', uri: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?cs=srgb&dl=pexels-pixabay-45201.jpg&fm=jpg'},
  {id: '2', resizeMode: 'cover', uri: 'https://wallpapercave.com/wp/wp9252388.jpg'},
  {id: '3', resizeMode: 'contain', uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZyQUKUt83NEI_6ByJ9IbKLunX40dpZp4kwPgZXayJ&s'},
]

const {width: WINDOW_WIDTH, height: WINDOW_HEIGHT} = Dimensions.get('window')

const offsets = data.map((_, i) => i * WINDOW_WIDTH)

const FeedCarousel = (props) => {

  const {navigation, initialIndex} = props;
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  const onViewableItemsChanged = useCallback(({ viewableItems, changed }) => {
    setCurrentIndex(viewableItems[0].index)
    global.app.setState({
      currentIndex: viewableItems[0].index
    })
  }, [])

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity activeOpacity={1} onPress={() => {
        navigation.push('Screen2')
      }} style={{height: WINDOW_HEIGHT, width: WINDOW_WIDTH}}>
        <AnimatedImage sharedTransitionTag={`sharedTag-${item.id}`} source={{uri: item.uri}} style={{height: WINDOW_HEIGHT, width: WINDOW_WIDTH, borderRadius: 20}} />
      </TouchableOpacity>
    )
  }

  const flatListRef = useRef(null);


  useEffect(() => {
    if (flatListRef.current) {
      // dont know why but it doesn't work without a timeout
      setTimeout(() => {
        flatListRef.current.scrollToIndex({animated: false, index: global.app.state.currentIndex})
      }, 0)
    }
  }, [])


  return (
    <View style={{flex: 1}}>

      <View style={{position: 'absolute', zIndex: 1, backgroundColor: "red"}}>
        <Text>Current index: {global.app.state.currentIndex}</Text>
      </View>

      <FlatList
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50
        }}
        ref={flatListRef}
        getItemLayout={(item, index) => {
          return {length: WINDOW_WIDTH, offset: WINDOW_WIDTH * index, index: index}
        }}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${index}-${item.id}`}
        horizontal={true}
        snapToAlignment={'start'}
        decelerationRate={0}
        snapToOffsets={offsets}
      />
    </View>
  )
}

export default FeedCarousel
