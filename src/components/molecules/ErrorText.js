import React from "react";
import { StyleSheet, View, Text } from "react-native";
import colors from "../../theme/colors";


export default function ErrorText({ error }) {
    return (
        <View style={styles.error}>
            <Text style={styles.errorText}>{error}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    error: {
        margin: 5,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    errorText: {
        color: colors.RED,
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 19,
        letterSpacing: 0,
    },
});