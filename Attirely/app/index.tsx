import { Text, View, Pressable, StyleSheet } from "react-native";
import { useRouter } from 'expo-router'; 

export default function Index() {
  const router = useRouter();
  
  return (
    <View
      style={styles.container}
    >
      <Text>Home page</Text>
      <Pressable 
      style={{backgroundColor:'lightblue'}}
      onPress={() => router.push('./image-scan')}>
        <Text>this leads to image scan page</Text>
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