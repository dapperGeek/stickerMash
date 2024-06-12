import { View, Image } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated'
import { Gesture, GestureDetector } from "react-native-gesture-handler";

export default function EmojiSticker ( { imageSize, stickerSource } ) {
    const scaleImage = useSharedValue(imageSize);
    const doubleTap = Gesture.Tap()
        .numberOfTaps(2)
        .onStart(() => {
            if (scaleImage.value !== imageSize * 2)
                scaleImage.value = scaleImage.value * 2;
        });
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const drag = Gesture.Pan()
        .onChange(event => {
            translateX.value += event.x;
            translateY.value += event.y;
        });
    const containerStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateX: translateX.value,
                },
                {
                    translateY: translateY.value,
                },
            ],
        };
    });
    const imageStyle = useAnimatedStyle(() => {
        return {
            width: scaleImage.value,
            height: scaleImage.value,
        };
    });

    return (
        <GestureDetector gesture={drag}>
            <Animated.View style={[ containerStyle, { top: -350 } ]}>
                <GestureDetector gesture={doubleTap}>
                    <Animated.Image
                        source={stickerSource}
                        resizeMode="contain"
                        style={[imageStyle, { height: imageSize, width: imageSize }]}
                    />
                </GestureDetector>
            </Animated.View>
        </GestureDetector>
    );
}