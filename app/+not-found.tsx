import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Stack, router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops! Página no encontrada' }} />
      <ThemedView style={styles.container}>
        <Text style={styles.emoji}>🔍</Text>
        <ThemedText type="title" style={styles.title}>
          Página no encontrada
        </ThemedText>
        <ThemedText style={styles.message}>
          Esta pantalla no existe.
        </ThemedText>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => router.push('/(tabs)/home')}
        >
          <ThemedText style={styles.buttonText}>
            Volver al inicio
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    opacity: 0.8,
  },
  button: {
    backgroundColor: '#0a7ea4',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});