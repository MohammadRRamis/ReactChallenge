import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import RepoCard from '../components/RepoCard';
import { SvgUri } from 'react-native-svg';
import { getValue } from '../utils/storage';
import { getGitHubUser } from '../services/github_api';
import { getRepos } from '../services/github_api';

export default function HomeScreen() {
  const [name, setName] = useState('');
  const [repos, setRepos] = useState([]);
  const [contributions, setContributions] = useState('');

  useEffect(() => {
    async function fetchData() {
      const token = await getValue('token');
      try {
        const userResponse = await getGitHubUser(token);
        const reposResponse = await getRepos(token);

        setName(userResponse.name);
        setContributions('https://ghchart.rshah.org/' + userResponse.login);
        setRepos(reposResponse);
      } catch (error) {
        console.error(error);
      }
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
