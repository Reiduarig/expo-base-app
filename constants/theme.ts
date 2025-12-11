/**
 * Sistema de colores y tema de la aplicación
 * Incluye paleta completa para light y dark mode
 */

import { Platform } from 'react-native';

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    // Colores base
    text: '#11181C',
    textSecondary: '#687076',
    background: '#fff',
    backgroundSecondary: '#f8f9fa',
    tint: tintColorLight,
    
    // Iconos y tabs
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    
    // Colores de estado
    success: '#28a745',
    error: '#dc3545',
    warning: '#ffc107',
    info: '#17a2b8',
    
    // Elementos de UI
    border: '#e0e0e0',
    card: '#ffffff',
    shadow: '#000000',
    overlay: 'rgba(0, 0, 0, 0.5)',
    
    // Inputs
    inputBackground: '#ffffff',
    inputBorder: '#ccc',
    inputBorderFocus: tintColorLight,
    inputPlaceholder: '#999',
    
    // Botones
    buttonPrimary: tintColorLight,
    buttonSecondary: '#6c757d',
    buttonDanger: '#dc3545',
    buttonSuccess: '#28a745',
    buttonText: '#ffffff',
    
    // Estados
    disabled: '#cccccc',
    disabledText: '#999999',
    link: tintColorLight,
  },
  dark: {
    // Colores base
    text: '#ECEDEE',
    textSecondary: '#9BA1A6',
    background: '#151718',
    backgroundSecondary: '#1c1c1e',
    tint: tintColorDark,
    
    // Iconos y tabs
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    
    // Colores de estado (ajustados para dark mode)
    success: '#34c759',
    error: '#ff453a',
    warning: '#ffd60a',
    info: '#5ac8fa',
    
    // Elementos de UI
    border: '#3a3a3c',
    card: '#1c1c1e',
    shadow: '#000000',
    overlay: 'rgba(0, 0, 0, 0.7)',
    
    // Inputs
    inputBackground: '#2c2c2e',
    inputBorder: '#444',
    inputBorderFocus: tintColorDark,
    inputPlaceholder: '#999',
    
    // Botones
    buttonPrimary: tintColorDark,
    buttonSecondary: '#8e8e93',
    buttonDanger: '#ff453a',
    buttonSuccess: '#34c759',
    buttonText: '#000000',
    
    // Estados
    disabled: '#48484a',
    disabledText: '#636366',
    link: tintColorDark,
  },
};

/**
 * Sistema de espaciado consistente
 */
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

/**
 * Tamaños de fuente
 */
export const FontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

/**
 * Border radius
 */
export const BorderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
} as const;

/**
 * Sombras
 */
export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
} as const;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

/**
 * Helper para obtener colores con opacidad
 */
export const withOpacity = (color: string, opacity: number): string => {
  // Si ya tiene opacidad (rgba), devolver tal cual
  if (color.startsWith('rgba')) return color;
  
  // Convertir hex a rgba
  if (color.startsWith('#')) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  
  return color;
};
