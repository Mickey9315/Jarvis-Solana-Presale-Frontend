import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { esbuildCommonjs } from '@originjs/vite-plugin-commonjs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    commonjsOptions: { transformMixedEsModules: true }, // Change
    chunkSizeWarningLimit: 800, // Set the limit to 800kb
  },
  define: {
    'process.env': {}
  },
  optimizeDeps:{
    esbuildOptions:{  
      plugins:[
        esbuildCommonjs(['utils'])
      ]
    }
  }
})
