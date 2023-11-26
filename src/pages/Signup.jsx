import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../Firebase/Firebase';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook from React Navigation
import { doc, setDoc } from 'firebase/firestore';
import Toast from 'react-native-toast-message';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');

    const navigation = useNavigation();

    const showToast = (type, text) => {
        Toast.show({
            type: type,
            text1: text,
            visibilityTime: 4000,
        });
    };

    const handleSignup = async () => {
        try {
            if (!validateEmail(email)) {
                console.error('Invalid email format');
                showToast('error', 'Invalid email format');
                return;
            }
            if (!validatePassword(password)) {
                // Show error message for invalid password
                console.error('Password must be at least 6 characters');
                showToast('error', 'Password must be at least 6 characters');
                return;
            }

            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, {
                displayName: displayName,
            });

            console.log('User signed up:', userCredential.user);
            showToast('success', 'You have registered successfully');

            const userDocRef = doc(db, 'users', userCredential.user.uid);
            await setDoc(userDocRef, {
                email: email,
                displayName: displayName,
            });

            console.log('User data saved to Firestore');
            navigation.navigate('Login');
        } catch (error) {
            console.error('Error signing up:', error);
            showToast('error', 'Sign up failed');
        }
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 6;
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
        backgroundColor: '#68B984',
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
        color: '#5FBDFF',
    },
});

export default Signup;
