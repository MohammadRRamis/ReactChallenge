import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import RepoCard from '../components/RepoCard';
import { SvgUri } from 'react-native-svg';

async function getToken() {
  return await SecureStore.getItemAsync('token');
}

const getGitHubUser = async (accessToken) => {
  const response = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `token ${accessToken}`,
    },
  });
  const data = await response.json();
  return data;
};

const getRepos = async (accessToken) => {
  const response = await fetch('https://api.github.com/user/repos', {
    headers: {
      Authorization: `token ${accessToken}`,
    },
  });
  const data = await response.json();
  return data;
};

export default function HomeScreen() {
  const [name, setName] = useState('');
  const [repos, setRepos] = useState([]);
  const [contributions, setContributions] = useState('');

  useEffect(() => {
    async function fetchData() {
      const token = await getToken();
      const user = await getGitHubUser(token);
      const repos = await getRepos(token);
      setName(user.name);
      setRepos(repos);
      setContributions('https://ghchart.rshah.org/' + user.login);
    }
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to GitHub Explorer</Text>
      <Text style={styles.subtitle}>GitHub username: {name}</Text>
      <View>
        <SvgUri width='350' uri={contributions} />
      </View>
      <Text style={styles.subtitle}>Repos:</Text>
      <ScrollView style={styles}>
        {repos.map((repo) => (
          <RepoCard key={repo.id} name={repo.name} owner={repo.owner.login} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
});
