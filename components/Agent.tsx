import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Surface } from '@react-native-material/core';

interface AgentProps {
  name: string;
  status: string;
  onPress: () => void;
}

const Agent: React.FC<AgentProps> = ({ name, status, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Surface
        elevation={2}
        style={styles.container}
      >
        <View style={styles.content}>
          <Text variant="h6" style={styles.name}>
            {name}
          </Text>
          <Text variant="body2" style={styles.status}>
            {status}
          </Text>
        </View>
      </Surface>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  content: {
    flexDirection: 'column',
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  status: {
    color: '#757575',
  },
});

export default Agent; 