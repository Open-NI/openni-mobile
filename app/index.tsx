import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Chat from '../components/Chat';
import Microphone from '../components/Microphone';
import Agent from '../components/Agent';
import IntroScreen from '../components/IntroScreen';

interface Message {
  text: string;
  isUser: boolean;
}

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  const handleMicrophonePress = () => {
    setIsListening(!isListening);
    // TODO: Implement voice recording and processing
  };

  const handleAgentPress = () => {
    // TODO: Implement agent selection logic
  };

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {showIntro ? (
        <IntroScreen onAnimationComplete={handleIntroComplete} />
      ) : (
        <View style={styles.content}>
          <Chat messages={messages} />
          <View style={styles.controls}>
            <Agent
              name="Assistant"
              status="Available"
              onPress={handleAgentPress}
            />
            <Microphone
              isListening={isListening}
              onPress={handleMicrophonePress}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  content: {
    flex: 1,
    padding: 16,
    backgroundColor: '#000000',
  },
  controls: {
    marginTop: 16,
    alignItems: 'center',
  },
}); 