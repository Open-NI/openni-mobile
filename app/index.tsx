import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Chat from '../components/Chat';
import Microphone from '../components/Microphone';
import Agent from '../components/Agent';
import IntroScreen from '../components/IntroScreen';
import AgentToggle from '../components/AgentToggle';

interface Message {
  text: string;
  isUser: boolean;
}

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [isMaleAgent, setIsMaleAgent] = useState(true);

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

  const handleAgentToggle = () => {
    setIsMaleAgent(!isMaleAgent);
  };

  return (
    <SafeAreaView style={styles.container}>
      {showIntro ? (
        <IntroScreen onAnimationComplete={handleIntroComplete} />
      ) : (
        <View style={styles.content}>
          <AgentToggle isMale={isMaleAgent} onToggle={handleAgentToggle} />
          <Chat messages={messages} />
          <View style={styles.controls}>
            <Agent
              name={isMaleAgent ? "Michael" : "Alice"}
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