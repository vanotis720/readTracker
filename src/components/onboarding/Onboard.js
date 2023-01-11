import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View, StyleSheet, Image, Dimensions } from "react-native";
import AppIntroSlider from 'react-native-app-intro-slider';
import colors from "../../theme/colors";
import metrics from "../../theme/metrics";
import { slides } from "../../utils/constants";
import GlobalStyles from '../GlobalStyles';

export default Onboard = ({ onFinish }) => {

    function renderItem({ item }) {
        return (
            <View style={styles.slide}>
                <Image source={item.image} style={styles.image} />
                <View style={styles.textContainer}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.subtitle}>{item.subtitle}</Text>
                </View>
            </View>
        );
    }

    function onDone() {
        onFinish();
    }


    function renderNextButton() {
        return (
            <View style={styles.nextBtn}>
                <Text style={styles.buttonText}>SUIVANT</Text>
            </View>
        );
    };
    function renderDoneButton() {
        return (
            <View style={styles.nextBtn}>
                <Text style={styles.buttonText}>COMMENCER</Text>
            </View>
        );
    };

    return (
        <View style={[styles.container, GlobalStyles.AndroidSafeArea]}>
            <StatusBar />
            <AppIntroSlider renderItem={renderItem}
                data={slides}
                onDone={onDone}
                showDoneButton={true}
                renderDoneButton={renderDoneButton}
                renderNextButton={renderNextButton}
                dotClickEnabled={true}
                dotStyle={styles.dot}
                activeDotStyle={styles.activeDot}
                bottomButton={true}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE,
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        flex: 1,
        width: metrics.screenWidth,
        height: metrics.screenHeight / 2,
        resizeMode: 'contain'
    },
    textContainer: {
        flex: 1,
        alignItems: 'center',
        marginVertical: 5,
        paddingHorizontal: 15
    },
    title: {
        fontSize: 40,
        fontWeight: "900",
        textAlign: "center",
        color: colors.PRIMARY,
    },
    subtitle: {
        fontSize: 18,
        marginTop: 20,
        textAlign: "center",
        color: colors.GRAY,
    },
    dot: {
        backgroundColor: colors.GRAY,
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 3,
        marginVertical: 3,
    },
    activeDot: {
        backgroundColor: colors.PRIMARY,
        width: 30,
        height: 10,
        borderRadius: 21,
    },
    nextBtn: {
        width: metrics.screenWidth - 50,
        height: 50,
        backgroundColor: colors.PRIMARY,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 20,
    },
    buttonText: {
        fontSize: 15,
        fontWeight: "600",
        lineHeight: 19,
        letterSpacing: 0,
        textAlign: "center",
        color: colors.WHITE,
    }
});
