import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Audio } from 'expo-av';

interface IntroScreenProps {
  onAnimationComplete: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onAnimationComplete }) => {
  const [showNI, setShowNI] = useState(false);
  const slideAnim = new Animated.Value(450);
  const fadeAnim = new Animated.Value(1);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowNI(true);
      // Play intro sound
      playIntroSound();
    }, 300);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (showNI) {
      // Slide animation
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();

      // Fade out animation
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          onAnimationComplete();
        });
      }, 2300);
    }
  }, [showNI]);

  const playIntroSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../assets/audio/intro.mp3')
      );
      await sound.playAsync();
    } catch (error) {
      console.warn('Error playing intro sound:', error);
    }
  };

  return (
    <Animated.View 
      style={[
        styles.container,
        {
          opacity: fadeAnim,
        }
      ]}
    >
      <View style={styles.content}>
        <Text style={styles.text}>Open</Text>
        {showNI && (
          <Animated.View 
            style={[
              styles.niContainer,
              {
                transform: [{ translateX: slideAnim }],
              }
            ]}
          >
            <Text style={styles.niText}>NI</Text>
          </Animated.View>
        )}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 100,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  niContainer: {
    width: 140,
    height: 140,
    backgroundColor: '#F7971D',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  niText: {
    fontSize: 100,
    fontWeight: '600',
    color: '#000000',
  },
});

export default IntroScreen; 