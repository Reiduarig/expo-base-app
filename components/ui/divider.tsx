/**
 * Componente Divider para separar contenido
 */

import { Colors, Spacing } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import React from 'react';
import { View, ViewStyle } from 'react-native';

interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  spacing?: keyof typeof Spacing;
  style?: ViewStyle;
}

export function Divider({
  orientation = 'horizontal',
  spacing = 'md',
  style,
}: DividerProps) {
  const borderColor = useThemeColor({ light: Colors.light.border, dark: Colors.dark.border }, 'text');

  const dividerStyle: ViewStyle = {
    backgroundColor: borderColor,
    ...(orientation === 'horizontal'
      ? {
          height: 1,
          width: '100%',
          marginVertical: Spacing[spacing],
        }
      : {
          width: 1,
          height: '100%',
          marginHorizontal: Spacing[spacing],
        }),
  };

  return <View style={[dividerStyle, style]} />;
}
