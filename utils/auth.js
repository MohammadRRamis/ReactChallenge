import * as SecureStore from 'expo-secure-store';

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

async function getToken() {
  return await SecureStore.getItemAsync('token');
}
