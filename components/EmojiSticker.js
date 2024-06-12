import { View, Image } from "react-native";

export default function EmojiSticker ( { imageSize, stickerSource } ) {
    return (
        <View style={{ top: -350 }}>
            <Image
                source={stickerSource}
                resizeMode="contain"
                style={{ height: imageSize, width: imageSize }}
            />
        </View>
    );
}