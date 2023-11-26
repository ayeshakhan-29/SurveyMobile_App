import React, { useEffect, useState, useRef } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'; // Import Dimensions
import { getAuth } from 'firebase/auth';
import { db } from '../Firebase/Firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

const SurveyPage = () => {
    const auth = getAuth(); // Initialize Firebase Auth
    const user = auth.currentUser; // Get the current authenticated user
    // Use the appropriate navigation hook for React Native navigation
    // For instance, if you're using React Navigation:
    const navigation = useNavigation();
    const [surveyHeight, setSurveyHeight] = useState(Dimensions.get('window').height * 0.6);

    const [selectedItems, setSelectedItems] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [responses, setResponses] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null); // Add this line


    const collectionName = 'questions';
    const shouldConfirmExit = useRef(false);

    useEffect(() => {
        queryCollection();
    }, []);


    const queryCollection = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, collectionName));
            const data = querySnapshot.docs.map((doc) => doc.data());
            setQuestions(data);
            setAnswers(new Array(data.length).fill(''));
        } catch (error) {
            console.error('Error getting documents: ', error);
        }
    };

    const showToast = () => {
        Toast.show({
            type: 'error',
            text1: 'Please select an option',
            visibilityTime: 4000, // Set the duration in milliseconds (3 seconds in this example)

        });
    }

    const showToast1 = () => {
        Toast.show({
            type: 'success',
            text1: 'Survey submitted successfully',
            visibilityTime: 4000, // Set the duration in milliseconds (3 seconds in this example)

        });
    }


    const handleSubmit = async () => {
        shouldConfirmExit.current = false;
        const updatedResponses = [...responses];
        updatedResponses[currentStep] = {
            question: questions[currentStep]?.text,
            response: questions[currentStep]?.type === 'checkbox'
                ? selectedItems
                : answers[currentStep],
        };
        setResponses(updatedResponses);

        // Include the user's ID, email, and name in the responses
        const userData = {
            userId: user.uid,
            userEmail: user.email,
            userName: user.displayName, // Include the user's display name
            responses: updatedResponses,
        };

        // Now you can save the responses and user data to the database
        try {
            const responseRef = collection(db, 'responses');
            await addDoc(responseRef, userData);
            console.log('Survey submitted successfully!');
            showToast1();
            navigation.navigate('LogoutScreen');
            // You can also reset the state after saving
            setResponses([]);
            setAnswers(new Array(questions.length).fill(''));
            setCurrentStep(0);
            // setIsSurveyStarted(false);
        } catch (error) {
            console.error('Error saving responses:', error);
        }
    };

    const handleNext = () => {
        shouldConfirmExit.current = true;
        if (currentStep < questions?.length - 1) {
            if (
                (questions[currentStep]?.type === 'checkbox' && selectedItems.length === 0) ||
                (questions[currentStep]?.type !== 'checkbox' && !selectedItem) // Check selectedItem instead of answers
            ) {
                console.log('Please choose an option');
                showToast();
            } else {
                const updatedResponses = [...responses];
                updatedResponses[currentStep] = {
                    question: questions[currentStep]?.text,
                    response: questions[currentStep]?.type === 'checkbox'
                        ? selectedItems
                        : selectedItem, // Use selectedItem instead of answers[currentStep]
                };
                setResponses(updatedResponses);
                setCurrentStep(currentStep + 1);
                setSelectedItem(null); // Reset selectedItem when moving to the next question
            }
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
            setSelectedItem(null); // Reset selectedItem when moving to the previous question
        }
    };

    const handleRadioChange = (value) => {
        setSelectedItem(value);
    };


    return (
        <View style={styles.container}>
            {/* <Image source={bg1} style={styles.backgroundImage} /> */}

            <View style={styles.overlay}>
                <Text style={styles.title}>Mind and Well-Being Assessment Survey</Text>

                {/* Survey content */}
                <View style={[styles.surveyContainer, { height: surveyHeight }]}>
                    {questions.length > 0 && (
                        <>
                            <ScrollView contentContainerStyle={styles.scrollContent}>

                                <Text style={styles.questionText}>{questions[currentStep]?.text}</Text>
                                {questions[currentStep]?.options.map((item) => (
                                    <TouchableOpacity
                                        key={item}
                                        style={styles.optionContainer}
                                        onPress={() => handleRadioChange(item)}
                                    >
                                        <View style={styles.radioContainer}>
                                            <View
                                                style={[
                                                    styles.radio,
                                                    selectedItem === item && styles.checkedRadio,
                                                ]}
                                            />
                                            <Text style={styles.optionText}>{item}</Text>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>

                        </>
                    )}

                    {/* Buttons for navigation */}
                    <View style={styles.buttonContainer}>
                        {currentStep > 0 && (
                            <TouchableOpacity style={styles.button} onPress={handlePrev}>
                                <Text style={styles.buttonText}>Previous</Text>
                            </TouchableOpacity>
                        )}
                        {currentStep < questions?.length - 1 && (
                            <TouchableOpacity style={styles.button} onPress={handleNext}>
                                <Text style={styles.buttonText}>Next</Text>
                            </TouchableOpacity>
                        )}
                        {currentStep === questions?.length - 1 && (
                            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                                <Text style={styles.buttonText}>Submit</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#A0BFE0',
        minHeight: "130%",
        overflow: 'hidden',
        marginBottom: 10,

    },

    overlay: {
        ...StyleSheet.absoluteFillObject,
        top: 25,
        // justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 20,
        marginBottom: 20,
        textAlign: "center"
    },
    surveyContainer: {
        backgroundColor: '#C5DFF8',
        borderRadius: 10,
        padding: 16,
        // justifyContent: 'center',
        top: 25,
        overflow: 'hidden', // Ensure text doesn't overflow the container
        width: "80%",
        height: "50%",
        maxHeight: "80%",
        marginHorizontal: 20,

    },
    scrollContent: {
        // justifyContent: 'center',
        minHeight: "70%",
        paddingTop: 10,
        paddingBottom: 50,
    },
    questionText: {
        fontSize: 22,
        marginBottom: 20,
        color: 'black',
        maxWidth: '90%', // Limit text width to prevent overflow
        // alignSelf: 'center', // Center text
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    optionText: {
        color: 'black',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    button: {
        flex: 1, // Make both buttons occupy equal space
        backgroundColor: '#7895CB',
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 5,
        justifyContent: 'center', // Align text horizontally and vertically
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 3,
        marginRight: 10,
    },

    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radio: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        marginRight: 10,
    },
    checkedRadio: {
        backgroundColor: '#7895CB', // Customize the color when selected
    },
});

export default SurveyPage;
