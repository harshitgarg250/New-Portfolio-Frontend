# Portfolio Frontend

A modern, responsive portfolio website built with React, Vite, and Tailwind CSS.

## Features

- 🎨 Modern UI with Tailwind CSS
- 🌙 Dark mode support
- 📱 Fully responsive design
- ⚡ Fast performance with Vite
- 🎬 Smooth animations with Framer Motion
- 📝 Blog with markdown support
- 📧 Contact form
- 🔍 SEO friendly

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy the environment file:
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your API URL

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── common/       # Reusable components
│   ├── layout/       # Layout components (Navbar, Footer)
│   ├── projects/     # Project-related components
│   ├── blog/         # Blog-related components
│   ├── skills/       # Skills components
│   ├── about/        # About page components
│   └── contact/      # Contact form components
├── pages/            # Page components
├── services/         # API services
├── hooks/            # Custom React hooks
├── App.jsx           # Main App component
├── main.jsx          # Entry point
└── index.css         # Global styles
```

## Customization

### Colors

Edit `tailwind.config.js` to customize the color palette:

```js
theme: {
  extend: {
    colors: {
      primary: { ... },
      secondary: { ... },
    }
  }
}
```

### Fonts

Update the Google Fonts link in `index.html` and the font family in `tailwind.config.js`.

## License

MIT
