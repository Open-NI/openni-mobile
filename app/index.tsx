import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
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
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [lastId, setLastId] = useState<string | null>(null);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    const interval = setInterval(() => {
      getActionStatus();
    }, 350);
    return () => clearInterval(interval);
  }, [lastId]);

  async function getActionStatus() {
    if (lastId) {
      try {
        const response = await fetch(`http://192.168.0.100:8000/api/v1/action-runner/status/${lastId}`);
        const result = await response.json();
        console.log('Action status result:', result);
        if (result.status === "completed") {
          setLastId(null);
          handleSendMessage(result.result, false);
          if (result.tts_audio_base64) {
            console.log('Playing audio from URL:', result.tts_audio_base64);
            await playVoice(result.tts_audio_base64);
          }
        } else if (result.status === "failed") {
          setLastId(null);
          handleSendMessage("I'm sorry, I didn't understand that. Please try again.", false);
        }
      } catch (error) {
        console.error('Error checking action status:', error);
      }
    }
  }

  const playVoice = async (audioUrl: string) => {
    try {
      console.log('Attempting to play audio from URL:', audioUrl);
      
      // Configure audio to use main speaker
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
        allowsRecordingIOS: false,
        interruptionModeIOS: 1, // Audio.INTERRUPTION_MODE_IOS_DUCK_OTHERS
        interruptionModeAndroid: 1, // Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS
      });

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: `http://192.168.0.100:8000/api/v1/audio/${audioUrl}` },
        { shouldPlay: true }
      );

      // Clean up previous sound if it exists
      if (sound) {
        await sound.unloadAsync();
      }

      setSound(newSound);
      console.log('Starting audio playback');
      await newSound.playAsync();
      console.log('Audio playback started');

      // Clean up after playing
      newSound.setOnPlaybackStatusUpdate(async (status) => {
        console.log('Playback status:', status);
        if (status.isLoaded && !status.isPlaying && !status.isBuffering) {
          console.log('Playback finished, unloading sound');
          await newSound.unloadAsync();
        }
      });
    } catch (error) {
      console.error('Error playing voice:', error);
    }
  };

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

  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      setIsListening(true);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = async () => {
    if (!recording) return;

    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      setRecording(null);
      setIsListening(false);

      if (uri) {
        await sendToAPI(uri);
      }
    } catch (error) {
      console.error('Error stopping recording:', error);
    }
  };

  const sendToAPI = async (audioUri: string) => {
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: audioUri,
        type: 'audio/wav',
        name: 'recording.wav',
      } as any);

      // First API call: Speech to Text
      const response = await fetch('http://192.168.0.100:8000/api/v1/human/speech-to-text?language=en', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Speech to Text API failed with status: ${response.status}`);
      }

      const result = await response.json();
      if (result.text) {
        handleSendMessage(result.text, true);
        const data = {
          user: 'Micka',
          request_message: result.text,
          voice: isMaleAgent ? 'am_michael' : 'af_heart',
        };

        // Second API call: Action Runner
        const response2 = await fetch('http://192.168.0.100:8000/api/v1/action-runner/begin', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!response2.ok) {
          throw new Error(`Action Runner API failed with status: ${response2.status}`);
        }

        const result2 = await response2.json();
        setLastId(result2.action_id);
      }
    } catch (error) {
      console.error('Error sending voice to API:', error);
      handleSendMessage("Sorry, I couldn't process your request. Please try again.", true);
    }
  };

  const handleSendMessage = (message: string, isUser: boolean) => {
    setMessages(prevMessages => [...prevMessages, { text: message, isUser }]);
  };

  const handleMicrophonePress = () => {
    if (isListening) {
      stopRecording();
    } else {
      startRecording();
    }
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