import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import { StyleSheet } from 'react-native';

export default function Index() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.text}>Home screen</ThemedText>
      <Link href="/about">
        <ThemedText style={styles.button}>Go to About screen</ThemedText>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
  },
  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    marginTop: 16,
  },
});