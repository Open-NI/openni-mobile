import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Audio } from 'expo-av';
import Chat from '../components/Chat';
import Microphone from '../components/Microphone';
import Agent from '../components/Agent';
import IntroScreen from '../components/IntroScreen';
import AgentToggle from '../components/AgentToggle';
import AgentSelection from '../components/AgentSelection';

interface Message {
  text: string;
  isUser: boolean;
}

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [showAgentSelection, setShowAgentSelection] = useState(false);
  const [isMaleAgent, setIsMaleAgent] = useState(true);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const playAgentSound = async (isMale: boolean) => {
    try {
      console.log('Playing sound for agent:', isMale ? 'John' : 'Alice');
      const soundFile = isMale 
        ? require('../assets/audio/michael.wav')
        : require('../assets/audio/alice.wav');
      console.log('Sound file path:', soundFile);
      
      const { sound: newSound } = await Audio.Sound.createAsync(soundFile);
      setSound(newSound);
      await newSound.playAsync();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  const handleMicrophonePress = () => {
    setIsListening(!isListening);
    // TODO: Implement voice recording and processing
  };

  const handleAgentPress = () => {
    // TODO: Implement agent selection logic
  };

  const handleIntroComplete = () => {
    setShowIntro(false);
    setShowAgentSelection(true);
  };

  const handleAgentSelect = async (isMale: boolean) => {
    setShowAgentSelection(false);
    setIsMaleAgent(isMale);
    // Play the agent's sound
    await playAgentSound(isMale);
    // Add initial message from the selected agent
    const initialMessage = isMale 
      ? "My name is Dylan. I collect rare anime figurines. Do not touch my Asuka Langley Soryu I will attack!\nWhy did the chicken cross the road?"
      : "My name is Alice. I like nothing more than going home early on a Friday afternoon, logging into my 4Chan account and DDos-ing charity websites. I also like dogs and have a pet iguana.";
    setMessages([{ text: initialMessage, isUser: false }]);
  };

  const handleAgentToggle = async () => {
    setIsMaleAgent(!isMaleAgent);
    // Play the agent's sound
    await playAgentSound(!isMaleAgent);
    // Clear messages when switching agents
    setMessages([]);
    // Add initial message from the new agent
    const initialMessage = !isMaleAgent 
      ? "My name is Dylan. I collect rare anime figurines. Do not touch my Asuka Langley Soryu I will attack!\nWhy did the chicken cross the road?"
      : "My name is Alice. I like nothing more than going home early on a Friday afternoon, logging into my 4Chan account and DDos-ing charity websites. I also like dogs and have a pet iguana.";
    setMessages([{ text: initialMessage, isUser: false }]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {showIntro ? (
        <IntroScreen onAnimationComplete={handleIntroComplete} />
      ) : showAgentSelection ? (
        <AgentSelection onSelect={handleAgentSelect} />
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