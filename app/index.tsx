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
    // Add initial message from the selected agent
    const initialMessage = "Good morning, John. Had a good night's sleep? Should we review your code today? Or would you like to continue pretending to be a girl online?";
    setMessages([{ text: initialMessage, isUser: false }]);
  };

  const handleAgentToggle = () => {
    setIsMaleAgent(!isMaleAgent);
    // Clear messages when switching agents
    setMessages([]);
    // Add initial message from the new agent
    const initialMessage = "Good morning, John. Had a good night's sleep? Should we review your code today? Or would you like to continue pretending to be a girl online?";
    setMessages([{ text: initialMessage, isUser: false }]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {showIntro ? (
        <IntroScreen onAnimationComplete={handleIntroComplete} />
      ) : (
        <View style={styles.content}>
          <AgentToggle isMale={isMaleAgent} onToggle={handleAgentToggle} />
          <Agent
            name={isMaleAgent ? "Dylan" : "Alice"}
            status="Available"
            onPress={handleAgentPress}
            isMale={isMaleAgent}
          />
          <Chat messages={messages} />
          <View style={styles.controls}>
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
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
}); 