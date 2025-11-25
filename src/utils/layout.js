/**
 * Layout utilities for positioning and alignment
 * @module utils/layout
 */

import { stripAnsi, visibleLength } from './colors.js';
import { getSize } from './terminal.js';

/**
 * Pad a string to a specific width
 * @param {string} str - String to pad
 * @param {number} width - Target width
 * @param {string} align - Alignment: 'left', 'center', 'right'
 * @param {string} char - Padding character
 * @returns {string} Padded string
 */
export function pad(str, width, align = 'left', char = ' ') {
  const visible = visibleLength(str);
  const padding = Math.max(0, width - visible);

  if (align === 'center') {
    const leftPad = Math.floor(padding / 2);
    const rightPad = padding - leftPad;
    return char.repeat(leftPad) + str + char.repeat(rightPad);
  } else if (align === 'right') {
    return char.repeat(padding) + str;
  } else {
    return str + char.repeat(padding);
  }
}

/**
 * Center text horizontally in terminal
 * @param {string} text - Text to center
 * @param {number} [width] - Width to center in (defaults to terminal width)
 * @returns {string} Centered text
 */
export function center(text, width) {
  const targetWidth = width || getSize().width;
  return pad(text, targetWidth, 'center');
}

/**
 * Add margin to text
 * @param {string} text - Text to add margin to
 * @param {number|object} margin - Margin size or {top, right, bottom, left}
 * @returns {string} Text with margin
 */
export function addMargin(text, margin) {
  const lines = text.split('\n');

  let top = 0, right = 0, bottom = 0, left = 0;

  if (typeof margin === 'number') {
    top = right = bottom = left = margin;
  } else {
    top = margin.top || 0;
    right = margin.right || 0;
    bottom = margin.bottom || 0;
    left = margin.left || 0;
  }

  const leftPad = ' '.repeat(left);
  const rightPad = ' '.repeat(right);

  const paddedLines = lines.map(line => leftPad + line + rightPad);

  const topLines = Array(top).fill('');
  const bottomLines = Array(bottom).fill('');

  return [...topLines, ...paddedLines, ...bottomLines].join('\n');
}

/**
 * Add padding inside a container
 * @param {string} text - Text to pad
 * @param {number|object} padding - Padding size or {top, right, bottom, left}
 * @returns {string} Padded text
 */
export function addPadding(text, padding) {
  return addMargin(text, padding);
}

/**
 * Wrap text to fit within a specific width
 * @param {string} text - Text to wrap
 * @param {number} width - Maximum width
 * @param {boolean} preserveNewlines - Whether to preserve existing newlines
 * @returns {string} Wrapped text
 */
export function wrap(text, width, preserveNewlines = true) {
  if (preserveNewlines) {
    return text.split('\n').map(line => wrapLine(line, width)).join('\n');
  }
  return wrapLine(text.replace(/\n/g, ' '), width);
}

/**
 * Wrap a single line of text
 * @private
 * @param {string} line - Line to wrap
 * @param {number} width - Maximum width
 * @returns {string} Wrapped line
 */
function wrapLine(line, width) {
  const words = line.split(' ');
  const lines = [];
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine ? currentLine + ' ' + word : word;
    const testLength = visibleLength(testLine);

    if (testLength <= width) {
      currentLine = testLine;
    } else {
      if (currentLine) {
        lines.push(currentLine);
      }
      currentLine = word;
    }
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines.join('\n');
}

/**
 * Truncate text to fit within width
 * @param {string} text - Text to truncate
 * @param {number} width - Maximum width
 * @param {string} ellipsis - Ellipsis string to append
 * @returns {string} Truncated text
 */
export function truncate(text, width, ellipsis = '...') {
  const visible = visibleLength(text);
  if (visible <= width) {
    return text;
  }

  const clean = stripAnsi(text);
  const truncated = clean.substring(0, width - ellipsis.length);
  return truncated + ellipsis;
}

/**
 * Get the maximum line width from multi-line text
 * @param {string} text - Multi-line text
 * @returns {number} Maximum width
 */
export function getMaxWidth(text) {
  const lines = text.split('\n');
  return Math.max(...lines.map(line => visibleLength(line)));
}
