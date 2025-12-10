import { Loading } from '@/components/loading';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
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
  const cardBackground = useThemeColor({ light: '#f8f9fa', dark: '#1c1c1e' }, 'background');
  const borderColor = useThemeColor({ light: '#e0e0e0', dark: '#3a3a3c' }, 'text');

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
            } catch (error) {
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
        <ThemedView style={[styles.header, { backgroundColor: cardBackground }]}>
          <View style={[styles.avatarContainer, { backgroundColor: tintColor }]}>
            <Ionicons name="person" size={48} color="#fff" />
          </View>
          <ThemedText type="title" style={styles.userName}>
            {user?.name || 'Usuario'}
          </ThemedText>
          <ThemedText style={styles.userEmail}>
            {user?.email || 'email@example.com'}
          </ThemedText>
          <TouchableOpacity
            style={[styles.editButton, { borderColor: tintColor }]}
            onPress={handleEditProfile}
          >
            <Ionicons name="pencil" size={16} color={tintColor} />
            <ThemedText style={[styles.editButtonText, { color: tintColor }]}>
              Editar perfil
            </ThemedText>
          </TouchableOpacity>
        </ThemedView>

        {/* Información del perfil */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Información
          </ThemedText>
          
          <TouchableOpacity
            style={[styles.infoCard, { backgroundColor: cardBackground, borderColor }]}
            onPress={handleEditProfile}
          >
            <View style={styles.infoRow}>
              <Ionicons name="person-outline" size={24} color={textColor} />
              <View style={styles.infoContent}>
                <ThemedText style={styles.infoLabel}>Nombre completo</ThemedText>
                <ThemedText style={styles.infoValue}>{user?.name || 'No especificado'}</ThemedText>
              </View>
              <Ionicons name="chevron-forward" size={20} color={borderColor} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.infoCard, { backgroundColor: cardBackground, borderColor }]}
            onPress={handleEditProfile}
          >
            <View style={styles.infoRow}>
              <Ionicons name="mail-outline" size={24} color={textColor} />
              <View style={styles.infoContent}>
                <ThemedText style={styles.infoLabel}>Email</ThemedText>
                <ThemedText style={styles.infoValue}>{user?.email || 'No especificado'}</ThemedText>
              </View>
              <Ionicons name="chevron-forward" size={20} color={borderColor} />
            </View>
          </TouchableOpacity>
        </ThemedView>

        {/* Ajustes */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Ajustes
          </ThemedText>
          
          <View style={[styles.settingCard, { backgroundColor: cardBackground, borderColor }]}>
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
          </View>

          <View style={[styles.settingCard, { backgroundColor: cardBackground, borderColor }]}>
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
          </View>

          <TouchableOpacity
            style={[styles.settingCard, { backgroundColor: cardBackground, borderColor }]}
            onPress={handleChangePassword}
          >
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
        </ThemedView>

        {/* Acciones */}
        <ThemedView style={styles.section}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: tintColor }]}
            onPress={handleLogout}
          >
            <Ionicons name="log-out-outline" size={24} color="#fff" />
            <ThemedText style={styles.actionButtonText}>Cerrar sesión</ThemedText>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.dangerButton, { borderColor: '#dc3545' }]}
            onPress={handleDeleteAccount}
          >
            <Ionicons name="trash-outline" size={24} color="#dc3545" />
            <ThemedText style={[styles.dangerButtonText, { color: '#dc3545' }]}>
              Eliminar cuenta
            </ThemedText>
          </TouchableOpacity>
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
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  header: {
    alignItems: 'center',
    padding: 24,
    borderRadius: 16,
    marginBottom: 24,
  },
  avatarContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 16,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    gap: 6,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  infoCard: {
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 8,
    overflow: 'hidden',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
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
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 8,
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
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
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    gap: 8,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  dangerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
  },
  dangerButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  footerText: {
    textAlign: 'center',
    fontSize: 12,
    opacity: 0.5,
    marginTop: 16,
  },
});
