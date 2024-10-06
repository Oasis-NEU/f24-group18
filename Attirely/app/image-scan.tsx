import { View, Text, StyleSheet, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';

export default function ImageScan() {
    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
        });
    
        if (!result.canceled) {
            console.log(result);
        } else {
            alert('You did not select any image.');
        }
    };
    
    return (
        <View style={styles.container}>
            <Text>Image Scan page</Text>
            <Pressable onPress={pickImageAsync}>
                <Text>Choose an image</Text>
            </Pressable>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    }
});