import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 900,
    rolldownOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) {
            return;
          }

          if (id.includes('@babylonjs/loaders/glTF/2.0/Extensions')) {
            return 'babylon-gltf-extensions';
          }

          if (id.includes('@babylonjs/loaders/glTF/2.0')) {
            return 'babylon-gltf2';
          }

          if (id.includes('@babylonjs/loaders/glTF/1.0')) {
            return 'babylon-gltf1';
          }

          if (id.includes('@babylonjs/loaders')) {
            return 'babylon-loaders';
          }

          if (id.includes('@babylonjs/core')) {
            if (id.includes('/Shaders/ShadersInclude/')) {
              return 'babylon-shader-includes';
            }

            if (id.includes('/Shaders/') || id.includes('/ShadersWGSL/')) {
              return 'babylon-shaders';
            }

            if (id.includes('/Materials/')) {
              return 'babylon-materials';
            }

            if (id.includes('/Engines/')) {
              return 'babylon-engines';
            }

            if (id.includes('/Meshes/') || id.includes('/Buffers/')) {
              return 'babylon-meshes';
            }

            if (id.includes('/Maths/')) {
              return 'babylon-maths';
            }

            if (id.includes('/Loading/')) {
              return 'babylon-loading';
            }

            return 'babylon-runtime';
          }

          if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
            return 'react-vendor';
          }

          if (id.includes('framer-motion')) {
            return 'motion-vendor';
          }
        },
      },
    },
  },
});
