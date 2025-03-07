import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useUser } from './context/UserContext'; // Import UserContext
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SetupScreen() {
  const { userData, setUserData } = useUser(); // Access global state
  const router = useRouter(); // For navigation

  // Local state to store form values
  const [gender, setGender] = useState(userData.gender || '');
  const [height, setHeight] = useState(userData.height || '');
  const [weight, setWeight] = useState(userData.weight || '');
// store all these and rank via submit
  // Save user data and navigate to Home Page
  const handleSubmit = async () => {
    const userInfo = { gender, height, weight };

    // Save to AsyncStorage
    await AsyncStorage.setItem('height', height);
    await AsyncStorage.setItem('weight', weight);
    await AsyncStorage.setItem('gender', gender);
    // await AsyncStorage.setItem('dob', JSON.stringify(dob));

    // Update global state
    setUserData((prev) => ({
      ...prev,
      gender,
      height,
      weight,
    }));

    // Redirect to home page after submission
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Setup Your Profile</Text>

      <Text>Gender:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter gender"
        value={gender}
        onChangeText={setGender}
      />

      <Text>Height (cm):</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter height"
        keyboardType="numeric"
        value={height}
        onChangeText={setHeight}
      />

      <Text>Weight (kg):</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter weight"
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
      />

      <Button title="Save & Continue" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: '100%',
    backgroundColor: '#fff',
  },
});
