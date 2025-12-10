import { useThemeColor } from '@/hooks/use-theme-color';
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

interface LoadingProps {
  message?: string;
  size?: 'small' | 'large';
  fullScreen?: boolean;
}

export function Loading({ message, size = 'large', fullScreen = true }: LoadingProps) {
  const tintColor = useThemeColor({}, 'tint');

  if (fullScreen) {
    return (
      <ThemedView style={styles.fullScreenContainer}>
        <ActivityIndicator size={size} color={tintColor} />
        {message && (
          <ThemedText style={styles.message}>{message}</ThemedText>
        )}
      </ThemedView>
    );
  }

  return (
    <View style={styles.inlineContainer}>
      <ActivityIndicator size={size} color={tintColor} />
      {message && (
        <ThemedText style={styles.message}>{message}</ThemedText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inlineContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  message: {
    marginTop: 12,
    fontSize: 14,
    opacity: 0.8,
  },
});
