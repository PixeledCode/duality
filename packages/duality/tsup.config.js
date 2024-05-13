import { defineConfig } from 'tsup'

export default defineConfig({
	name: 'save duality',
	entry: ['src/index.ts'],
	format: ['cjs', 'esm'],
	outDir: 'dist',
	clean: true,
	sourcemap: true,
})
