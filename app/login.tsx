import { Loading } from '@/components/loading';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Colors, Spacing } from '@/constants/theme';
import { useAuth } from '@/contexts/auth-context';
import { useThemeColor } from '@/hooks/use-theme-color';
import { validateLoginForm, validateRegisterForm, validators } from '@/utils/validators';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; name?: string }>({});
  const [passwordStrength, setPasswordStrength] = useState<'weak' | 'medium' | 'strong' | undefined>();
  const { login, register } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const tintColor = useThemeColor({}, 'tint');
  const borderColor = useThemeColor({ light: '#ccc', dark: '#444' }, 'text');

  const handleEmailChange = (text: string) => {
    setEmail(text);
    // Limpiar error al escribir
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: undefined }));
    }
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    // Limpiar error al escribir
    if (errors.password) {
      setErrors(prev => ({ ...prev, password: undefined }));
    }
    
    // Validar fortaleza en tiempo real
    if (text.length > 0) {
      const validation = validators.password(text);
      setPasswordStrength(validation.strength);
    } else {
      setPasswordStrength(undefined);
    }
  };

  const handleNameChange = (text: string) => {
    setName(text);
    // Limpiar error al escribir
    if (errors.name) {
      setErrors(prev => ({ ...prev, name: undefined }));
    }
  };

  const handleSubmit = async () => {
    // Limpiar errores previos
    setErrors({});

    // Validar formulario
    let validation;
    if (isRegisterMode) {
      validation = validateRegisterForm(email, password, name);
      if (!validation.isValid) {
        setErrors(validation.errors);
        return;
      }
    } else {
      validation = validateLoginForm(email, password);
      if (!validation.isValid) {
        setErrors(validation.errors);
        return;
      }
    }

    try {
      setIsSubmitting(true);
      
      // Sanitizar inputs antes de enviar
      const sanitizedEmail = validators.sanitize(email.toLowerCase());
      const sanitizedName = validators.sanitize(name);
      
      if (isRegisterMode) {
        await register(sanitizedEmail, password, sanitizedName);
        Alert.alert('Éxito', 'Cuenta creada correctamente');
      } else {
        await login(sanitizedEmail, password);
      }
      // Después del login exitoso, navegar a tabs
      router.push('/(tabs)/home');
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'Ha ocurrido un error');
      // No navegar si hay error
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleMode = () => {
    setIsRegisterMode(!isRegisterMode);
    setName('');
    setErrors({});
    setPasswordStrength(undefined);
  };

  if (isSubmitting) {
    return <Loading message="Iniciando sesión..." />;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor }]}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <ThemedView style={styles.content}>
          <ThemedText type="title" style={styles.title}>
            {isRegisterMode ? 'Crear cuenta' : 'Iniciar sesión'}
          </ThemedText>
          
          <ThemedText style={styles.subtitle}>
            {isRegisterMode 
              ? 'Completa los datos para registrarte' 
              : 'Ingresa tus credenciales'}
          </ThemedText>

          {isRegisterMode && (
            <Input
              label="Nombre completo"
              placeholder="Tu nombre"
              value={name}
              onChangeText={handleNameChange}
              error={errors.name}
              autoCapitalize="words"
              leftIcon={<Ionicons name="person-outline" size={20} color={textColor} />}
            />
          )}

          <Input
            label="Email"
            placeholder="tu@email.com"
            value={email}
            onChangeText={handleEmailChange}
            error={errors.email}
            autoCapitalize="none"
            keyboardType="email-address"
            autoComplete="email"
            leftIcon={<Ionicons name="mail-outline" size={20} color={textColor} />}
          />

          <Input
            label="Contraseña"
            placeholder="••••••••"
            value={password}
            onChangeText={handlePasswordChange}
            error={errors.password}
            secureTextEntry
            autoCapitalize="none"
            autoComplete="password"
            leftIcon={<Ionicons name="lock-closed-outline" size={20} color={textColor} />}
            helperText={isRegisterMode ? "Mínimo 8 caracteres con mayúsculas, minúsculas y números" : undefined}
          />
          
          {/* Indicador de fortaleza de contraseña */}
          {isRegisterMode && password.length > 0 && (
            <View style={styles.strengthContainer}>
              <ThemedText style={styles.strengthLabel}>Fortaleza: </ThemedText>
              <ThemedText style={[
                styles.strengthText,
                passwordStrength === 'weak' && { color: Colors.light.error },
                passwordStrength === 'medium' && { color: Colors.light.warning },
                passwordStrength === 'strong' && { color: Colors.light.success },
              ]}>
                {passwordStrength === 'weak' && '🔴 Débil'}
                {passwordStrength === 'medium' && '🟡 Media'}
                {passwordStrength === 'strong' && '🟢 Fuerte'}
              </ThemedText>
            </View>
          )}

          <Button
            title={isRegisterMode ? 'Registrarse' : 'Iniciar sesión'}
            onPress={handleSubmit}
            loading={isSubmitting}
            disabled={isSubmitting}
            variant="primary"
            size="lg"
            fullWidth
            style={{ marginTop: Spacing.md }}
          />

          <Button
            title={isRegisterMode ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
            onPress={toggleMode}
            variant="ghost"
            size="md"
            fullWidth
            style={{ marginTop: Spacing.sm }}
          />

          <ThemedText style={styles.demoText}>
            💡 Demo: email válido y contraseña con 8+ caracteres, mayúsculas, minúsculas, números
          </ThemedText>
        </ThemedView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: Spacing.lg,
    maxWidth: 400,
    width: '100%',
    alignSelf: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: Spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    marginBottom: Spacing.xl,
    textAlign: 'center',
  },
  strengthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
    marginLeft: Spacing.xs,
  },
  strengthLabel: {
    fontSize: 12,
    opacity: 0.7,
  },
  strengthText: {
    fontSize: 12,
    fontWeight: '600',
  },
  demoText: {
    fontSize: 12,
    opacity: 0.6,
    textAlign: 'center',
    marginTop: Spacing.lg,
  },
});
