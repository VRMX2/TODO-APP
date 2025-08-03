import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import useTheme from '@/hooks/useTheme';

const TabsLayout = () => {
  const { colors } = useTheme(); 
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
		    tabBarActiveTintColor: colors.primary,
		    tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
			backgroundColor: colors.surface,
          borderTopWidth: 0,
			elevation: 10,
          borderTopColor: colors.border,
          height: 65,
          paddingBottom: 10,
        },
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: '600',
          marginBottom: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Todos',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-circle-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
		}}
		/>
    </Tabs>
  );
};

export default TabsLayout;
