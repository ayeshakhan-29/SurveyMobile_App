import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DashboardContent = () => {
    return (
        <View style={styles.mainContent}>
            <Text>Dashboard Content Here</Text>
            {/* Add your dashboard-specific components */}
        </View>
    );
};

const SettingsContent = () => {
    return (
        <View style={styles.mainContent}>
            <Text>Settings Content Here</Text>
            {/* Add your settings-specific components */}
        </View>
    );
};

const OtherContent = () => {
    return (
        <View style={styles.mainContent}>
            <Text>Other Tab Content Here</Text>
            {/* Add your other tab-specific components */}
        </View>
    );
};

const MainContent = ({ activeTab }) => {
    let content;

    switch (activeTab) {
        case 'Dashboard':
            content = <DashboardContent />;
            break;
        case 'Settings':
            content = <SettingsContent />;
            break;
        default:
            content = <OtherContent />;
            break;
    }

    return <View style={styles.container}>{content}</View>;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default MainContent;
