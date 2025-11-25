/**
 * ANSI color codes and utilities
 * @module utils/colors
 */

/**
 * ANSI escape codes for text styling
 */
export const ANSI = {
  reset: '\x1b[0m',

  // Text styles
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  italic: '\x1b[3m',
  underline: '\x1b[4m',
  blink: '\x1b[5m',
  inverse: '\x1b[7m',
  hidden: '\x1b[8m',
  strikethrough: '\x1b[9m',

  // Foreground colors
  fg: {
    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',
    gray: '\x1b[90m',
    brightRed: '\x1b[91m',
    brightGreen: '\x1b[92m',
    brightYellow: '\x1b[93m',
    brightBlue: '\x1b[94m',
    brightMagenta: '\x1b[95m',
    brightCyan: '\x1b[96m',
    brightWhite: '\x1b[97m',
  },

  // Background colors
  bg: {
    black: '\x1b[40m',
    red: '\x1b[41m',
    green: '\x1b[42m',
    yellow: '\x1b[43m',
    blue: '\x1b[44m',
    magenta: '\x1b[45m',
    cyan: '\x1b[46m',
    white: '\x1b[47m',
    gray: '\x1b[100m',
    brightRed: '\x1b[101m',
    brightGreen: '\x1b[102m',
    brightYellow: '\x1b[103m',
    brightBlue: '\x1b[104m',
    brightMagenta: '\x1b[105m',
    brightCyan: '\x1b[106m',
    brightWhite: '\x1b[107m',
  }
};

/**
 * Generate RGB color code for 256 color mode
 * @param {number} r - Red (0-255)
 * @param {number} g - Green (0-255)
 * @param {number} b - Blue (0-255)
 * @returns {string} ANSI color code
 */
export function rgb(r, g, b) {
  return `\x1b[38;2;${r};${g};${b}m`;
}

/**
 * Generate RGB background color code
 * @param {number} r - Red (0-255)
 * @param {number} g - Green (0-255)
 * @param {number} b - Blue (0-255)
 * @returns {string} ANSI color code
 */
export function bgRgb(r, g, b) {
  return `\x1b[48;2;${r};${g};${b}m`;
}

/**
 * Convert hex color to RGB ANSI code
 * @param {string} hex - Hex color (e.g., '#FF0000' or 'FF0000')
 * @returns {string} ANSI color code
 */
export function hex(hex) {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return rgb(r, g, b);
}

/**
 * Convert hex color to RGB background ANSI code
 * @param {string} hex - Hex color (e.g., '#FF0000' or 'FF0000')
 * @returns {string} ANSI color code
 */
export function bgHex(hex) {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return bgRgb(r, g, b);
}

/**
 * Strip ANSI codes from a string
 * @param {string} str - String with ANSI codes
 * @returns {string} Clean string
 */
export function stripAnsi(str) {
  return str.replace(/\x1b\[[0-9;]*m/g, '');
}

/**
 * Get the visible length of a string (excluding ANSI codes)
 * @param {string} str - String to measure
 * @returns {number} Visible length
 */
export function visibleLength(str) {
  return stripAnsi(str).length;
}
