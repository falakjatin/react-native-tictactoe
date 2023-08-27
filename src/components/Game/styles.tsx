import { StyleSheet } from "react-native"

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
        height: Utils.manageWidthPer(30),
        width: Utils.manageWidthPer(30),
        backgroundColor: '#f1f1f1',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
    },
    cubeContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icons: {
        height: '65%',
        width: '65%',
    },
})

export default styles