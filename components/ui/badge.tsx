/**
 * Componente Badge para notificaciones y etiquetas
 */

import { BorderRadius, Colors, FontSizes, Spacing } from '@/constants/theme';
import React from 'react';
import { Text, View, ViewStyle } from 'react-native';

type BadgeVariant = 'primary' | 'success' | 'error' | 'warning' | 'info' | 'neutral';
type BadgeSize = 'sm' | 'md';

interface BadgeProps {
  label: string | number;
  variant?: BadgeVariant;
  size?: BadgeSize;
  style?: ViewStyle;
}

export function Badge({
  label,
  variant = 'primary',
  size = 'md',
  style,
}: BadgeProps) {
  const getBackgroundColor = () => {
    switch (variant) {
      case 'success':
        return Colors.light.success;
      case 'error':
        return Colors.light.error;
      case 'warning':
        return Colors.light.warning;
      case 'info':
        return Colors.light.info;
      case 'neutral':
        return Colors.light.buttonSecondary;
      case 'primary':
      default:
        return Colors.light.buttonPrimary;
    }
  };

  const getPadding = () => {
    return size === 'sm'
      ? { paddingVertical: 2, paddingHorizontal: Spacing.xs }
      : { paddingVertical: Spacing.xs, paddingHorizontal: Spacing.sm };
  };

  const getFontSize = () => {
    return size === 'sm' ? FontSizes.xs : FontSizes.sm;
  };

  const badgeStyle: ViewStyle = {
    backgroundColor: getBackgroundColor(),
    borderRadius: BorderRadius.full,
    ...getPadding(),
    alignSelf: 'flex-start',
  };

  return (
    <View style={[badgeStyle, style]}>
      <Text
        style={{
          color: variant === 'warning' ? '#000' : '#fff',
          fontSize: getFontSize(),
          fontWeight: '600',
        }}
      >
        {label}
      </Text>
    </View>
  );
}
