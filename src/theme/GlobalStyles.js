import { StyleSheet, Platform, StatusBar } from "react-native";
import colors from "./colors";

export default StyleSheet.create({
    AndroidSafeArea: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        backgroundColor: colors.WHITE,
        padding: 10,
    }
});