import { Text, View, Pressable, StyleSheet } from "react-native";
import { useRouter } from 'expo-router'; 
// import { ThemedText } from '../components/ThemedText';

export default function Index() {
  const router = useRouter();
  
  return (
    <View
      style={styles.container}
    >
      <Text style={{fontSize:30}}>Home Page</Text>
      <Pressable 
      style={{backgroundColor:'lightblue'}}
      onPress={() => router.push('./wardrobe')}>
        <Text>this leads to the wardrobe</Text>
      </Pressable>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center'
  }
});