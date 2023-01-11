import { Image, Linking, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../theme/colors";
import metrics from "../theme/metrics";
import { expo } from '../../app.json';


function AboutScreen() {
    const GOOGLE_PACKAGE_NAME = 'com.vanotis720.readtracker';
    const APPLE_STORE_ID = 'id284882215';

    const reviewsApp = () => {
        if (Platform.OS != 'ios') {
            Linking.openURL(`market://details?id=${GOOGLE_PACKAGE_NAME}`).catch(err =>
                alert('S\'il vous plaît vérifier sur Google Play Store')
            );
        } else {
            Linking.openURL(
                `itms://itunes.apple.com/in/app/apple-store/${APPLE_STORE_ID}`
            ).catch(err => alert('S\'il vous plaît vérifier sur l\'App Store'));
        }
    }
    const date = new Date();
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.appName}>Read Tracker</Text>
                <Text style={styles.appVersion}>Version {expo.version}</Text>
            </View>
            <View style={styles.logoContainer}>
                <Image source={require('../../assets/readtracker-modified.png')} style={styles.logo} />
            </View>
            <View style={styles.menuContainer}>
                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => Linking.openURL('mailto:vanotis720@gmail.com')}
                >
                    <Text style={styles.menuItemText}>Contactez-moi</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => reviewsApp()}
                >
                    <Text style={styles.menuItemText}>Notez l'application</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.menuItem}
                    onPress={() => Linking.openURL('https://google.com')}
                >
                    <Text style={styles.menuItemText}>Regles de confidentialites</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.copyright}>
                <Text style={styles.copyrightText}>{'\u00A9' + date.getFullYear()}  Vander Otis</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10
    },
    appName: {
        fontSize: 25,
        fontWeight: '500'
    },
    appVersion: {
        fontSize: 13,
        fontWeight: '300',
        fontStyle: 'italic'
    },
    logoContainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        width: 200,
        height: 200,
        resizeMode: 'contain'
    },
    menuContainer: {
        flex: 3,
        alignItems: 'flex-start',
        marginVertical: 15
    },
    menuItem: {
        height: 50,
        justifyContent: 'center',
        paddingVertical: 15,
        width: metrics.screenWidth,
        borderColor: colors.BLACK,
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5

    },
    menuItemText: {
        fontSize: 17,
        fontWeight: '500',
        color: colors.BLACK
    },
    copyright: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    copyrightText: {
        fontSize: 15,
        fontWeight: '700'
    },
});

export default AboutScreen;