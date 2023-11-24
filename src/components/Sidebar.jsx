import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Sidebar = ({ handleTabClick }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleTabItemClick = (tab) => {
        handleTabClick(tab);
        setIsOpen(false); // Close sidebar when a tab is clicked
    };

    return (
        <View style={[styles.sidebar, { width: isOpen ? 200 : 50 }]}>
            <TouchableOpacity onPress={toggleSidebar} style={styles.toggleButton}>
                <Text>{isOpen ? 'Close' : 'Open'}</Text>
            </TouchableOpacity>
            {isOpen && (
                <View style={styles.tabContainer}>
                    <TouchableOpacity onPress={() => handleTabItemClick('Dashboard')} style={styles.tabItem}>
                        <Text>Dashboard</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleTabItemClick('Settings')} style={styles.tabItem}>
                        <Text>Settings</Text>
                    </TouchableOpacity>
                    {/* Add more tab items as needed */}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    sidebar: {
        backgroundColor: '#f0f0f0',
        paddingTop: 50,
        alignItems: 'center',
    },
    toggleButton: {
        width: 50,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ddd',
    },
    tabContainer: {
        marginTop: 20,
    },
    tabItem: {
        padding: 10,
    },
});

export default Sidebar;
