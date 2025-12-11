# 🚀 Expo Base App - Template Profesional

<div align="center">

![React Native](https://img.shields.io/badge/React_Native-0.81.5-blue?logo=react)
![Expo](https://img.shields.io/badge/Expo-~54.0-000020?logo=expo)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green.svg)

**Template profesional para aplicaciones móviles con React Native + Expo**

[Características](#-características) • [Instalación](#-instalación-rápida) • [Documentación](#-documentación) • [Estructura](#-estructura-del-proyecto)

</div>

---

## 📋 Descripción

Template completo y listo para producción que incluye autenticación, servicios API, componentes UI reutilizables y un sistema de diseño profesional. Perfecto para iniciar proyectos móviles rápidamente con las mejores prácticas.

## ✨ Características

### 🔐 Autenticación
- Login y registro completos
- Almacenamiento seguro con `expo-secure-store`
- Validación de formularios en tiempo real
- Recuperación de sesión automática
- Context API para estado global de auth

### 🎨 Sistema de Diseño
- **40+ colores semánticos** con soporte light/dark mode
- **Sistema de espaciado** (6 niveles: xs → xxl)
- **Sistema de tipografía** (7 tamaños)
- **Bordes y sombras** estandarizados
- Sin colores hardcodeados
- Tema completamente personalizable

### 🧩 Componentes UI Reutilizables
- **Button**: 6 variantes (primary, secondary, danger, success, outline, ghost), 3 tamaños, loading states
- **Input**: Con label, error, helper text, iconos
- **Card**: 3 variantes (elevated, outlined, filled)
- **Avatar**: Con iniciales automáticas, soporte de imágenes
- **Badge**: 6 colores para etiquetas
- **Divider**: Separadores horizontales/verticales

### 🌐 Servicios API
- Cliente HTTP configurable con timeout e interceptors
- Capa de servicios (auth, user)
- Manejo automático de tokens
- Refresh token automático
- Logging de requests
- Manejo centralizado de errores

### 🛠️ Arquitectura
- **TypeScript** en modo strict
- **Expo Router** para navegación file-based
- **Context API** para estado global
- Path aliases (`@/`) configurados
- Variables de entorno (.env)
- Validadores reutilizables
- Error boundaries

### 📱 Pantallas Incluidas
- Login/Registro con validación
- Home con acciones rápidas
- Profile con configuración
- About y Explore (tabs)

---

## 🚀 Instalación Rápida

### Usando como Template en GitHub

1. **Usa este repositorio como template**:
   - Click en "Use this template" → "Create a new repository"
   - O clona directamente:
   ```bash
   git clone https://github.com/Reiduarig/expo-base-app.git mi-nuevo-proyecto
   cd mi-nuevo-proyecto
   ```

2. **Ejecuta el script de setup**:
   ```bash
   npm install
   npm run setup
   ```
   Este script te pedirá:
   - Nombre del proyecto
   - Nombre del autor
   - Y configurará todo automáticamente

3. **Configura variables de entorno**:
   ```bash
   # El archivo .env ya fue creado, edítalo:
   nano .env  # o usa tu editor favorito
   ```
   ```env
   API_URL=https://tu-api.com
   API_TIMEOUT=10000
   NODE_ENV=development
   ```

4. **Inicia el proyecto**:
   ```bash
   npm start
   ```

### Instalación Manual (Alternativa)

```bash
# 1. Clonar repositorio
git clone https://github.com/Reiduarig/expo-base-app.git
cd expo-base-app

# 2. Instalar dependencias
npm install

# 3. Copiar variables de entorno
cp .env.example .env

# 4. Editar .env con tu configuración
nano .env

# 5. Iniciar servidor de desarrollo
npm start
```

---

## 📱 Comandos Disponibles

```bash
npm start          # Inicia Expo Dev Server
npm run setup      # Script de configuración inicial (recomendado)
npm run android    # Abre en emulador Android
npm run ios        # Abre en simulador iOS
npm run web        # Abre en navegador web
npm run lint       # Ejecuta ESLint
```

---

## 📂 Estructura del Proyecto

```
expo-base-app/
├── app/                          # Pantallas (Expo Router)
│   ├── _layout.tsx               # Layout principal
│   ├── login.tsx                 # Login/Registro
│   ├── +not-found.tsx            # 404
│   └── (tabs)/                   # Navegación por tabs
│       ├── _layout.tsx           # Layout de tabs
│       ├── index.tsx             # Home
│       ├── profile.tsx           # Perfil
│       ├── about.tsx             # Acerca de
│       └── explore.tsx           # Explorar
│
├── components/                   # Componentes reutilizables
│   ├── ui/                       # Componentes UI base
│   │   ├── button.tsx            # Botón (6 variantes)
│   │   ├── input.tsx             # Input con validación
│   │   ├── card.tsx              # Card (3 variantes)
│   │   ├── avatar.tsx            # Avatar
│   │   ├── badge.tsx             # Badge
│   │   ├── divider.tsx           # Divider
│   │   └── index.ts              # Exports centralizados
│   ├── themed-text.tsx           # Texto con tema
│   ├── themed-view.tsx           # Vista con tema
│   ├── loading.tsx               # Loading indicator
│   └── error-boundary.tsx        # Error boundary
│
├── constants/                    # Constantes
│   └── theme.ts                  # Sistema de diseño completo
│
├── contexts/                     # Contexts de React
│   └── auth-context.tsx          # Context de autenticación
│
├── hooks/                        # Custom hooks
│   ├── use-color-scheme.ts       # Hook de color scheme
│   └── use-theme-color.ts        # Hook de colores del tema
│
├── services/                     # Servicios API
│   ├── api/
│   │   ├── client.ts             # Cliente HTTP
│   │   └── endpoints.ts          # Endpoints centralizados
│   ├── auth.service.ts           # Servicio de autenticación
│   └── user.service.ts           # Servicio de usuario
│
├── types/                        # Tipos TypeScript
│   ├── api.types.ts              # Tipos de API
│   └── user.types.ts             # Tipos de usuario
│
├── utils/                        # Utilidades
│   ├── validators.ts             # Validadores
│   ├── logger.ts                 # Sistema de logging
│   └── secure-storage.ts         # Almacenamiento seguro
│
├── config/                       # Configuración
│   ├── env.ts                    # Variables de entorno
│   └── constants.ts              # Constantes de app
│
├── assets/                       # Assets estáticos
│   └── images/                   # Imágenes
│
├── scripts/                      # Scripts de utilidad
│   ├── setup-project.js          # Script de inicialización
│   └── reset-project.js          # Reset del proyecto
│
├── .env.example                  # Template de variables de entorno
├── app.json                      # Configuración de Expo
├── package.json                  # Dependencias
├── tsconfig.json                 # Configuración TypeScript
└── eslint.config.js              # Configuración ESLint
```

---

## 🔧 Configuración

### Variables de Entorno (.env)

```env
# API Configuration
API_URL=https://api.ejemplo.com
API_TIMEOUT=10000

# Environment
NODE_ENV=development
```

### Personalización del Tema

Edita `constants/theme.ts` para personalizar colores, espaciado, tipografía, etc.:

```typescript
// Cambiar color principal
Colors.light.tint = '#FF6B6B';  // Nuevo color primario

// Ajustar espaciado
Spacing.md = 20;  // Cambiar espaciado medio

// Personalizar fuentes
FontSizes.xl = 22;  // Ajustar tamaño de fuente
```

---

## 📚 Documentación

- **[SERVICES_GUIDE.md](./SERVICES_GUIDE.md)** - Guía completa de servicios API
- **[COLOR_SYSTEM_GUIDE.md](./COLOR_SYSTEM_GUIDE.md)** - Sistema de diseño y componentes UI
- **[UI_COMPONENTS_SUMMARY.md](./UI_COMPONENTS_SUMMARY.md)** - Referencia rápida de componentes
- **[CHANGELOG.md](./CHANGELOG.md)** - Historial de cambios

---

## 💡 Ejemplos de Uso

### Crear un botón

```tsx
import { Button } from '@/components/ui';

<Button
  title="Guardar"
  variant="primary"
  size="lg"
  loading={isSaving}
  onPress={handleSave}
/>
```

### Crear un input con validación

```tsx
import { Input } from '@/components/ui';

<Input
  label="Email"
  placeholder="tu@email.com"
  value={email}
  onChangeText={setEmail}
  error={errors.email}
  leftIcon={<Ionicons name="mail-outline" size={20} />}
/>
```

### Llamar a la API

```tsx
import { authService } from '@/services/auth.service';

const handleLogin = async () => {
  try {
    const { user, token } = await authService.login({
      email: 'user@example.com',
      password: 'password123'
    });
    console.log('Usuario autenticado:', user);
  } catch (error) {
    console.error('Error en login:', error);
  }
};
```

---

## 🛣️ Roadmap

### ✅ Completado (v1.0.0)
- Sistema de autenticación
- Servicios API
- Componentes UI base
- Sistema de diseño
- Modo oscuro

### 🔄 En Progreso
- Tests unitarios
- Storybook para componentes
- CI/CD con GitHub Actions

### 📋 Planeado
- Internacionalización (i18n)
- Notificaciones push
- Offline-first
- Analytics
- Deep linking

---

## 🤝 Contribuir

Las contribuciones son bienvenidas! Por favor:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: amazing feature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver archivo [LICENSE](./LICENSE) para más detalles.

---

## 📞 Soporte

- **Issues**: [GitHub Issues](https://github.com/Reiduarig/expo-base-app/issues)
- **Documentación**: Ver carpeta `/docs` o archivos `.md` en la raíz

---

<div align="center">

**Hecho con React Native + Expo**

[⬆ Volver arriba](#-expo-base-app---template-profesional)

</div>

