import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Animated } from 'react-native';
import { Text } from '@react-native-material/core';

interface AgentSelectionProps {
  onSelect: (isMale: boolean) => void;
}

const AgentSelection: React.FC<AgentSelectionProps> = ({ onSelect }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.agentCard}
        onPress={() => onSelect(false)}
      >
        <Image
          source={require('../assets/images/alice.png')}
          style={styles.agentImage}
        />
        <View style={styles.agentInfo}>
          <Text style={styles.agentName}>Alice</Text>
          <Text style={styles.agentStatus}>Available</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.agentCard}
        onPress={() => onSelect(true)}
      >
        <Image
          source={require('../assets/images/dylan.png')}
          style={styles.agentImage}
        />
        <View style={styles.agentInfo}>
          <Text style={styles.agentName}>Dylan</Text>
          <Text style={styles.agentStatus}>Available</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  agentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
    width: '100%',
    maxWidth: 400,
  },
  agentImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  agentInfo: {
    flex: 1,
  },
  agentName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  agentStatus: {
    color: '#B0B0B0',
    fontSize: 14,
  },
});

export default AgentSelection; 