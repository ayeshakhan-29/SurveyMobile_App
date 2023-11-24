import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import bg1 from '../Images/blue.png';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook from React Navigation
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { signOut, getAuth } from 'firebase/auth';

function Home() {
    // const location = useLocation();
    // const queryParams = new URLSearchParams(location.search);
    // const displayName = queryParams.get('name');
    const navigation = useNavigation(); // Initialize navigation object
    // const auth = getAuth();

    // const handleLogout = () => {
    //     signOut(auth)
    //         .then(() => {
    //             toast.success('Logged out successfully');
    //             // navigate('/');
    //         })
    //         .catch((error) => {
    //             toast.error('Error logging out');
    //         });
    // };

    const handleStartSurveyClick = () => {
        // if (displayName) {
        //     // navigate('/SurveyPage');
        // } else {
        //     toast.error('Please log in to start the survey.', {
        //         position: 'top-center',
        //         autoClose: 5000,
        //     });
        // }
        navigation.navigate('SignupPage'); // Navigate to the 'SurveyPage'

    };

    const loginhandle = () => {
        navigation.navigate('Login');
    }

    const handlesurvey = () => {
        navigation.navigate('SurveyPage');

    }

    return (

        <View style={styles.container}>
            <Image source={bg1} style={styles.backgroundImage} />

            <View style={styles.content}>
                <Text style={styles.brandText}>OWL BRAND</Text>
                <Text style={styles.projectText}>Barn Owl Pellet Data Project</Text>

                {/* {displayName && (
                        <Text style={styles.displayName}>Hi, {displayName}!</Text>
                    )} */}

                {/* Rest of your content */}
                <TouchableOpacity style={styles.button} onPress={handleStartSurveyClick}>
                    <Text>Signup</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={loginhandle}>
                    <Text>login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handlesurvey}>
                    <Text>Start Survey</Text>
                </TouchableOpacity>

            </View>
        </View>


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
        top: 60,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    brandText: {
        fontSize: 48,
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'center',
    },
    projectText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'center',
    },
    displayName: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 4,
    },
    button: {
        color: "blue",
        borderColor: "blue",

    }
    // Define other styles as needed for different elements
});

export default Home;
