import { Platform, StyleSheet } from "react-native"

import Utils from '../../utils'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#000',
        fontSize: 16,
    },
    cubes: {
        height:  Utils.manageWidthPer(30),
        width: Utils.manageWidthPer(30),
        backgroundColor: '#f1f1f1',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
    },
    cubeContainer: {
        width: Utils.manageWidthPer(90),
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icons: {
        height: '65%',
        width: '65%',
    },
    button: {
        backgroundColor: '#1d4ed8',
        borderRadius: 6,
        width: '100%',
        alignItems: 'center',
        paddingVertical: Utils.manageWidthPer(2.8),
        marginVertical: Utils.manageWidthPer(2),
    },
    btnText: {
        textTransform: 'uppercase',
        color: '#fff',
        fontSize: Utils.manageWidthPer(4),
        fontWeight: '500',
    },
    resultContainer: {
        width: Utils.manageWidthPer(90),
    }
})

export default styles