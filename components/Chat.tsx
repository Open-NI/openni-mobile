import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text } from '@react-native-material/core';

interface Message {
  text: string;
  isUser: boolean;
}

interface ChatProps {
  messages: Message[];
}

const Chat: React.FC<ChatProps> = ({ messages }) => {
  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {messages.map((message, index) => (
        <View
          key={index}
          style={[
            styles.messageContainer,
            message.isUser ? styles.userMessage : styles.agentMessage,
          ]}
        >
          <Text style={[
            styles.messageText,
            message.isUser ? styles.userMessageText : styles.agentMessageText
          ]}>
            {message.text}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60, // Space for the agent header
  },
  contentContainer: {
    padding: 16,
  },
  messageContainer: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 20,
    marginVertical: 4,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#0084FF',
    borderTopRightRadius: 4,
  },
  agentMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderTopLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
  },
  userMessageText: {
    color: '#FFFFFF',
  },
  agentMessageText: {
    color: '#FFFFFF',
  },
});

export default Chat; 