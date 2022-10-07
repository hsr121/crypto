import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#05405a',
        alignItems: 'center',
        padding: 50,
    },
    input: {
        width: '100%',
        height: 55,
        padding: 15,
        paddingLeft: 20,
        backgroundColor: '#465880',
        marginBottom: 20,
        borderRadius: 30,
    },
    cryptoExpress: {
        marginBottom: '12%',
        fontSize: 26,
        color: '#f75c5e',
        fontWeight: 'bold'
    },
    submit: {
        width: '100%',
        backgroundColor: '#f85c5e',
        height: 55,
        borderRadius: 30,
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    subMidContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    balance: {
        color: 'white',
        alignSelf: 'flex-end'
    },
    transaction: {
        backgroundColor: 'white',
        width: 50,
        height: 50,
        borderRadius: 300,
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center'
    }
});