import { StyleSheet } from 'react-native'
import Utils from '../utils'

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    multiplayerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: Utils.manageWidthPer(4),
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: Utils.manageWidthPer(4),
    },
})

export default styles