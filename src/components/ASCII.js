/**
 * ASCII art utilities and generators
 * @module components/ASCII
 */

import { Text } from './Text.js';
import { writeLine } from '../utils/terminal.js';

/**
 * Predefined ASCII art fonts for text
 */
const FONTS = {
  standard: {
    A: ['  ▄▀▀▄  ', ' ▄▀▀▀▀▄ ', '█▀▀▀▀▀█', '█     █'],
    B: ['█▀▀▀▀▄ ', '█▄▄▄▄▀ ', '█    ▀▄', '█▄▄▄▄▀ '],
    C: [' ▄▀▀▀▀▄', '█      ', '█      ', ' ▀▄▄▄▄▀'],
    D: ['█▀▀▀▀▄ ', '█    ▀▄', '█     █', '█▄▄▄▄▀ '],
    E: ['█▀▀▀▀▀', '█▀▀▀▀ ', '█     ', '█▄▄▄▄▄'],
    F: ['█▀▀▀▀▀', '█▀▀▀▀ ', '█     ', '█     '],
    G: [' ▄▀▀▀▀▄', '█      ', '█   ▄▄█', ' ▀▄▄▄▀ '],
    H: ['█     █', '█▀▀▀▀▀█', '█     █', '█     █'],
    I: ['█▀▀▀▀█', '  ██  ', '  ██  ', '█▄▄▄▄█'],
    J: ['   ▄▄█', '     █', '█    █', ' ▀▄▄▀ '],
    K: ['█   ▄▀', '█▀▀▀  ', '█   ▀▄', '█    ▀▄'],
    L: ['█     ', '█     ', '█     ', '█▄▄▄▄▄'],
    M: ['█▀█▀█ ', '█ ▀ █ ', '█   █ ', '█   █ '],
    N: ['█▄   █', '█ ▀▄ █', '█   ▀█', '█    █'],
    O: [' ▄▀▀▀▄ ', '█     █', '█     █', ' ▀▄▄▄▀ '],
    P: ['█▀▀▀▀▄', '█▄▄▄▄▀', '█     ', '█     '],
    Q: [' ▄▀▀▀▄ ', '█     █', '█   ▄ █', ' ▀▄▄ ▀▄'],
    R: ['█▀▀▀▀▄', '█▄▄▄▄▀', '█   ▀▄', '█    ▀▄'],
    S: [' ▄▀▀▀▀▄', '▀▄▄    ', '    ▄▄▀', '▀▄▄▄▄▀ '],
    T: ['▀▀█▀▀▀▀', '  █    ', '  █    ', '  █    '],
    U: ['█     █', '█     █', '█     █', ' ▀▄▄▄▀ '],
    V: ['█     █', '█     █', ' █   █ ', '  ▀▄▀  '],
    W: ['█     █', '█  █  █', '█ █ █ █', ' █   █ '],
    X: ['█    █', ' █  █ ', '  ██  ', ' █  █ '],
    Y: ['█    █', ' █  █ ', '  ██  ', '  ██  '],
    Z: ['█▀▀▀▀█', '   ▄▀ ', ' ▄▀   ', '█▄▄▄▄█'],
    ' ': ['       ', '       ', '       ', '       ']
  },
  small: {
    A: ['▄▀█', '█▀█'],
    B: ['█▀▄', '█▄▀'],
    C: ['█▀▀', '▀▀▀'],
    D: ['█▀▄', '█▄▀'],
    E: ['█▀▀', '██▄'],
    F: ['█▀▀', '█▀ '],
    G: ['█▀▀', '█▄█'],
    H: ['█ █', '█▀█'],
    I: ['█', '█'],
    J: ['  █', '█▄█'],
    K: ['█▄▀', '█ █'],
    L: ['█  ', '█▄▄'],
    M: ['█▄█', '█ █'],
    N: ['█▄█', '█ █'],
    O: ['█▀█', '█▄█'],
    P: ['█▀█', '█▀ '],
    Q: ['▄▀█', '█ ▄'],
    R: ['█▀█', '█▀▄'],
    S: ['█▀▀', '▄██'],
    T: ['▀█▀', ' █ '],
    U: ['█ █', '█▄█'],
    V: ['█ █', ' ▀ '],
    W: ['█ █', '▀▄▀'],
    X: ['▀▄▀', '█ █'],
    Y: ['█ █', ' █ '],
    Z: ['▀█▀', '█▄▄'],
    ' ': ['   ', '   ']
  }
};

/**
 * ASCII component for creating ASCII art
 * @param {object} options - ASCII options
 * @returns {object} ASCII component
 */
export function ASCII(options = {}) {
  const {
    text = '',
    font = 'standard',
    color = null,
    align = 'left'
  } = options;

  /**
   * Build the ASCII art
   */
  function build() {
    const selectedFont = FONTS[font] || FONTS.standard;
    const chars = text.toUpperCase().split('');

    // Get height from first character
    const height = selectedFont[chars[0]] ? selectedFont[chars[0]].length : 0;
    const lines = Array(height).fill('');

    // Build each line
    for (let i = 0; i < height; i++) {
      for (const char of chars) {
        const charLines = selectedFont[char] || selectedFont[' '];
        lines[i] += charLines[i] || ' '.repeat(charLines[0].length);
      }
    }

    let result = lines.join('\n');

    if (color) {
      result = Text({ text: result, color }).toString();
    }

    return result;
  }

  return {
    /**
     * Render to string
     * @returns {string} ASCII art
     */
    toString() {
      return build();
    },

    /**
     * Print to stdout
     */
    print() {
      writeLine(build());
    }
  };
}

/**
 * Predefined ASCII art shapes and patterns
 */
ASCII.shapes = {
  /**
   * Create a banner with text
   */
  banner(text, options = {}) {
    const { char = '=', width = 60, color = null } = options;
    const line = char.repeat(width);
    const textLine = text ? ` ${text} `.padStart((width + text.length) / 2).padEnd(width) : '';

    const result = [line, textLine, line].filter(l => l).join('\n');
    return color ? Text({ text: result, color }).toString() : result;
  },

  /**
   * Create a horizontal line
   */
  line(width = 60, char = '─', color = null) {
    const result = char.repeat(width);
    return color ? Text({ text: result, color }).toString() : result;
  },

  /**
   * Create a loading bar animation frame
   */
  loadingBar(progress, width = 30, color = 'cyan') {
    const filled = Math.round((width * progress) / 100);
    const bar = '█'.repeat(filled) + '░'.repeat(width - filled);
    return color ? Text({ text: bar, color }).toString() : bar;
  }
};

/**
 * Create ASCII text with specific font
 */
ASCII.text = (text, font = 'standard', options = {}) => {
  return ASCII({ text, font, ...options });
};

/**
 * Create large ASCII text
 */
ASCII.big = (text, options = {}) => {
  return ASCII({ text, font: 'standard', ...options });
};

/**
 * Create small ASCII text
 */
ASCII.small = (text, options = {}) => {
  return ASCII({ text, font: 'small', ...options });
};

export default ASCII;
