import { inject, observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ActivityIndicator, ToastAndroid, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Web3 from 'web3';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import Transaction from '../transactions/transaction';
import Loader from '../Loader';


function validValue(str) {
    return /^[0-9 | .]+$/.test(str);
}

const Home = ({ store }) => {
    useEffect(() => {
        store.getBalance();
    }, []);

    const handleSubmit = () => {
        store.processTxn();
        if (store.value.trim() == '') {
            alert("Enter valid value");
            return;
        }
        if (store.rAddress.trim() == '' || !Web3.utils.isAddress(store.rAddress.trim())) {
            alert("Enter valid receiver's address");
            return;
        }
    }

    return (
        store.isTxnScreen ? <Transaction /> :
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={() => {
                    Keyboard.dismiss();
                }}>
                    <View style={{width:'100%', height:'100%'}}>
                        <Loader />
                        <View style={{ width: '100%' }}>
                            {store.isLoadingBalance ?
                                <ActivityIndicator style={styles.balance} color={"white"} size={'small'} />
                                :
                                <Text style={styles.balance}>{(Math.round(parseFloat(store.balance) * 100000000) / 100000000) + " ETH"}</Text>
                            }
                        </View>
                        <View style={styles.subMidContainer}>
                            <Text style={styles.cryptoExpress}>CryptoExpress</Text>
                            <TextInput
                                placeholder="0.000564"
                                value={store.value}
                                keyboardType={'numeric'}
                                onChangeText={(text) => {
                                    if (text == '' || validValue(text)) {
                                        store.setValue(text);
                                    } else {
                                        ToastAndroid.show("Only numeric values allow", ToastAndroid.SHORT);
                                    }
                                }}
                                style={styles.input} />
                            <TextInput placeholder="Receiver's Address..."
                                value={store.rAddress}
                                onChangeText={(text) => {
                                    store.setRAdd(text);
                                }}
                                style={styles.input} />
                            <TouchableOpacity
                                onPress={handleSubmit}
                                style={styles.submit}>
                                <Text>
                                    Submit
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            onPress={() => {
                                store.toggleTxnScreen();
                            }}
                            style={styles.transaction}>
                            <MaterialIcons name='compare-arrows' color={'black'} size={30} />
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            </View>
    );
};

export default inject('store')(observer(Home));
