import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import colors from "../../theme/colors";
import { Ionicons } from '@expo/vector-icons';
import metrics from "../../theme/metrics";
import { useNavigation } from "@react-navigation/native";

export default function TripItem({ trip, date }) {
    const navigation = useNavigation();

    const Trip = () => {
        return (
            <TouchableOpacity
                style={styles.TripCard}
                onPress={() => navigation.navigate('TripStack', {
                    screen: 'Trip',
                    params: { id: trip.id },
                })}>
                <View style={styles.busSide}>
                    <Ionicons name="md-bus" size={40} color={colors.PRIMARY} />
                    <Text style={styles.busSideText}>{trip.capacity} Places</Text>
                </View>
                <View style={styles.infoSide}>
                    <Text style={styles.infoSideDepartureCity}>de {trip.departure_city}</Text>
                    <Text style={styles.infoSideDepartureTime}> à {trip.departure_time.substring(0, 5)}</Text>
                    <Text style={styles.infoSideArrivalCity}>vers {trip.arrival_city}</Text>
                </View>
                <View style={styles.actionSide}>
                    <Text style={styles.priceText}>{trip.price} CDF</Text>
                </View>
            </TouchableOpacity>
        );
    }

    return date ? (
        trip.date_departure == date ? (
            <Trip />
        ) : null
    ) : (
        <Trip />
    );
}

const styles = StyleSheet.create({
    TripCard: {
        width: metrics.screenWidth - 50,
        height: metrics.screenHeight / 6,
        borderColor: colors.BLACK,
        borderRadius: 10,
        borderWidth: 0.25,
        flexDirection: 'row',
        padding: 5,
        marginBottom: 10,
        backgroundColor: '#fcf7f7',
        elevation: 1,
        shadowColor: colors.GRAY,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
    },
    busSide: {
        flex: 0.7,
        justifyContent: 'center',
        alignItems: 'center'
    },
    busSideText: {
        fontSize: 14,
        color: colors.GRAY,
        fontWeight: '700',
        marginTop: 20
    },
    infoSide: {
        flex: 1.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    infoSideDepartureCity: {
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'capitalize'
    },
    infoSideDepartureTime: {
        fontSize: 14,
        fontWeight: '500'
    },
    infoSideArrivalCity: {
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'capitalize'
    },
    actionSide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10
    },
    priceText: {
        fontSize: 20,
        fontWeight: '900'
    },
    actionSideBtn: {
        backgroundColor: colors.PRIMARY,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        width: '90%'
    },
    actionSideBtnText: {
        color: colors.WHITE,
        fontWeight: '800'
    },

});