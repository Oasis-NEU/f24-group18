import { View, Text, StyleSheet, Pressable, Button, Image, TextInput, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import ImageViewer from '../components/ImageViewer';
import { Stack } from 'expo-router';
import AWS from 'aws-sdk';


const PlaceholderImage = require('../assets/images/blank-gray-rectangle.jpg');

export default function Wardrobe() {
    const [images, setImages] = useState<string[]>([]); // Array to hold images
    const [descriptions, setDescriptions] = useState<string[]>([]);  // Array to hold descriptions

    AWS.config.update({
        accessKeyId: 'YOUR_AWS_ACCESS_KEY_ID', // Replace with AWS Access Key ID
        secretAccessKey: 'YOUR_AWS_SECRET_ACCESS_KEY', // Replace with AWS Secret Access Key
        region: 'us-east-2', 
    });

    const s3 = new AWS.S3(); 

    const uploadDescriptionToS3 = async (index: number) => {
        const params = {
            Bucket: 'attirely',
            Key: `descriptions/${Date.now()}.txt`, // Unique key for the description
            Body: descriptions,
            ContentType: 'text/plain',
        };

        try {
            await s3.putObject(params).promise();
            alert('Description uploaded successfully!');
        } catch (error) {
            console.error('Error uploading description:', error);
            alert('Failed to upload description.');
        }
    };


    const pickPhoto = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });
        if (!result.canceled) {
            const newImages = [...images, result.assets[0].uri]; // Add new image to the array
            setImages(newImages);
            setDescriptions([...descriptions, '']); // Add an empty description for the new image
        } else {
            Alert.alert('You did not select any image.');
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
            setDescriptions([...descriptions, '']); // Add an empty description for the new image
        } else {
            Alert.alert('You did not select any image.');
        }
    };
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Wardrobe</Text>
            <Button title="Choose from Gallery" onPress={pickPhoto} />
            <Button title="Take a Photo" onPress={takePhoto} />
            {images.map((image, index) => (
                <View key={index} style={styles.imageContainer}>
                    <Image source={{ uri: image }} style={styles.image} />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter image description"
                        value={descriptions[index]}
                        onChangeText={(text) => {
                            const newDescriptions = [...descriptions];
                            newDescriptions[index] = text; // Update the description for the corresponding image
                            setDescriptions(newDescriptions);
                        }}
                    />
                    <Button title="Upload Description" onPress={() => uploadDescriptionToS3(index)} />
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    image: {
        width: 200,
        height: 200,
        marginTop: 20,
        borderRadius: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 10,
        width: '80%',
        paddingHorizontal: 10,
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
});

