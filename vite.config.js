// // // import { defineConfig } from 'vitest/config';
// // // import react from '@vitejs/plugin-react';

// // // export default defineConfig({
// // //   plugins: [react()],
// // //   test: {
// // //     environment: 'jsdom',
// // //     globals: true,
// // //     setupFiles: './src/setupTests.js',
// // //   },
// // // });


// // import { defineConfig } from 'vite';  // ✅ 'vite' se import karo
// // import react from '@vitejs/plugin-react';

// // export default defineConfig({
// //   plugins: [react()],
// //   server: {
// //     historyApiFallback: true,
// //   },
// //   build: {
// //     outDir: 'dist',
// //     sourcemap: false,  // Production mein false rakhna better hai
// //     minify: 'esbuild',
// //   },
// //   test: {
// //     environment: 'jsdom',
// //     globals: true,
// //     setupFiles: './src/setupTests.js',
// //   },
// // });


// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     historyApiFallback: true,
//     proxy: {
//       '/api': {
//         target: 'https://piyush-sir.onrender.com/api',  // ← तेरा बैकएंड
//         changeOrigin: true,
//         secure: false,
//       }
//     }
//   },
//   build: {
//     outDir: 'dist',
//     sourcemap: false,
//     minify: 'esbuild',
//   },
//   test: {
//     environment: 'jsdom',
//     globals: true,
//     setupFiles: './src/setupTests.js',
//   },
// });


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});