import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuth } from '@/contexts/auth-context';
import { StyleSheet } from 'react-native';

export default function Home() {
  const { user } = useAuth();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        ¡Bienvenido! 👋
      </ThemedText>
      <ThemedText style={styles.text}>
        {user?.name || user?.email}
      </ThemedText>
      <ThemedText style={styles.subtitle}>
        Has iniciado sesión correctamente
      </ThemedText>
      
      <ThemedText style={styles.infoText}>
        💡 Explora las pestañas para ver más contenido o ve a tu perfil para gestionar tu cuenta.
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    fontSize: 18,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 32,
  },
  infoText: {
    fontSize: 14,
    opacity: 0.6,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});