import { inject, observer } from 'mobx-react';
import React from 'react';
import web3 from 'web3';
import { View, Text, Button, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { EtherScanUrl } from '../../../../util/helper';

const Pending = ({ store, item }) => {
    console.log(item.value);
    const amount = web3.utils.fromWei(item.value, 'ether');
    return (
        <View style={styles.container}>
            <View style={styles.round1}>
                <View style={styles.round2}>
                    <View style={styles.round3} />
                </View>
            </View>
            <View style={{ marginLeft: 10 }}>
                <Text style={styles.pending}>Pending</Text>
                <Text style={{ color: '#000000' }}>{"Amount: " + amount + ' ETH'}</Text>
                <TouchableOpacity
                    onPress={() => {
                        Linking.openURL(EtherScanUrl(item.transactionHash));
                    }}
                    style={styles.etherScan}>
                    <Text style={{ color: 'white' }}>EtherScan</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    etherScan: {
        width: '100%',
        backgroundColor: '#f56042',
        padding: 10,
        marginTop: 10,
        borderRadius: 10,
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    pending: {
        marginBottom: 5,
        color: 'black',
        fontSize: 18
    },
    container: {
        margin: 10,
        padding: 10,
        borderColor: 'black',
        borderWidth: 0.5,
        borderRadius: 10,
        flexDirection: 'row'
    },
    round1: {
        backgroundColor: '#f56042',
        width: 26,
        height: 26,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center'
    }, round2: {
        backgroundColor: 'white',
        width: 20,
        height: 20,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center'
    }, round3: {
        backgroundColor: '#f56042',
        width: 15,
        height: 15,
        borderRadius: 100
    }
});

export default inject('store')(observer(Pending));