// Componente de ejemplo para demostrar el uso del ErrorBoundary y Loading
import { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Loading } from './loading';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

export function ErrorDemo() {
  const [isLoading, setIsLoading] = useState(false);

  const triggerError = () => {
    throw new Error('Error de prueba - ErrorBoundary funcionando correctamente');
  };

  const simulateLoading = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  if (isLoading) {
    return <Loading message="Cargando datos..." />;
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Demo de manejo de errores</ThemedText>
      
      <TouchableOpacity style={styles.button} onPress={simulateLoading}>
        <ThemedText style={styles.buttonText}>Simular carga</ThemedText>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.button, styles.errorButton]} 
        onPress={triggerError}
      >
        <ThemedText style={styles.buttonText}>Provocar error</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#0a7ea4',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 12,
    minWidth: 200,
    alignItems: 'center',
  },
  errorButton: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
