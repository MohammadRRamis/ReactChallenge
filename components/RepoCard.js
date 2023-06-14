import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from 'react-native';
import React from 'react';
import MaterialIcon from '@expo/vector-icons/MaterialIcons';

export default function RepoCard({ name, owner, repoUrl }) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => Linking.openURL(repoUrl)}
    >
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.title}>{name}</Text>
        <View style={styles.row}>
          <MaterialIcon name='account-circle' size={24} color='#666' />
          <Text style={styles.text}>{owner}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
});
