import { Loading } from '@/components/loading';
import { useAuth } from '@/contexts/auth-context';
import { Redirect } from 'expo-router';


export default function Index() {

  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Loading message="Verificando sesión..." />;
  }

  // Redirigir según el estado de autenticación
  if (isAuthenticated) {
    return <Redirect href="/(tabs)/home" />;
  }

  return <Redirect href="/login" />;
}

