import React, { useCallback, useEffect, useRef, useState } from "react";
import { FlatList, Image, Text, View, Dimensions, Button } from "react-native";
import CarouselItem from "./CarouselItem";
import global from './global'

const { width: WINDOW_WIDTH } = Dimensions.get('window');

const data = [
    {id: 'dummy', resizeMode: 'contain', uri: ''},
    {id: '1', resizeMode: 'contain', uri: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?cs=srgb&dl=pexels-pixabay-45201.jpg&fm=jpg'},
    {id: '2', resizeMode: 'cover', uri: 'https://wallpapercave.com/wp/wp9252388.jpg'},
    {id: '3', resizeMode: 'contain', uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZyQUKUt83NEI_6ByJ9IbKLunX40dpZp4kwPgZXayJ&s'},
    {id: 'dummy', resizeMode: 'contain', uri: ''}
]

const itemWidth = WINDOW_WIDTH * .8
const emptyItemWidth = (WINDOW_WIDTH - itemWidth) / 2;

const offsets = data.map((_, i) => i * itemWidth)

const Carousel = (props) => {
    const {carouselHeight, imageWidth, goNext, goBack } = props;

    const onViewableItemsChanged = useCallback(({ viewableItems, changed }) => {
        global.app.setState({
            currentIndex: viewableItems[0].index
        })
    }, [])

    const renderItem = ({item, index}) => {

        if (item.id === 'dummy') {
            return <View style={{width: emptyItemWidth}}></View>
        }

        return <CarouselItem imageWidth={imageWidth} itemWidth={itemWidth} carouselHeight={carouselHeight} item={item} index={index} />
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
            <FlatList
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={{
                  itemVisiblePercentThreshold: 50
                }}
                ref={flatListRef}
                getItemLayout={(item, index) => {
                    return {length: itemWidth, offset: itemWidth * index, index: index}
                }}
                keyExtractor={(item, index) => `${index}-${item.id}`}
                snapToAlignment={'start'}
                decelerationRate={0}
                snapToOffsets={offsets}
                horizontal={true}
                data={data}
                renderItem={renderItem}
                style={{flex: 1}}
            />
            {goBack && (<Button title="Go Back" onPress={goBack} />)}
            {goNext && (<Button title="Go Next" onPress={goNext} />)}
        </View>
    )
}

export default Carousel
