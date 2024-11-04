import { View, Text, StyleSheet, Button, Image, Alert, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState, useEffect } from 'react';
import { loadModel, generateDescription } from '.././models/florence_model.js';
import AWSHelper from '.././components/AWSHelper';

export default function Wardrobe() {
    const [images, setImages] = useState<string[]>([]); // Array to hold images
    const [descriptions, setDescriptions] = useState<string[]>([]); // Array to hold descriptions

    // Load the model on component mount
    useEffect(() => {
        const initializeModel = async () => {
            try {
                await loadModel();
                console.log('Model loaded successfully');
            } catch (error) {
                console.error('Error loading model:', error);
            }
        };
        initializeModel();
    }, []);

    const pickPhoto = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });
        if (!result.canceled) {
            const newImageUri = result.assets[0].uri; // Get the new image URI
            const newImages = [...images, result.assets[0].uri]; // Add new image to the array
            setImages(newImages);

            // Get the description of the uploaded image
            const description = await getImageDescription(result.assets[0].uri);
            setDescriptions([...descriptions, description]); // Store the description
        } else {
            Alert.alert('You did not select any image.');
        }
    };

    const getImageDescription = async (uri: string) => {
        try {
            const description = await generateDescription(uri);
            return description; // Return the description
        } catch (error) {
            console.error('Error generating description:', error);
            return 'Description not available'; // Fallback description
        }
    };

    const takePhoto = async () => {
        const camPermission = await ImagePicker.requestCameraPermissionsAsync();
        if (camPermission.granted === false) {
            Alert.alert('Permission to access camera is required.');
            return;
        } 
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            const newImages = [...images, result.assets[0].uri]; // Add new image to the array
            setImages(newImages);
        } else {
            Alert.alert('You did not select any image.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Wardrobe</Text>
            <Button title="Choose from Gallery" onPress={pickPhoto} />
            <Button title="Take photo" onPress={takePhoto} />
            <ScrollView>
                <View style={styles.imageGrid}>
                    {images.map((image, index) => (
                        <View key={index} style={styles.imageContainer}>
                            <Image source={{ uri: image }} style={styles.image} />
                            <Text style={styles.description}>{descriptions[index]}</Text> {/* Display the description */}
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    imageGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: '100%',
    },
    imageContainer: {
        width: '30%',
        marginBottom: 10,
        alignItems: 'center', // Center the description under the image
    },
    image: {
        width: '100%',
        height: 100, // Adjust height as needed
        borderRadius: 10,
    },
    description: {
        marginTop: 5,
        textAlign: 'center', // Center the text
    },
});