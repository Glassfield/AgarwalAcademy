/**
 * Agarwal Academy Design System
 * Theme configuration based on Indian education market requirements
 */

export const theme = {
  // Color Palette (India-focused, education-friendly)
  colors: {
    // Primary: Deep Blue - Trust & Education
    primary: {
      DEFAULT: '#1E3A8A',
      50: '#EFF6FF',
      100: '#DBEAFE',
      200: '#BFDBFE',
      300: '#93C5FD',
      400: '#60A5FA',
      500: '#3B82F6',
      600: '#2563EB',
      700: '#1D4ED8',
      800: '#1E40AF',
      900: '#1E3A8A'
    },
    
    // Secondary: Soft Green - Growth & Learning
    secondary: {
      DEFAULT: '#10B981',
      50: '#ECFDF5',
      100: '#D1FAE5',
      200: '#A7F3D0',
      300: '#6EE7B7',
      400: '#34D399',
      500: '#10B981',
      600: '#059669',
      700: '#047857',
      800: '#065F46',
      900: '#064E3B'
    },
    
    // Accent: Warm Orange/Saffron - Indian context, positivity
    accent: {
      DEFAULT: '#F97316',
      50: '#FFF7ED',
      100: '#FFEDD5',
      200: '#FED7AA',
      300: '#FDBA74',
      400: '#FB923C',
      500: '#F97316',
      600: '#EA580C',
      700: '#C2410C',
      800: '#9A3412',
      900: '#7C2D12'
    },
    
    // Neutral colors
    background: {
      DEFAULT: '#F9FAFB',
      light: '#FFFFFF',
      dark: '#F3F4F6',
      muted: '#E5E7EB'
    },
    
    text: {
      DEFAULT: '#1F2937',
      primary: '#111827',
      secondary: '#6B7280',
      muted: '#9CA3AF',
      inverse: '#FFFFFF'
    },
    
    // Status colors
    status: {
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#3B82F6'
    },
    
    // Border colors
    border: {
      DEFAULT: '#E5E7EB',
      light: '#F3F4F6',
      dark: '#D1D5DB'
    }
  },
  
  // Typography
  fonts: {
    primary: '"Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    secondary: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    mono: '"Fira Code", "Courier New", monospace'
  },
  
  fontSizes: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
    '6xl': '3.75rem'    // 60px
  },
  
  fontWeights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700
  },
  
  // Responsive breakpoints (mobile-first)
  breakpoints: {
    xs: '320px',   // Small phones
    sm: '640px',   // Large phones
    md: '768px',   // Tablets
    lg: '1024px',  // Laptops
    xl: '1280px',  // Desktops
    '2xl': '1440px' // Large desktops
  },
  
  // Spacing scale
  spacing: {
    0: '0',
    1: '0.25rem',   // 4px
    2: '0.5rem',    // 8px
    3: '0.75rem',   // 12px
    4: '1rem',      // 16px
    5: '1.25rem',   // 20px
    6: '1.5rem',    // 24px
    8: '2rem',      // 32px
    10: '2.5rem',   // 40px
    12: '3rem',     // 48px
    16: '4rem',     // 64px
    20: '5rem',     // 80px
    24: '6rem',     // 96px
    32: '8rem'      // 128px
  },
  
  // Border radius
  radius: {
    none: '0',
    sm: '0.25rem',    // 4px
    base: '0.375rem', // 6px
    md: '0.5rem',     // 8px
    lg: '0.75rem',    // 12px
    xl: '1rem',       // 16px
    '2xl': '1.5rem',  // 24px
    full: '9999px'
  },
  
  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    card: '0 2px 8px rgba(0, 0, 0, 0.08)',
    cardHover: '0 4px 16px rgba(0, 0, 0, 0.12)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    none: 'none'
  },
  
  // Transitions
  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    base: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    slower: '500ms cubic-bezier(0.4, 0, 0.2, 1)'
  },
  
  // Z-index layers
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070
  }
};

// CSS Custom Properties Generator
export const generateCSSVariables = () => {
  return `
    :root {
      /* Colors */
      --color-primary: ${theme.colors.primary.DEFAULT};
      --color-secondary: ${theme.colors.secondary.DEFAULT};
      --color-accent: ${theme.colors.accent.DEFAULT};
      --color-background: ${theme.colors.background.DEFAULT};
      --color-text: ${theme.colors.text.DEFAULT};
      
      /* Fonts */
      --font-primary: ${theme.fonts.primary};
      --font-secondary: ${theme.fonts.secondary};
      
      /* Transitions */
      --transition-fast: ${theme.transitions.fast};
      --transition-base: ${theme.transitions.base};
      --transition-slow: ${theme.transitions.slow};
    }
  `;
};

export default theme;
