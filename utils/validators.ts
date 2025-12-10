/**
 * Utilidades de validación para formularios
 */

export const validators = {
  /**
   * Valida formato de email
   */
  email: (email: string): { isValid: boolean; error?: string } => {
    if (!email || email.trim().length === 0) {
      return { isValid: false, error: 'El email es requerido' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { isValid: false, error: 'Email inválido' };
    }

    if (email.length > 254) {
      return { isValid: false, error: 'Email demasiado largo' };
    }

    return { isValid: true };
  },

  /**
   * Valida fortaleza de contraseña
   */
  password: (password: string): { isValid: boolean; error?: string; strength?: 'weak' | 'medium' | 'strong' } => {
    if (!password || password.length === 0) {
      return { isValid: false, error: 'La contraseña es requerida' };
    }

    if (password.length < 8) {
      return { isValid: false, error: 'La contraseña debe tener al menos 8 caracteres' };
    }

    if (password.length > 128) {
      return { isValid: false, error: 'La contraseña es demasiado larga' };
    }

    // Validar fortaleza
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const strengthScore = [hasUpperCase, hasLowerCase, hasNumbers, hasSpecialChar].filter(Boolean).length;

    if (strengthScore < 2) {
      return { 
        isValid: false, 
        error: 'La contraseña debe contener al menos mayúsculas, minúsculas, números o caracteres especiales',
        strength: 'weak'
      };
    }

    const strength = strengthScore === 4 ? 'strong' : strengthScore === 3 ? 'medium' : 'weak';

    return { isValid: true, strength };
  },

  /**
   * Valida nombre completo
   */
  fullName: (name: string): { isValid: boolean; error?: string } => {
    if (!name || name.trim().length === 0) {
      return { isValid: false, error: 'El nombre es requerido' };
    }

    if (name.trim().length < 2) {
      return { isValid: false, error: 'El nombre es demasiado corto' };
    }

    if (name.length > 100) {
      return { isValid: false, error: 'El nombre es demasiado largo' };
    }

    // Solo letras, espacios, guiones y apóstrofes
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/;
    if (!nameRegex.test(name)) {
      return { isValid: false, error: 'El nombre contiene caracteres no válidos' };
    }

    return { isValid: true };
  },

  /**
   * Sanitiza input para prevenir inyecciones
   */
  sanitize: (input: string): string => {
    return input.trim().replace(/[<>]/g, '');
  },
};

/**
 * Validador de formulario completo
 */
export const validateLoginForm = (email: string, password: string) => {
  const emailValidation = validators.email(email);
  const passwordValidation = validators.password(password);

  return {
    isValid: emailValidation.isValid && passwordValidation.isValid,
    errors: {
      email: emailValidation.error,
      password: passwordValidation.error,
    },
  };
};

export const validateRegisterForm = (email: string, password: string, name: string) => {
  const emailValidation = validators.email(email);
  const passwordValidation = validators.password(password);
  const nameValidation = validators.fullName(name);

  return {
    isValid: emailValidation.isValid && passwordValidation.isValid && nameValidation.isValid,
    errors: {
      email: emailValidation.error,
      password: passwordValidation.error,
      name: nameValidation.error,
    },
    passwordStrength: passwordValidation.strength,
  };
};
