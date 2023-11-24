import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { getAuth } from 'firebase/auth';
import bg1 from '../Images/blue.png'
import { db } from '../Firebase/Firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const SurveyPage = () => {
    const auth = getAuth(); // Initialize Firebase Auth
    const user = auth.currentUser; // Get the current authenticated user

    const [selectedItems, setSelectedItems] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [responses, setResponses] = useState([]);
    // const [showErrorMessage, setShowErrorMessage] = useState(false);
    // const [isSurveyStarted, setIsSurveyStarted] = useState(false);

    const collectionName = 'questions';

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

    const handleNext = () => {
        shouldConfirmExit.current = true;
        if (currentStep < questions?.length - 1) {
            if (
                (questions[currentStep]?.type === 'checkbox' && selectedItems.length === 0) ||
                (questions[currentStep]?.type !== 'checkbox' && !answers[currentStep])
            ) {
                toast.error('Please choose an option before proceeding.');
            } else {
                const updatedResponses = [...responses];
                updatedResponses[currentStep] = {
                    question: questions[currentStep]?.text,
                    response: questions[currentStep]?.type === 'checkbox'
                        ? selectedItems
                        : answers[currentStep],
                };
                setResponses(updatedResponses);
                setCurrentStep(currentStep + 1);
            }
        }
    };

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

            // Show a success toast message
            toast.success('Survey submitted successfully!', {
                onClose: () => {
                    // Navigate to the home page after successful submission
                    navigate('/');
                },
            });

            // You can also reset the state after saving
            setResponses([]);
            setAnswers(new Array(questions.length).fill(''));
            setCurrentStep(0);
            setIsSurveyStarted(false);
        } catch (error) {
            console.error('Error saving responses:', error);
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleChange = (e) => {
        const updatedAnswers = [...answers];
        updatedAnswers[currentStep] = e.target.value;
        setAnswers(updatedAnswers);
    };

    const handleCheckboxChange = (value) => {
        if (selectedItems.includes(value)) {
            setSelectedItems(selectedItems.filter((item) => item !== value));
        } else {
            setSelectedItems([...selectedItems, value]);
        }
    };

    return (
        <View style={styles.container}>
            <Image source={bg1} style={styles.backgroundImage} />

            <View style={styles.overlay}>
                <Text style={styles.title}>Mind and Well-Being Assessment Survey</Text>

                {/* Your survey components */}
                <View style={styles.surveyContainer}>
                    {questions.length > 0 && (
                        <>
                            <Text style={styles.questionText}>{questions[currentStep]?.text}</Text>
                            {questions[currentStep]?.options.map((item) => (
                                <TouchableOpacity
                                    key={item}
                                    style={styles.optionContainer}
                                    onPress={
                                        questions[currentStep]?.type === 'checkbox'
                                            ? () => handleCheckboxChange(item)
                                            : () => { } // Handle radio button change
                                    }
                                >
                                    {/* Simulated radio button or checkbox */}
                                    {/* Implement your checkbox or radio button UI here */}
                                    <Text style={styles.optionText}>{item}</Text>
                                </TouchableOpacity>
                            ))}
                        </>
                    )}

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

// Separate Stylesheet
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
    },
    surveyContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 16,
        width: '70%',
        height: '50%',
        justifyContent: 'center',
    },
    questionText: {
        fontSize: 18,
        marginBottom: 10,
        color: 'black',
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
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    buttonText: {
        color: 'white',
    },
});

export default SurveyPage
