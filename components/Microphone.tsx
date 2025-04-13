import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface MicrophoneProps {
  isListening: boolean;
  onPress: () => void;
  disabled?: boolean;
}

export default function Microphone({ isListening, onPress, disabled = false }: MicrophoneProps) {
  return (
    <TouchableOpacity
      style={[
        styles.microphoneButton,
        isListening && styles.listening,
        disabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Ionicons
        name={isListening ? 'mic' : 'mic-outline'}
        size={32}
        color={disabled ? '#666' : '#fff'}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  microphoneButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listening: {
    backgroundColor: '#FF3B30',
  },
  disabled: {
    backgroundColor: '#999',
  },
}); 