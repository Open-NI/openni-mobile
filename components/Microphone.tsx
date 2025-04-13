import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton } from '@react-native-material/core';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface MicrophoneProps {
  isListening: boolean;
  onPress: () => void;
}

const Microphone: React.FC<MicrophoneProps> = ({ isListening, onPress }) => {
  return (
    <View style={styles.container}>
      <IconButton
        icon={props => (
          <MaterialCommunityIcons
            name={isListening ? 'microphone' : 'microphone-off'}
            size={24}
            color={isListening ? '#2196F3' : '#757575'}
          />
        )}
        onPress={onPress}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f5f5f5',
  },
});

export default Microphone; 