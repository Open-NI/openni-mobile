import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Surface } from '@react-native-material/core';

interface Message {
  text: string;
  isUser: boolean;
}

interface ChatProps {
  messages: Message[];
}

const Chat: React.FC<ChatProps> = ({ messages }) => {
  return (
    <ScrollView style={styles.container}>
      {messages.map((message, index) => (
        <Surface
          key={index}
          elevation={2}
          style={[
            styles.messageContainer,
            message.isUser ? styles.userMessage : styles.agentMessage,
          ]}
        >
          <Text style={styles.messageText}>{message.text}</Text>
        </Surface>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  messageContainer: {
    padding: 12,
    marginVertical: 4,
    borderRadius: 8,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#2196F3',
  },
  agentMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f5f5f5',
  },
  messageText: {
    color: '#000',
  },
});

export default Chat; 