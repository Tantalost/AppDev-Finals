import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import Icons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';
import React, { useRef, useEffect } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  // Animated Circle Component
  const AnimatedCircle = ({ focused, children }: { focused: boolean; children: React.ReactNode }) => {
    const scale = useRef(new Animated.Value(focused ? 1 : 0)).current;

    useEffect(() => {
      Animated.spring(scale, {
        toValue: focused ? 1 : 0,
        useNativeDriver: true,
        friction: 5,
        tension: 150,
      }).start();
    }, [focused]);

    return (
      <Animated.View
        style={[
          styles.activeIconContainer,
          {
            transform: [{ scale }],
            opacity: scale.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
          },
        ]}
      >
        {children}
      </Animated.View>
    );
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FF4444',
        tabBarInactiveTintColor: '#999',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#E0E0E0',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconWrapper}>
              <AnimatedCircle focused={focused}>
                <Icon size={28} name="home" color="#fff" />
              </AnimatedCircle>
              {!focused && <Icon size={28} name="home" color="#999" />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="places"
        options={{
          title: 'Location',
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconWrapper}>
              <AnimatedCircle focused={focused}>
                <Icon size={28} name="map-marker" color="#fff" />
              </AnimatedCircle>
              {!focused && <Icon size={28} name="map-marker" color="#999" />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: 'Events',
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconWrapper}>
              <AnimatedCircle focused={focused}>
                <Icons size={28} name="event" color="#fff" />
              </AnimatedCircle>
              {!focused && <Icons size={28} name="event" color="#999" />}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: 'Info',
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconWrapper}>
              <AnimatedCircle focused={focused}>
                <Icon size={28} name="information" color="#fff" />
              </AnimatedCircle>
              {!focused && <Icon size={28} name="information" color="#999" />}
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const ICON_SIZE = 28;
const PADDING = 8;

const styles = StyleSheet.create({
  iconWrapper: {
    width: ICON_SIZE + PADDING * 2,
    height: ICON_SIZE + PADDING * 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeIconContainer: {
    backgroundColor: '#FF4444',
    width: ICON_SIZE + PADDING * 2,
    height: ICON_SIZE + PADDING * 2,
    borderRadius: (ICON_SIZE + PADDING * 2) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
