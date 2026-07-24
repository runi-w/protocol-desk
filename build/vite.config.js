import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'
// Inlines all JS/CSS into a single self-contained index.html (what GitHub Pages serves).
export default defineConfig({ plugins:[react(), viteSingleFile()], base:'./', build:{cssCodeSplit:false, assetsInlineLimit:100000000} })
