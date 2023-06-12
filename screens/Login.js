import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { save } from '../utils/storage';

const discovery = {
  authorizationEndpoint: 'https://github.com/login/oauth/authorize',
  tokenEndpoint: 'https://github.com/login/oauth/access_token',
  revocationEndpoint:
    'https://github.com/settings/connections/applications/97d9231faebbf300d8f7',
};
const CLIENT_ID = '97d9231faebbf300d8f7';
const SECRET_KEY = '71daae2f80942fdf1d47b66316a1e52f9c7a0e37';

export default function Login() {
  const navigation = useNavigation();
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: CLIENT_ID,
      scopes: ['identity'],
      redirectUri: makeRedirectUri({
        scheme: 'your.app',
      }),
    },
    discovery
  );

  const getAccessToken = async (code) => {
    const response = await fetch(
      'https://github.com/login/oauth/access_token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          client_id: CLIENT_ID,
          client_secret: SECRET_KEY,
          code: code,
        }),
      }
    );
    const data = await response.json();

    return data.access_token;
  };

  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
      const auth = async () => {
        const token = await getAccessToken(code);
        console.log(token);
        await save('token', token);
      };
      auth();
      navigation.replace('HomeScreen');
    }
  }, [response, navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/github.webp')}
        style={{ width: 200, height: 200 }}
      />

      <TouchableOpacity style={styles.button} onPress={() => promptAsync()}>
        <Text style={styles.text}>Sign in</Text>
      </TouchableOpacity>

      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#000',
    color: '#fff',
    borderRadius: 32,
    fontSize: 100,
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  text: {
    color: '#fff',
    fontSize: 22,
  },
});
