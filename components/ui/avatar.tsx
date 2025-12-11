/**
 * Componente Avatar con iniciales o imagen
 */

import { FontSizes } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { Image, StyleSheet, Text, View, ViewStyle } from 'react-native';

type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

interface AvatarProps {
  size?: AvatarSize;
  source?: { uri: string };
  name?: string;
  backgroundColor?: string;
  style?: ViewStyle;
}

export function Avatar({
  size = 'md',
  source,
  name,
  backgroundColor,
  style,
}: AvatarProps) {
  const tintColor = useThemeColor({}, 'tint');
  const textColor = useThemeColor({}, 'text');

  const getSize = () => {
    switch (size) {
      case 'sm':
        return 32;
      case 'lg':
        return 64;
      case 'xl':
        return 96;
      case 'md':
      default:
        return 48;
    }
  };

  const getFontSize = () => {
    switch (size) {
      case 'sm':
        return FontSizes.sm;
      case 'lg':
        return FontSizes.xl;
      case 'xl':
        return FontSizes.xxxl;
      case 'md':
      default:
        return FontSizes.lg;
    }
  };

  const getIconSize = () => {
    switch (size) {
      case 'sm':
        return 16;
      case 'lg':
        return 32;
      case 'xl':
        return 48;
      case 'md':
      default:
        return 24;
    }
  };

  const getInitials = (name: string): string => {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const avatarSize = getSize();
  const avatarStyle: ViewStyle = {
    width: avatarSize,
    height: avatarSize,
    borderRadius: avatarSize / 2,
    backgroundColor: backgroundColor || tintColor,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  };

  if (source?.uri) {
    return (
      <View style={[avatarStyle, style]}>
        <Image source={source} style={styles.image} />
      </View>
    );
  }

  if (name) {
    return (
      <View style={[avatarStyle, style]}>
        <Text style={{ color: '#fff', fontSize: getFontSize(), fontWeight: '600' }}>
          {getInitials(name)}
        </Text>
      </View>
    );
  }

  return (
    <View style={[avatarStyle, style]}>
      <Ionicons name="person" size={getIconSize()} color="#fff" />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
});
