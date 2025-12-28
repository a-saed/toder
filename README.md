# Toder

A task management application built with React + TypeScript + Vite.

## Development

```bash
yarn dev
```

## Build

```bash
yarn build
```

## GitHub Pages Deployment

This project is configured for automatic deployment to GitHub Pages via GitHub Actions.

### Setup

1. Enable GitHub Pages in your repository settings:
   - Go to Settings → Pages
   - Source: Select "GitHub Actions"

2. The deployment workflow will automatically run when you push to the `main` branch.

3. Your app will be available at: `https://AbdoElsaed.github.io/toder/`

### Manual Deployment

To test the GitHub Pages build locally:

```bash
yarn build:gh-pages
```

This builds the app with the correct base path (`/toder/`) for GitHub Pages.

---

## Original Template Info

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
