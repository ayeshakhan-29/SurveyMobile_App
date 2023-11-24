import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import bg1 from '../Images/blue.png';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook from React Navigation
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function Home() {
    const [displayName, setDisplayName] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in.
                setDisplayName(user.displayName || '');
            } else {
                // No user is signed in.
                setDisplayName('');
            }
        });

        return () => unsubscribe();
    }, []);

    const handleStartSurveyClick = () => {
        if (displayName) {
            navigation.navigate('SurveyPage');
        } else {
            // Show error message or handle the case where the user is not logged in
        }
    };

    return (

        <View style={styles.container}>
            <Image source={bg1} style={styles.backgroundImage} />

            <View style={styles.content}>
                <Text style={styles.brandText}>OWL BRAND</Text>
                <Text style={styles.projectText}>Barn Owl Pellet Data Project</Text>
                {displayName ? (
                    <Text style={styles.displayName}>Hi, {displayName}!</Text>
                ) : null}
                <Text style={styles.projectText1}>Together, we are gathering information about the unique and fascinating diet of the common barn owl. In this survey, you'll have the chance to record your findings after dissecting a barn owl pellet, including prey species and their bone and exoskeleton discoveries.</Text>
                <TouchableOpacity style={styles.button} onPress={handleStartSurveyClick}>
                    <Text style={styles.buttonText}>Start Survey</Text>
                </TouchableOpacity>
            </View>
        </View >


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%"
    },
    content: {
        position: 'absolute',
        top: 10,
        left: 0,
        right: 0,
        bottom: 0,
        // justifyContent: 'center',
        alignItems: 'center',
    },
    brandText: {
        fontSize: 48,
        fontWeight: 'bold',
        marginTop: 5,
        textAlign: 'center',
    },
    projectText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 5,
        textAlign: 'center',
    },
    projectText1: {
        fontSize: 14,
        fontWeight: 'normal',
        marginTop: 20,
        textAlign: 'center',
    },
    displayName: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 4,
    },
    button: {
        backgroundColor: 'blue', // Background color
        paddingHorizontal: 20, // Horizontal padding
        paddingVertical: 10, // Vertical padding
        borderRadius: 8, // Border radius
        marginTop: 20, // Top margin
    },

    buttonText: {
        color: 'white', // Text color
        fontSize: 16, // Font size
        fontWeight: 'bold', // Font weight
        textAlign: 'center', // Text alignment
    },
});

export default Home;
