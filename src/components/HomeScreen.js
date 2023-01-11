import { StatusBar } from 'expo-status-bar';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../theme/colors';
import GlobalStyles from '../theme/GlobalStyles';
import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import metrics from '../theme/metrics';

export default function HomeScreen({ navigation }) {

    const [notes, setNotes] = useState([]);


    const clickHandler = () => {
        navigation.navigate('Note');
    };

    const FloatingButton = () => {
        return (
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={clickHandler}
                style={styles.floatingButtonStyle}>
                <AntDesign name="plus" size={25} color={colors.WHITE} />
            </TouchableOpacity>
        );
    }

    const EmptyContent = () => {
        return (
            <View style={styles.emptyView}>
                <Image source={require('../../assets/icon/undraw_No_data_re_k.png')} style={styles.notDataImage} />
                <Text numberOfLines={4} style={styles.notDataText}> Commencez par enregistrer votre première lecture</Text>
            </View>
        );
    }

    const Card = () => {
        return (
            <View style={styles.card}>
                <Text style={styles.cardTitle}> Hatomic habits</Text>
                <Text style={styles.cardDescription} numberOfLines={3}>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={[styles.container, GlobalStyles.AndroidSafeArea]}>
            <StatusBar style="auto" />
            {
                notes.length <= 0 ?
                    (
                        <View style={styles.contentView}>
                            <Card />
                            <Card />
                            <Card />
                            <Card />
                            <Card />
                        </View>
                    ) : <EmptyContent />
            }
            <FloatingButton />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    contentView: {
        flex: 1,
    },
    card: {
        height: metrics.screenHeight / 4,
        backgroundColor: colors.GRAY,
        marginBottom: 10,
        padding: 20,
        borderRadius: 20,
    },
    cardTitle: {
        fontSize: 22,
        textTransform: 'capitalize',
        fontWeight: '700',
        marginBottom: 20
    },
    cardDescription: {
        fontSize: 18,
        color: '#6a7070'
    },
    emptyView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    notDataImage: {
        resizeMode: 'contain',
        width: 350,
        height: 350
    },
    notDataText: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20,
        fontWeight: '600'
    },
    floatingButtonStyle: {
        position: 'absolute',
        right: 30,
        bottom: 40,
        backgroundColor: colors.PRIMARY,
        width: 70,
        height: 70,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.7,
        shadowRadius: 10,
        elevation: 2,
    },
});
