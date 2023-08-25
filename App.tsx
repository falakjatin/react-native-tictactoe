import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, AppState, Platform, Alert } from 'react-native';
import UdpSocket from 'react-native-udp';
import { NetworkInfo } from 'react-native-network-info';

const socket = UdpSocket.createSocket({ type: 'udp4', debug: true, reusePort: true });

const App = () => {

  const [isServer, setIsServer] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('');
  const [ipAddress, setIpAddress] = useState('');
  const [message, setMessage] = useState('');
  const [ipServer, setIpServer] = useState('192.168.0.30');

  useEffect(() => {
    const fetchIpAddress = async () => {
      const ip = await NetworkInfo.getIPV4Address();
      if (ip)
        setIpAddress(ip);
      console.log(Platform.OS + ' ip: ' + ip)
    };

    fetchIpAddress();

    return () => {
      socket.close(() => console.log(Platform.OS + ' socket closed'));
    };
  }, [isServer]);

  const sendMessage = () => {
    if (isServer) return;

    socket.send('Hello from the client!', undefined, undefined, 8888, ipServer, (error) => {
      if (error) {
        console.log('Error sending message:', error);
      } else {
        console.log('Message sent successfully');
      }
    });
    socket.once('message', async (message, remoteInfo) => {
      setMessage(message.toString())
    });
  };

  const triggerServer = () => {
    if (!isServer) {
      socket.on('message', (data, rinfo) => {
        setMessage(data.toString())
        Alert.alert('triggered')
        socket.send('Hello from the server!', undefined, undefined, rinfo?.port, rinfo?.address, (error) => {
          if (error) {
            console.log('Error sending message:', error);
          } else {
            console.log('Message sent successfully');
          }
        });
        console.log('Message received:', data.toString());
      });

      socket.on('listening', () => {
        console.log('Server listening on port:', socket.address().port);
        setConnectionStatus(`Server listening on port ${socket.address().port}`);
      });

      socket.bind(8888);
    } else {
      socket.close(() => console.log('--- server closed ---'))
    }
    setIsServer(!isServer)
  }

  const triggerClient = () => {
    socket.bind(8887)
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>{connectionStatus}</Text>
      <Button
        title={isServer ? 'stop server' : 'start server'}
        onPress={triggerServer}
      />
      <Button title="Look for Sender" onPress={triggerClient} disabled={isServer} />
      <Button title="Send Message" onPress={sendMessage} disabled={isServer} />
      <TextInput
        style={{ borderWidth: 1 }}
        onChangeText={setIpServer}
        value={ipServer}
      />
      <Text>IP adress: {ipAddress}</Text>
      <Text>Message received: {message}</Text>
    </View>
  );
}

export default App
