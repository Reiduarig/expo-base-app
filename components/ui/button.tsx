/**
 * Componente Button reutilizable con variantes y estados
 */

import { BorderRadius, Colors, FontSizes, Shadows, Spacing } from '@/constants/theme';
import { useThemeColor } from '@/hooks/use-theme-color';
import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps, ViewStyle } from 'react-native';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  title: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  style?: ViewStyle;
}

export function Button({
  title,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  fullWidth = false,
  style,
  ...props
}: ButtonProps) {
  const tintColor = useThemeColor({}, 'tint');
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  
  // Colores por variante
  const getBackgroundColor = () => {
    if (disabled) return Colors.light.disabled;
    
    switch (variant) {
      case 'primary':
        return tintColor;
      case 'secondary':
        return Colors.light.buttonSecondary;
      case 'danger':
        return Colors.light.error;
      case 'success':
        return Colors.light.success;
      case 'outline':
      case 'ghost':
        return 'transparent';
      default:
        return tintColor;
    }
  };

  const getTextColor = () => {
    if (disabled) return Colors.light.disabledText;
    
    switch (variant) {
      case 'outline':
      case 'ghost':
        return tintColor;
      case 'primary':
      case 'danger':
      case 'success':
      case 'secondary':
        return '#fff';
      default:
        return '#fff';
    }
  };

  const getPadding = () => {
    switch (size) {
      case 'sm':
        return { paddingVertical: Spacing.sm, paddingHorizontal: Spacing.md };
      case 'lg':
        return { paddingVertical: Spacing.md + 4, paddingHorizontal: Spacing.xl };
      case 'md':
      default:
        return { paddingVertical: Spacing.md, paddingHorizontal: Spacing.lg };
    }
  };

  const getFontSize = () => {
    switch (size) {
      case 'sm':
        return FontSizes.sm;
      case 'lg':
        return FontSizes.lg;
      case 'md':
      default:
        return FontSizes.md;
    }
  };

  const buttonStyle: ViewStyle = {
    backgroundColor: getBackgroundColor(),
    ...getPadding(),
    borderRadius: BorderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    ...(variant === 'outline' && {
      borderWidth: 2,
      borderColor: disabled ? Colors.light.disabled : tintColor,
    }),
    ...(variant !== 'ghost' && Shadows.sm),
    ...(fullWidth && { width: '100%' }),
  };

  return (
    <TouchableOpacity
      style={[buttonStyle, style]}
      disabled={disabled || loading}
      activeOpacity={0.7}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} size="small" />
      ) : (
        <>
          {icon}
          <Text style={{ color: getTextColor(), fontSize: getFontSize(), fontWeight: '600' }}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}
