import { inject, observer } from 'mobx-react';
import React from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import Completed from './components/completed';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Pending from './components/pending';

const renderTxn = (item) => (
    item?.blockNumber == undefined ?
        <Pending item={item} />
        :
        <Completed item={item} />
);

const Transactions = ({ store }) => {
    return (
        <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
            <TouchableOpacity
                onPress={() => {
                    store.toggleTxnScreen();
                }}
            >
                <Ionicons name='md-caret-back' color={'#000000'} size={20} style={{ marginBottom: 10 }} />
            </TouchableOpacity>
            <FlatList
                extraData={[...store.txnState]}
                keyExtractor={(item) => item.transactionHash}
                data={store.txnState}
                renderItem={({ item }) => renderTxn(item)}
            />
        </View>
    );
}
export default inject('store')(observer(Transactions));