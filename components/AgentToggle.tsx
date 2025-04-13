import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface AgentToggleProps {
  isMale: boolean;
  onToggle: () => void;
}

const AgentToggle: React.FC<AgentToggleProps> = ({ isMale, onToggle }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onToggle} style={styles.toggleButton}>
        <MaterialCommunityIcons
          name={isMale ? 'gender-male' : 'gender-female'}
          size={24}
          color="#FFFFFF"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  toggleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default AgentToggle; 