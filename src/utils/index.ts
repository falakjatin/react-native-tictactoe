import { Dimensions } from "react-native";

import DeviceInfo from "react-native-device-info";

const { height, width } = Dimensions.get('screen')

const isTab = () => DeviceInfo.isTablet()

const decreaseSize = (width: number) => {
    if (isTab()) {
        return width * 0.7;
    } else {
        return width;
    }
}

const increaseSize = (size: number) => {
    if (isTab()) {
        return size * 1.5
    } else {
        return size;
    }
}

const manageWidthPer = (size: number) => {
    if (isTab()) {
        return ((width * size) / 100) * 0.5
    } else {
        return (width * size) / 100;
    }
}

const manageHeightPer = (size: number) => {
    if (isTab()) {
        return ((height * size) / 100) * 0.7
    } else {
        return (height * size) / 100;
    }
}

export default {
    isTab,
    decreaseSize,
    increaseSize,
    manageWidthPer,
    manageHeightPer,
}
