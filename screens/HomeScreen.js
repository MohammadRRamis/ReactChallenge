import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import RepoCard from '../components/RepoCard';
import { SvgUri } from 'react-native-svg';
import { getValue } from '../utils/storage';
import { getGitHubUser } from '../services/github_api';
import { getRepos } from '../services/github_api';

export default function HomeScreen() {
  const [avatar, setAvatar] = useState('');
  const [name, setName] = useState('');
  const [repos, setRepos] = useState([]);
  const [contributions, setContributions] = useState('');

  useEffect(() => {
    async function fetchData() {
      const token = await getValue('token');
      try {
        const userResponse = await getGitHubUser(token);
        const reposResponse = await getRepos(token);

        setAvatar(userResponse.avatar_url);
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
    <ScrollView>
      <View style={styles.container}>
        <View
          style={{
            width: 200,
            height: 200,
            borderRadius: 200 / 2,
            overflow: 'hidden',
            borderWidth: 3,
            borderColor: 'transparent',
          }}
        >
          <Image source={{ uri: avatar }} style={{ width: 200, height: 200 }} />
        </View>
        <Text style={styles.title}>{name}</Text>
        <View style={{ marginBottom: 32 }}>
          <SvgUri width='350' uri={contributions} />
        </View>

        {repos.map((repo) => (
          <RepoCard
            key={repo.id}
            name={repo.name}
            s
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
