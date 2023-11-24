import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../Firebase/Firebase'

const LoginScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            if (!validateEmail(email)) {
                // Show error message for invalid email format
                console.error('Invalid email format');
                return;
            }

            if (!validatePassword(password)) {
                // Show error message for invalid password
                console.error('Password must be at least 6 characters');
                return;
            }

            // Perform Firebase authentication (Replace with your authentication method)
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Redirect to Home page with user's display name
            navigation.navigate('Home', { name: user.displayName });
        } catch (error) {
            handleLoginError(error); // Pass the error object directly
        }
    };


    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 6;
    };

    const handleLoginError = (errorCode) => {
        switch (errorCode) {
            case 'auth/invalid-email':
                console.error('Invalid email format');
                // Show error message for invalid email format
                // Example: toast.error('Invalid email format');
                break;
            case 'auth/wrong-password':
                console.error('Invalid password');
                // Show error message for invalid password
                // Example: toast.error('Invalid password');
                break;
            case 'auth/user-not-found':
                console.error('User not found');
                // Show error message for user not found
                // Example: toast.error('User not found');
                break;
            default:
                console.error('Error logging in:', errorCode);
            // Show a generic error message for other login errors
            // Example: toast.error('Error logging in');
        }
    };


    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <Text style={styles.title}>Login</Text>
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
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Signup')} // Replace 'Signup' with your signup screen name
                >
                    <Text style={styles.signupButton}>Signup</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    formContainer: {
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 10,
        width: '80%',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#cccccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    loginButton: {
        backgroundColor: '#007bff',
        width: '100%',
        borderRadius: 5,
        paddingVertical: 12,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    signupButton: {
        color: '#007bff',
        marginTop: 10,
    },
};

export default LoginScreen;
