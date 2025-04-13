import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Text } from '@react-native-material/core';

interface AgentProps {
  name: string;
  status: string;
  onPress: () => void;
  isMale: boolean;
}

const Agent: React.FC<AgentProps> = ({ name, status, onPress, isMale }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.header}>
        <Image
          source={isMale ? require('../assets/images/dylan.png') : require('../assets/images/alice.png')}
          style={styles.image}
        />
        <View style={styles.nameContainer}>
          <Text variant="h6" style={styles.name}>
            {name}
          </Text>
          <Text variant="body2" style={styles.status}>
            {status}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 8,
    marginTop: 24,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  nameContainer: {
    marginRight: 8,
  },
  name: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  status: {
    color: '#B0B0B0',
    fontSize: 12,
  },
});

export default Agent; 