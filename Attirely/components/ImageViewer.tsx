import React from 'react';
import { Image, View, StyleSheet } from 'react-native';

const ImageViewer: React.FC<{ placeholderImageSource: string; selectedImage: string }> = ({ placeholderImageSource, selectedImage }) => {
    return (
        <View style={styles.container}>
            <Image
                source={selectedImage ? { uri: selectedImage } : { uri: placeholderImageSource }} // Use placeholder if no image
                style={styles.image}
                resizeMode="cover" // Ensure the image covers the area
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '32%', // Adjust width to fit 3 images per row
        height: 150, // Set a fixed height for the image container
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center', // Center the image
    },
    image: {
        borderRadius: 10,
        width: '100%', // Make the image take the full width of the container
        height: '100%', // Make the image take the full height of the container
    },
});

export default ImageViewer;