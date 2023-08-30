import React from 'react'
import {
    Image,
    NativeSyntheticEvent,
    NativeTouchEvent,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native'

import Utils from '../../utils'

const backIcon = require('../../assets/images/back.png')

const NavigationBar: React.FC<NavigationBar> = ({
    title,
    onRightSidePress,
}) => {
    return (
        <View style={styles.container}>
            {onRightSidePress ? <TouchableOpacity
                style={styles.iconContainer}
                activeOpacity={0.7}
                onPress={onRightSidePress}>
                <Image style={styles.rightIcon} source={backIcon} />
            </TouchableOpacity> : <View />}
            <Text style={styles.title}>{title}</Text>
            <View />
        </View>
    )
}

export default NavigationBar

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        paddingHorizontal: Utils.manageWidthPer(4),
        backgroundColor: '#fff',
        paddingVertical: Utils.manageWidthPer(3),
    },
    rightIcon: {
        height: Utils.manageWidthPer(4.6),
        width: Utils.manageWidthPer(4.6),
    },
    iconContainer: {
        height: Utils.manageWidthPer(5),
        width: Utils.manageWidthPer(5),
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: Utils.manageWidthPer(4),
        fontWeight: '500',
    },
})

interface NavigationBar {
    title: string,
    onRightSidePress?: ((event: NativeSyntheticEvent<NativeTouchEvent>) => void) | undefined;
}
