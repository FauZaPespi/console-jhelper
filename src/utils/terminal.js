/**
 * Terminal utilities and information
 * @module utils/terminal
 */

import { stdin as input, stdout as output } from 'process';

/**
 * Get terminal dimensions
 * @returns {{width: number, height: number}} Terminal size
 */
export function getSize() {
  return {
    width: output.columns || 80,
    height: output.rows || 24
  };
}

/**
 * Check if terminal supports colors
 * @returns {boolean} True if colors are supported
 */
export function supportsColor() {
  if (process.env.NO_COLOR) {
    return false;
  }

  if (process.env.FORCE_COLOR) {
    return true;
  }

  if (!output.isTTY) {
    return false;
  }

  return true;
}

/**
 * Clear the terminal screen
 */
export function clear() {
  output.write('\x1b[2J\x1b[H');
}

/**
 * Clear the current line
 */
export function clearLine() {
  output.write('\x1b[2K\r');
}

/**
 * Move cursor to position
 * @param {number} x - Column (0-based)
 * @param {number} y - Row (0-based)
 */
export function moveCursor(x, y) {
  output.write(`\x1b[${y + 1};${x + 1}H`);
}

/**
 * Hide cursor
 */
export function hideCursor() {
  output.write('\x1b[?25l');
}

/**
 * Show cursor
 */
export function showCursor() {
  output.write('\x1b[?25h');
}

/**
 * Move cursor up
 * @param {number} lines - Number of lines to move up
 */
export function cursorUp(lines = 1) {
  output.write(`\x1b[${lines}A`);
}

/**
 * Move cursor down
 * @param {number} lines - Number of lines to move down
 */
export function cursorDown(lines = 1) {
  output.write(`\x1b[${lines}B`);
}

/**
 * Save cursor position
 */
export function saveCursor() {
  output.write('\x1b[s');
}

/**
 * Restore cursor position
 */
export function restoreCursor() {
  output.write('\x1b[u');
}

/**
 * Enable alternate screen buffer (full-screen mode)
 */
export function enableAlternateScreen() {
  output.write('\x1b[?1049h');
}

/**
 * Disable alternate screen buffer
 */
export function disableAlternateScreen() {
  output.write('\x1b[?1049l');
}

/**
 * Set raw mode for input (for interactive components)
 * @returns {Function} Cleanup function to restore original mode
 */
export function setRawMode() {
  if (!input.isTTY) {
    return () => {};
  }

  const wasRaw = input.isRaw;
  input.setRawMode(true);

  return () => {
    if (input.isTTY) {
      input.setRawMode(wasRaw);
    }
  };
}

/**
 * Write to stdout
 * @param {string} text - Text to write
 */
export function write(text) {
  output.write(text);
}

/**
 * Write to stdout with newline
 * @param {string} text - Text to write
 */
export function writeLine(text) {
  output.write(text + '\n');
}
