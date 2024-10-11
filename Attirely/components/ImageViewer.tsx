// ImageViewer.js
import React from 'react';
import { Image, View, StyleSheet } from 'react-native';

const ImageViewer: React.FC<{ placeholderImageSource: string; selectedImage: string }> = ({ placeholderImageSource, selectedImage }) => {
    return (
        <View style={styles.container}>
            <Image
                source={{uri: selectedImage}}
                style={styles.image}
                resizeMode="cover" // Ensure the image covers the area
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '32%',
        height: '100%',
        backgroundColor: 'transparent',
        alignItems: 'center'
    },
    image: {
        borderRadius: 20,
        width: 110,
        height: 150,
        marginBottom: -70
    },
});

export default ImageViewer;
