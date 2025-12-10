import { Loading } from '@/components/loading';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuth } from '@/contexts/auth-context';
import { useThemeColor } from '@/hooks/use-theme-color';
import { validateLoginForm, validateRegisterForm, validators } from '@/utils/validators';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

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
            <>
              <TextInput
                style={[
                  styles.input, 
                  { backgroundColor, color: textColor, borderColor },
                  errors.name && styles.inputError
                ]}
                placeholder="Nombre completo"
                placeholderTextColor={borderColor}
                value={name}
                onChangeText={handleNameChange}
                autoCapitalize="words"
              />
              {errors.name && (
                <ThemedText style={styles.errorText}>⚠️ {errors.name}</ThemedText>
              )}
            </>
          )}

          <TextInput
            style={[
              styles.input, 
              { backgroundColor, color: textColor, borderColor },
              errors.email && styles.inputError
            ]}
            placeholder="Email"
            placeholderTextColor={borderColor}
            value={email}
            onChangeText={handleEmailChange}
            autoCapitalize="none"
            keyboardType="email-address"
            autoComplete="email"
          />
          {errors.email && (
            <ThemedText style={styles.errorText}>⚠️ {errors.email}</ThemedText>
          )}

          <TextInput
            style={[
              styles.input, 
              { backgroundColor, color: textColor, borderColor },
              errors.password && styles.inputError
            ]}
            placeholder="Contraseña"
            placeholderTextColor={borderColor}
            value={password}
            onChangeText={handlePasswordChange}
            secureTextEntry
            autoCapitalize="none"
            autoComplete="password"
          />
          {errors.password && (
            <ThemedText style={styles.errorText}>⚠️ {errors.password}</ThemedText>
          )}
          
          {/* Indicador de fortaleza de contraseña */}
          {isRegisterMode && password.length > 0 && (
            <View style={styles.strengthContainer}>
              <ThemedText style={styles.strengthLabel}>Fortaleza: </ThemedText>
              <ThemedText style={[
                styles.strengthText,
                passwordStrength === 'weak' && styles.strengthWeak,
                passwordStrength === 'medium' && styles.strengthMedium,
                passwordStrength === 'strong' && styles.strengthStrong,
              ]}>
                {passwordStrength === 'weak' && '🔴 Débil'}
                {passwordStrength === 'medium' && '🟡 Media'}
                {passwordStrength === 'strong' && '🟢 Fuerte'}
              </ThemedText>
            </View>
          )}

          <TouchableOpacity
            style={[styles.button, { backgroundColor: tintColor }]}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            <ThemedText style={styles.buttonText}>
              {isRegisterMode ? 'Registrarse' : 'Iniciar sesión'}
            </ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.linkButton}
            onPress={toggleMode}
          >
            <ThemedText style={styles.linkText}>
              {isRegisterMode 
                ? '¿Ya tienes cuenta? Inicia sesión' 
                : '¿No tienes cuenta? Regístrate'}
            </ThemedText>
          </TouchableOpacity>

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
    padding: 24,
    maxWidth: 400,
    width: '100%',
    alignSelf: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    marginBottom: 32,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 4,
    fontSize: 16,
  },
  inputError: {
    borderColor: '#dc3545',
    borderWidth: 2,
  },
  errorText: {
    color: '#dc3545',
    fontSize: 12,
    marginBottom: 12,
    marginLeft: 4,
  },
  strengthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginLeft: 4,
  },
  strengthLabel: {
    fontSize: 12,
    opacity: 0.7,
  },
  strengthText: {
    fontSize: 12,
    fontWeight: '600',
  },
  strengthWeak: {
    color: '#dc3545',
  },
  strengthMedium: {
    color: '#ffc107',
  },
  strengthStrong: {
    color: '#28a745',
  },
  button: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  linkButton: {
    marginTop: 16,
    alignItems: 'center',
  },
  linkText: {
    fontSize: 14,
    textDecorationLine: 'underline',
    opacity: 0.8,
  },
  demoText: {
    fontSize: 12,
    opacity: 0.6,
    textAlign: 'center',
    marginTop: 24,
  },
});
