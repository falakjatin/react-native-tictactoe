import React, { useEffect, useState } from 'react'

import { NetworkInfo } from 'react-native-network-info'
import Game from '../../components/Game'

const MultiPlayerSingleDeviceScreen: React.FC<MultiPlayerSingleDeviceScreen> = ({
  hostIp
}) => {

  const [clientIp, setClientIp] = useState('')

  useEffect(() => {
    fetchIpAddress()
  }, [])

  const fetchIpAddress = async () => {
    const ip = await NetworkInfo.getIPV4Address();
    if (ip)
      setClientIp(ip);
  }

  return (
    clientIp && <Game clientIp={clientIp} hostIp={hostIp || clientIp} />
  )
}

export default MultiPlayerSingleDeviceScreen

interface MultiPlayerSingleDeviceScreen {
  hostIp: string
}