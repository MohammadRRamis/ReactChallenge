import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import RepoCard from '../components/RepoCard';
import { SvgUri } from 'react-native-svg';
import { getValue } from '../utils/storage';
import axios from 'axios';

export default function HomeScreen() {
  const [name, setName] = useState('');
  const [repos, setRepos] = useState([]);
  const [contributions, setContributions] = useState('');

  useEffect(() => {
    async function fetchData() {
      const token = await getValue('token');
      try {
        const userResponse = await axios.get(
          `https://getuser-v2q6nspraa-uc.a.run.app`,
          {
            params: {
              token: token,
            },
          }
        );
        const reposResponse = await axios.get(
          `https://getrepos-v2q6nspraa-uc.a.run.app`,
          {
            params: {
              token: token,
            },
          }
        );
        setName(userResponse.data.name);
        setContributions(
          'https://ghchart.rshah.org/' + userResponse.data.login
        );
        setRepos(reposResponse.data);
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
