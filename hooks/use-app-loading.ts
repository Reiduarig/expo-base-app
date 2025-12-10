import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

// Prevenir que el splash screen se oculte automáticamente
SplashScreen.preventAutoHideAsync();

export function useAppLoading() {
  const [fontsLoaded, fontError] = useFonts({
    // Aquí puedes agregar tus fuentes personalizadas
    // 'CustomFont-Regular': require('@/assets/fonts/CustomFont-Regular.ttf'),
  });

  useEffect(() => {
    async function prepare() {
      try {
        if (fontsLoaded || fontError) {
          // Ocultar el splash screen cuando las fuentes estén cargadas
          await SplashScreen.hideAsync();
        }
      } catch (e) {
        console.warn('Error al ocultar splash screen:', e);
      }
    }

    prepare();
  }, [fontsLoaded, fontError]);

  return {
    isReady: fontsLoaded && !fontError,
    error: fontError,
  };
}
