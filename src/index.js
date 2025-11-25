/**
 * console-helper - A powerful toolkit for creating beautiful terminal UIs
 * @module console-helper
 */

// Import components
import { Text } from './components/Text.js';
import { Box } from './components/Box.js';
import { Spinner } from './components/Spinner.js';
import { ProgressBar } from './components/ProgressBar.js';
import { Input } from './components/Input.js';
import { Select } from './components/Select.js';
import { Table } from './components/Table.js';
import { ASCII } from './components/ASCII.js';

// Import utilities
import { ANSI, rgb, bgRgb, hex, bgHex, stripAnsi, visibleLength } from './utils/colors.js';
import {
  getSize,
  supportsColor,
  clear,
  clearLine,
  moveCursor,
  hideCursor,
  showCursor,
  cursorUp,
  cursorDown,
  saveCursor,
  restoreCursor,
  enableAlternateScreen,
  disableAlternateScreen,
  write,
  writeLine
} from './utils/terminal.js';
import {
  pad,
  center,
  addMargin,
  addPadding,
  wrap,
  truncate,
  getMaxWidth
} from './utils/layout.js';

// Export components
export { Text, Box, Spinner, ProgressBar, Input, Select, Table, ASCII };

// Export utilities
export { ANSI, rgb, bgRgb, hex, bgHex, stripAnsi, visibleLength };
export {
  getSize,
  supportsColor,
  clear,
  clearLine,
  moveCursor,
  hideCursor,
  showCursor,
  cursorUp,
  cursorDown,
  saveCursor,
  restoreCursor,
  enableAlternateScreen,
  disableAlternateScreen,
  write,
  writeLine
};
export { pad, center, addMargin, addPadding, wrap, truncate, getMaxWidth };

// Default export
export default {
  // Components
  Text,
  Box,
  Spinner,
  ProgressBar,
  Input,
  Select,
  Table,
  ASCII,

  // Utilities
  colors: {
    ANSI,
    rgb,
    bgRgb,
    hex,
    bgHex,
    stripAnsi,
    visibleLength
  },
  terminal: {
    getSize,
    supportsColor,
    clear,
    clearLine,
    moveCursor,
    hideCursor,
    showCursor,
    cursorUp,
    cursorDown,
    saveCursor,
    restoreCursor,
    enableAlternateScreen,
    disableAlternateScreen,
    write,
    writeLine
  },
  layout: {
    pad,
    center,
    addMargin,
    addPadding,
    wrap,
    truncate,
    getMaxWidth
  }
};
