import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const FirstPage = () => {
    const navigation = useNavigation();

    const goToSignupPage = () => {
        navigation.navigate('SignupPage');
    };

    const goToAdminPanel = () => {
        navigation.navigate('AdminPanel');
    };

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <Button title="Go to Signup" onPress={goToSignupPage} />
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Go to Admin Panel" onPress={goToAdminPanel} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#A0BFE0', // Background color
    },
    buttonContainer: {
        margin: 10,
        width: '70%', // Equal width for both buttons
        borderRadius: 10, // Border radius
        overflow: 'hidden', // Clip
    }
});

export default FirstPage;
