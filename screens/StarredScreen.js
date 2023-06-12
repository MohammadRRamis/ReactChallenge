import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import RepoCard from '../components/RepoCard';

async function getToken() {
  return await SecureStore.getItemAsync('token');
}

const getStarredRepos = async (accessToken) => {
  const response = await fetch('https://api.github.com/user/starred', {
    headers: {
      Authorization: `token ${accessToken}`,
    },
  });
  const data = await response.json();
  return data;
};

export default function StarredScreen() {
  const [starredRepos, setStarredRepos] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const token = await getToken();
      const starredRepos = await getStarredRepos(token);
      setStarredRepos(starredRepos);
    }
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Starred Repos:</Text>
      <ScrollView style={styles}>
        {starredRepos.map((repo) => (
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
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
});
