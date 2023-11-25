import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { auth } from '../Firebase/Firebase';
import { useNavigation } from '@react-navigation/native';

const LogoutScreen = () => {
    const navigation = useNavigation();

    const handleLogout = async () => {
        try {
            await auth.signOut();
            navigation.navigate('Login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const BacktoSurvey = async () => {
        navigation.navigate('SurveyPage');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
            <View style={styles.space} />
            <TouchableOpacity style={styles.button} onPress={BacktoSurvey}>
                <Text style={styles.buttonText}>Back to Survey</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%', // Adjust the width of the parent container as needed
        marginHorizontal: '10%', // Center the container on the screen
    },
    button: {
        marginVertical: 10,
        borderRadius: 30,
        backgroundColor: '#7895CB',
        paddingHorizontal: 20,
        paddingVertical: 10,
        width: '100%', // Make the buttons equal width
    },
    buttonText: {
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    space: {
        marginVertical: 5,
    },
});

export default LogoutScreen;
