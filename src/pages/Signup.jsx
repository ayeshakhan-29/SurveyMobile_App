import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../Firebase/Firebase';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook from React Navigation
import { doc, setDoc } from 'firebase/firestore';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');

    const navigation = useNavigation(); // Initialize navigation object

    const handleSignup = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, {
                displayName: displayName,
            });

            console.log('User signed up:', userCredential.user);

            // Save user data to Firestore with a unique identifier (UID)
            const userDocRef = doc(db, 'users', userCredential.user.uid);
            await setDoc(userDocRef, {
                email: email,
                displayName: displayName,
            });

            console.log('User data saved to Firestore');

            // Show a success toast message
            // toast.success('Signup successful!');

            // Navigate to the login page
            navigation.navigate('Login');

        } catch (error) {
            console.error('Error signing up:', error);

            // Show a failure toast message
            // toast.error('Signup failed. Please try again.');
        }
    };

    const handleLoginNavigation = () => {
        navigation.navigate('Login');
    };


    return (
        <View style={styles.container}>
            <View style={styles.signupContainer}>
                <Text style={styles.title}>Sign Up</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Display Name"
                    value={displayName}
                    onChangeText={(text) => setDisplayName(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />

                <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLoginNavigation}>
                    <Text style={styles.loginLink}>Already have an account? Login</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};

// Separate Stylesheet
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f0f0',
    },
    signupContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 8,
        width: '80%',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        width: '100%',
        padding: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        marginBottom: 16,
    },
    signupButton: {
        backgroundColor: 'green',
        width: '100%',
        padding: 12,
        borderRadius: 6,
        alignItems: 'center',
        marginBottom: 16,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    loginLink: {
        color: 'blue',
    },
});

export default Signup;
