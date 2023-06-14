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
      try {
        const starredRepos = await getStarredRepos(token);
        setStarredRepos(starredRepos);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Starred Repositories</Text>
        {starredRepos.map((repo) => (
          <RepoCard
            key={repo.id}
            name={repo.name}
            owner={repo.owner.login}
            repoUrl={repo.html_url}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
  },
});
