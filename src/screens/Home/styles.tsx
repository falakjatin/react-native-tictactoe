import { StyleSheet } from 'react-native'
import Utils from '../../utils'

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        paddingHorizontal: Utils.manageWidthPer(4),
        justifyContent: 'center',
    },
})

export default styles