import { useRef } from "react";
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import colors from "../theme/colors";
import { useHeaderHeight } from '@react-navigation/elements';
import Constants from 'expo-constants';



function NoteScreen({ navigation }) {
    const richText = useRef();
    const headerHeight = useHeaderHeight();

    return (
        <SafeAreaView style={styles.container}>

            <ScrollView>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    keyboardVerticalOffset={headerHeight + Constants.statusBarHeight}
                    style={{ flex: 1 }}>
                    <RichEditor
                        ref={richText}
                        onChange={descriptionText => {
                            console.log("descriptionText:", descriptionText);
                        }}
                    />
                </KeyboardAvoidingView>
            </ScrollView>
            <View style={{ position: 'absolute', bottom: 0 }}>
                <RichToolbar
                    editor={richText}
                    actions={[
                        actions.setBold,
                        actions.setItalic,
                        actions.insertBulletsList,
                        actions.insertOrderedList,
                        actions.insertLink,
                        actions.keyboard,
                        actions.setStrikethrough,
                        actions.setUnderline,
                        actions.removeFormat,
                        actions.checkboxList,
                        actions.undo,
                        actions.redo
                    ]}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.WHITE,
        padding: 10,
    },
});

export default NoteScreen;