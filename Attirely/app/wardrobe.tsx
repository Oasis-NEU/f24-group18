import { View, Text, StyleSheet, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import ImageViewer from '../components/ImageViewer';
import { Stack } from 'expo-router';

const PlaceholderImage = require('../assets/images/blank-gray-rectangle.jpg');

export default function Wardrobe() {
    const [images, setImages] = useState<string[]>(Array(6).fill(null)); // Array to hold images
    const pickPhoto = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });
        if (!result.canceled) {
            const newImages = [...images]; 
            const nextIndex = newImages.findIndex(image => image === null); // Find the next empty index
            if (nextIndex !== -1) {
                newImages[nextIndex] = result.assets[0].uri; // Replace the placeholder with the new image
                setImages(newImages);
            } else {
                alert('All image slots are filled.');
            }
        } else {
            alert('You did not select any image.');
        }
    };

    const takePhoto = async() => {
        const camPermission = await ImagePicker.requestCameraPermissionsAsync();
        if (camPermission.granted === false) {
            alert('Permission to access camera is required.');
            return;
        } 
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            const newImages = [...images]; 
            const nextIndex = newImages.findIndex(image => image === null); // Find the next empty index
            if (nextIndex !== -1) {
                newImages[nextIndex] = result.assets[0].uri; // Replace the placeholder with the new image
                setImages(newImages);
            } else {
                alert('All image slots are filled.');
            }
        } else {
            alert('You did not select any image.');
        }
    };
    
    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />
            <Text style={styles.title}>Wardrobe Page</Text>
            <Pressable style={{backgroundColor:"lightblue"}} onPress={pickPhoto}>
                <Text>Add item</Text>
            </Pressable>
            <Pressable style={{backgroundColor:"pink"}} onPress={takePhoto}>
                <Text>Scan item</Text>
            </Pressable>
            <View style={styles.shirtContainer}>
                {images.map((image, index) => (
                    <ImageViewer 
                        key={index}
                        placeholderImageSource={PlaceholderImage} 
                        selectedImage={image !== null ? image : ""}
                    />
                ))}
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        paddingBottom: 30
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 100
    },
    shirtContainer: {
        paddingTop: 40,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    }
});

