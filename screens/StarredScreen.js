import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import RepoCard from '../components/RepoCard';
import { getValue } from '../utils/storage';
import { getStarredRepos } from '../services/github_api';

export default function StarredScreen() {
  const [starredRepos, setStarredRepos] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const token = await getValue('token');
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
