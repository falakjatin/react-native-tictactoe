import { StyleSheet } from "react-native"

import Utils from '../../utils'

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    text: {
        textAlign: 'center',
        color: '#000',
        fontSize: Utils.manageWidthPer(4.3),
        fontWeight: '500',
        marginVertical: 3,
    },
    input: {
        textAlign: 'center',
        padding: 5,
        width: '100%',
        borderBottomWidth: 1,
        fontSize: Utils.manageWidthPer(4.3),
    },
    error: {
        color: '#ff0000',
    },
    inputError: {
        borderBottomColor: '#ff0000',
        color: '#ff0000',
    },
})

export default styles