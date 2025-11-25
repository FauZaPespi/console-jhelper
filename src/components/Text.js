/**
 * Text component for styled console output
 * @module components/Text
 */

import { ANSI, rgb, bgRgb, hex, bgHex } from '../utils/colors.js';
import { write, writeLine } from '../utils/terminal.js';

/**
 * Text component for styled output
 * @param {string|object} textOrOptions - Text string or options object
 * @param {object} [options] - Options when first param is string
 * @returns {object} Text component with render method
 */
export function Text(textOrOptions, options = {}) {
  const opts = typeof textOrOptions === 'string'
    ? { text: textOrOptions, ...options }
    : textOrOptions;

  const {
    text = '',
    color = null,
    bgColor = null,
    bold = false,
    dim = false,
    italic = false,
    underline = false,
    strikethrough = false,
    inverse = false,
    blink = false
  } = opts;

  /**
   * Build the styled text string
   * @returns {string} Styled text with ANSI codes
   */
  function build() {
    let result = '';

    // Apply styles
    if (bold) result += ANSI.bold;
    if (dim) result += ANSI.dim;
    if (italic) result += ANSI.italic;
    if (underline) result += ANSI.underline;
    if (strikethrough) result += ANSI.strikethrough;
    if (inverse) result += ANSI.inverse;
    if (blink) result += ANSI.blink;

    // Apply colors
    if (color) {
      if (color.startsWith('#')) {
        result += hex(color);
      } else if (typeof color === 'object' && color.r !== undefined) {
        result += rgb(color.r, color.g, color.b);
      } else if (ANSI.fg[color]) {
        result += ANSI.fg[color];
      }
    }

    if (bgColor) {
      if (bgColor.startsWith('#')) {
        result += bgHex(bgColor);
      } else if (typeof bgColor === 'object' && bgColor.r !== undefined) {
        result += bgRgb(bgColor.r, bgColor.g, bgColor.b);
      } else if (ANSI.bg[bgColor]) {
        result += ANSI.bg[bgColor];
      }
    }

    // Add text
    result += text;

    // Reset
    result += ANSI.reset;

    return result;
  }

  return {
    /**
     * Render the text to a string
     * @returns {string} Styled text
     */
    toString() {
      return build();
    },

    /**
     * Print the text to stdout
     * @param {boolean} newline - Whether to add a newline
     */
    print(newline = true) {
      const output = build();
      if (newline) {
        writeLine(output);
      } else {
        write(output);
      }
    },

    /**
     * Get the text content
     * @returns {string} Plain text without styling
     */
    getText() {
      return text;
    }
  };
}

/**
 * Create styled text with specific color
 * @param {string} text - Text to style
 * @param {string} color - Color name, hex, or rgb object
 * @returns {object} Text component
 */
Text.color = (text, color) => Text({ text, color });

/**
 * Shorthand methods for common colors
 */
Text.red = (text) => Text({ text, color: 'red' });
Text.green = (text) => Text({ text, color: 'green' });
Text.yellow = (text) => Text({ text, color: 'yellow' });
Text.blue = (text) => Text({ text, color: 'blue' });
Text.magenta = (text) => Text({ text, color: 'magenta' });
Text.cyan = (text) => Text({ text, color: 'cyan' });
Text.white = (text) => Text({ text, color: 'white' });
Text.gray = (text) => Text({ text, color: 'gray' });

/**
 * Shorthand methods for common styles
 */
Text.bold = (text) => Text({ text, bold: true });
Text.dim = (text) => Text({ text, dim: true });
Text.italic = (text) => Text({ text, italic: true });
Text.underline = (text) => Text({ text, underline: true });
Text.strikethrough = (text) => Text({ text, strikethrough: true });
Text.inverse = (text) => Text({ text, inverse: true });

export default Text;
