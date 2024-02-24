import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    :root {
        /* Gray */
        --color-gray-0: #ffffff;
        --color-gray-50: #f9fafb;
        --color-gray-100: #f3f4f6;
        --color-gray-200: #e5e7eb;
        --color-gray-300: #d1d5db;
        --color-gray-400: #9ca3af;
        --color-gray-500: #6b7280;
        --color-gray-600: #4b5563;
        --color-gray-700: #374151;
        --color-gray-800: #1f2937;
        --color-gray-900: #111827;
        --color-gray-950: #030712;

        /* Border radius */
        --border-radius-sm: 6px;
        --border-radius-md: 8px;
        --border-radius-lg: 10px;
    }

    *, 
    *::before, 
    *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    html, body {
        font-family: 'Open Sans', sans-serif;
        font-size: 62.5%;
        color: var(--color-gray-800);
    }

    li {
        list-style: none;
    }

    a {
        text-decoration: none;
        color: var(--color-gray-800);
    }
`;

export default GlobalStyles;
