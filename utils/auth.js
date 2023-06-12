const getAccessToken = async (code) => {
  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      client_id: '97d9231faebbf300d8f7',
      client_secret: '71daae2f80942fdf1d47b66316a1e52f9c7a0e37',
      code: code,
    }),
  });
  const data = await response.json();

  return data.access_token;
};

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

async function getToken() {
  return await SecureStore.getItemAsync('token');
}
