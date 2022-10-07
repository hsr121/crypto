import { inject, observer } from 'mobx-react';
import React from 'react';
import { View, StyleSheet, Modal, ActivityIndicator } from 'react-native';


const Loader = ({ visible, color = "#001841", store }) => {
    return (
        store.curTxnStatus == 'running' ?
            (<View style={styles.container}>
                <Modal
                    transparent={true}
                    visible={visible}>
                    <ActivityIndicator size="large" color={color} style={styles.loader} />
                </Modal>
            </View>)
            :
            <View></View>
    );
};
const styles = StyleSheet.create({
    loader: {
        backgroundColor: 'transparent',
        flex: 1
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }
});
export default inject('store')(observer(Loader));
