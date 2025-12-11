/**
 * Componente Card reutilizable
 */

import { BorderRadius, Colors, Shadows, Spacing } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import React from 'react';
import { View, ViewProps, ViewStyle } from 'react-native';

interface CardProps extends ViewProps {
  variant?: 'elevated' | 'outlined' | 'filled';
  padding?: keyof typeof Spacing;
  children: React.ReactNode;
}

export function Card({
  variant = 'elevated',
  padding = 'md',
  children,
  style,
  ...props
}: CardProps) {
  const backgroundColor = useThemeColor({ light: Colors.light.card, dark: Colors.dark.card }, 'background');
  const borderColor = useThemeColor({ light: Colors.light.border, dark: Colors.dark.border }, 'text');

  const cardStyle: ViewStyle = {
    backgroundColor,
    borderRadius: BorderRadius.lg,
    padding: Spacing[padding],
    ...(variant === 'elevated' && Shadows.md),
    ...(variant === 'outlined' && {
      borderWidth: 1,
      borderColor,
    }),
  };

  return (
    <View style={[cardStyle, style]} {...props}>
      {children}
    </View>
  );
}
