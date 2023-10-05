import { StyleSheet } from "react-native"

import Utils from '../../utils'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: Utils.manageWidthPer(4),
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
    resultContainer: {
        width: Utils.manageWidthPer(90),
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
    },
    scoreContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: Utils.manageWidthPer(3),
    },
    scoreIcon: {
        height: Utils.manageWidthPer(3),
        width: Utils.manageWidthPer(3),
    },
    scoreWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scoreText: {
        fontSize: Utils.manageWidthPer(4),
        fontWeight: '500',
        marginLeft: Utils.manageWidthPer(2),
    },
    congratText: {
        fontSize: Utils.manageWidthPer(6),
        fontWeight: '600',
        textAlign: 'center',
    },
    winDescText: {
        fontSize: Utils.manageWidthPer(4),
        fontWeight: '400',
        textAlign: 'center',
    },
    winText: {
        marginVertical: Utils.manageWidthPer(3),
    },
})

export default styles