#!/usr/bin/env node

/**
 * Script de inicialización para nuevos proyectos
 * 
 * Uso:
 *   npm run setup
 * 
 * Este script:
 * 1. Solicita el nombre del nuevo proyecto
 * 2. Actualiza package.json con el nuevo nombre
 * 3. Crea archivo .env desde .env.example
 * 4. Muestra instrucciones finales
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { fileURLToPath } = require('url');

// Obtener __dirname en CommonJS (Node.js)
const __dirname = path.dirname(require.main.filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('\n🚀 Configuración de nuevo proyecto desde template\n');
console.log('═'.repeat(50));

rl.question('📦 Nombre del nuevo proyecto: ', (projectName) => {
  if (!projectName || projectName.trim() === '') {
    console.log('❌ El nombre del proyecto no puede estar vacío');
    rl.close();
    process.exit(1);
  }

  const normalizedName = projectName.toLowerCase().replace(/\s+/g, '-');
  
  rl.question('👤 Nombre del autor: ', (authorName) => {
    console.log('\n⚙️  Configurando proyecto...\n');

    // 1. Actualizar package.json
    try {
      const packagePath = path.join(__dirname, '..', 'package.json');
      const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
      
      packageJson.name = normalizedName;
      packageJson.version = '0.1.0';
      packageJson.description = `Aplicación móvil ${projectName}`;
      packageJson.author = authorName || 'Your Name';
      packageJson.repository.url = `https://github.com/${authorName || 'username'}/${normalizedName}.git`;
      
      fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + '\n');
      console.log('✅ package.json actualizado');
    } catch (error) {
      console.error('❌ Error actualizando package.json:', error.message);
    }

    // 2. Crear .env desde .env.example si no existe
    try {
      const envPath = path.join(__dirname, '..', '.env');
      const envExamplePath = path.join(__dirname, '..', '.env.example');
      
      if (!fs.existsSync(envPath) && fs.existsSync(envExamplePath)) {
        fs.copyFileSync(envExamplePath, envPath);
        console.log('✅ Archivo .env creado desde .env.example');
      } else if (fs.existsSync(envPath)) {
        console.log('ℹ️  .env ya existe (no modificado)');
      }
    } catch (error) {
      console.error('❌ Error creando .env:', error.message);
    }

    // 3. Actualizar app.json
    try {
      const appJsonPath = path.join(__dirname, '..', 'app.json');
      const appJson = JSON.parse(fs.readFileSync(appJsonPath, 'utf8'));
      
      appJson.expo.name = projectName;
      appJson.expo.slug = normalizedName;
      
      fs.writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2) + '\n');
      console.log('✅ app.json actualizado');
    } catch (error) {
      console.error('❌ Error actualizando app.json:', error.message);
    }

    // Instrucciones finales
    console.log('\n' + '═'.repeat(50));
    console.log('✨ ¡Proyecto configurado exitosamente!\n');
    console.log('📝 Próximos pasos:\n');
    console.log('1. Configura las variables en .env:');
    console.log('   - API_URL (URL de tu backend)');
    console.log('   - Otras variables según necesites\n');
    console.log('2. Instala dependencias:');
    console.log('   npm install\n');
    console.log('3. Inicia el proyecto:');
    console.log('   npm start\n');
    console.log('4. Personaliza:');
    console.log('   - Colores en constants/theme.ts');
    console.log('   - Logo en assets/images/');
    console.log('   - Servicios API en services/\n');
    console.log('📚 Documentación disponible:');
    console.log('   - README.md - Guía general');
    console.log('   - SERVICES_GUIDE.md - Servicios API');
    console.log('   - COLOR_SYSTEM_GUIDE.md - Sistema de diseño\n');
    console.log('═'.repeat(50));

    rl.close();
  });
});
