import { Loading } from '@/components/loading';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Avatar, Button, Card, Divider } from '@/components/ui';
import { Spacing } from '@/constants/theme';
import { useAuth } from '@/contexts/auth-context';
import { useThemeColor } from '@/hooks/use-theme-color';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Switch, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  const { user, logout, isProcessing } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const tintColor = useThemeColor({}, 'tint');
  const borderColor = useThemeColor({}, 'border');

  const handleLogout = () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro de que deseas cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Cerrar sesión',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
              router.replace('/login');
            } catch {
              Alert.alert('Error', 'No se pudo cerrar sesión');
            }
          },
        },
      ]
    );
  };

  const handleEditProfile = () => {
    Alert.alert('Próximamente', 'La edición de perfil estará disponible pronto');
  };

  const handleChangePassword = () => {
    Alert.alert('Próximamente', 'El cambio de contraseña estará disponible pronto');
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Eliminar cuenta',
      '⚠️ Esta acción es irreversible. ¿Estás seguro?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Info', 'Funcionalidad en desarrollo');
          },
        },
      ]
    );
  };

  if (isProcessing) {
    return <Loading message="Cerrando sesión..." />;
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor }]}>
      <ThemedView style={styles.content}>
        {/* Header con avatar */}
        <Card variant="elevated" style={styles.header}>
          <Avatar
            name={user?.name || 'Usuario'}
            size="xl"
            style={styles.avatar}
          />
          <ThemedText type="title" style={styles.userName}>
            {user?.name || 'Usuario'}
          </ThemedText>
          <ThemedText style={styles.userEmail}>
            {user?.email || 'email@example.com'}
          </ThemedText>
          <Button
            title="Editar perfil"
            variant="outline"
            size="sm"
            onPress={handleEditProfile}
            icon={<Ionicons name="pencil" size={16} color={tintColor} />}
            style={{ marginTop: Spacing.md }}
          />
        </Card>

        {/* Información del perfil */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Información
          </ThemedText>
          
          <Card variant="outlined" style={styles.infoCard}>
            <TouchableOpacity onPress={handleEditProfile}>
              <View style={styles.infoRow}>
                <Ionicons name="person-outline" size={24} color={textColor} />
                <View style={styles.infoContent}>
                  <ThemedText style={styles.infoLabel}>Nombre completo</ThemedText>
                  <ThemedText style={styles.infoValue}>{user?.name || 'No especificado'}</ThemedText>
                </View>
                <Ionicons name="chevron-forward" size={20} color={borderColor} />
              </View>
            </TouchableOpacity>
          </Card>

          <Card variant="outlined" style={styles.infoCard}>
            <TouchableOpacity onPress={handleEditProfile}>
              <View style={styles.infoRow}>
                <Ionicons name="mail-outline" size={24} color={textColor} />
                <View style={styles.infoContent}>
                  <ThemedText style={styles.infoLabel}>Email</ThemedText>
                  <ThemedText style={styles.infoValue}>{user?.email || 'No especificado'}</ThemedText>
                </View>
                <Ionicons name="chevron-forward" size={20} color={borderColor} />
              </View>
            </TouchableOpacity>
          </Card>
        </ThemedView>

        {/* Ajustes */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Ajustes
          </ThemedText>
          
          <Card variant="outlined" style={styles.settingCard}>
            <View style={styles.settingRow}>
              <Ionicons name="notifications-outline" size={24} color={textColor} />
              <View style={styles.settingContent}>
                <ThemedText style={styles.settingLabel}>Notificaciones</ThemedText>
                <ThemedText style={styles.settingDescription}>
                  Recibir alertas y actualizaciones
                </ThemedText>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: '#767577', true: tintColor }}
                thumbColor="#fff"
              />
            </View>
          </Card>

          <Card variant="outlined" style={styles.settingCard}>
            <View style={styles.settingRow}>
              <Ionicons name="moon-outline" size={24} color={textColor} />
              <View style={styles.settingContent}>
                <ThemedText style={styles.settingLabel}>Modo oscuro</ThemedText>
                <ThemedText style={styles.settingDescription}>
                  Tema oscuro para la aplicación
                </ThemedText>
              </View>
              <Switch
                value={darkModeEnabled}
                onValueChange={setDarkModeEnabled}
                trackColor={{ false: '#767577', true: tintColor }}
                thumbColor="#fff"
              />
            </View>
          </Card>

          <Card variant="outlined" style={styles.settingCard}>
            <TouchableOpacity onPress={handleChangePassword}>
              <View style={styles.settingRow}>
                <Ionicons name="lock-closed-outline" size={24} color={textColor} />
                <View style={styles.settingContent}>
                  <ThemedText style={styles.settingLabel}>Cambiar contraseña</ThemedText>
                  <ThemedText style={styles.settingDescription}>
                    Actualiza tu contraseña de acceso
                  </ThemedText>
                </View>
                <Ionicons name="chevron-forward" size={20} color={borderColor} />
              </View>
            </TouchableOpacity>
          </Card>
        </ThemedView>

        <Divider spacing="lg" />

        {/* Acciones */}
        <ThemedView style={styles.section}>
          <Button
            title="Cerrar sesión"
            variant="primary"
            size="lg"
            fullWidth
            onPress={handleLogout}
            icon={<Ionicons name="log-out-outline" size={24} color="#fff" />}
            style={{ marginBottom: Spacing.md }}
          />

          <Button
            title="Eliminar cuenta"
            variant="danger"
            size="lg"
            fullWidth
            onPress={handleDeleteAccount}
            icon={<Ionicons name="trash-outline" size={24} color="#fff" />}
          />
        </ThemedView>

        {/* Footer info */}
        <ThemedText style={styles.footerText}>
          Versión 1.0.0
        </ThemedText>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  avatar: {
    marginBottom: Spacing.md,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: Spacing.xs,
  },
  userEmail: {
    fontSize: 14,
    opacity: 0.7,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: Spacing.md,
    paddingHorizontal: Spacing.xs,
  },
  infoCard: {
    marginBottom: Spacing.sm,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    opacity: 0.6,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  settingCard: {
    marginBottom: Spacing.sm,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  settingContent: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 12,
    opacity: 0.6,
  },
  footerText: {
    textAlign: 'center',
    fontSize: 12,
    opacity: 0.5,
    marginTop: Spacing.md,
  },
});
