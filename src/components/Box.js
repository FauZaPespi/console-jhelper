/**
 * Box component for bordered containers
 * @module components/Box
 */

import { visibleLength, stripAnsi } from '../utils/colors.js';
import { pad, addPadding, getMaxWidth } from '../utils/layout.js';
import { write, writeLine } from '../utils/terminal.js';
import { Text } from './Text.js';

/**
 * Border characters for different styles
 */
const BORDERS = {
  single: {
    topLeft: '┌',
    topRight: '┐',
    bottomLeft: '└',
    bottomRight: '┘',
    horizontal: '─',
    vertical: '│',
    topJoin: '┬',
    bottomJoin: '┴',
    leftJoin: '├',
    rightJoin: '┤',
    cross: '┼'
  },
  double: {
    topLeft: '╔',
    topRight: '╗',
    bottomLeft: '╚',
    bottomRight: '╝',
    horizontal: '═',
    vertical: '║',
    topJoin: '╦',
    bottomJoin: '╩',
    leftJoin: '╠',
    rightJoin: '╣',
    cross: '╬'
  },
  round: {
    topLeft: '╭',
    topRight: '╮',
    bottomLeft: '╰',
    bottomRight: '╯',
    horizontal: '─',
    vertical: '│',
    topJoin: '┬',
    bottomJoin: '┴',
    leftJoin: '├',
    rightJoin: '┤',
    cross: '┼'
  },
  bold: {
    topLeft: '┏',
    topRight: '┓',
    bottomLeft: '┗',
    bottomRight: '┛',
    horizontal: '━',
    vertical: '┃',
    topJoin: '┳',
    bottomJoin: '┻',
    leftJoin: '┣',
    rightJoin: '┫',
    cross: '╋'
  },
  classic: {
    topLeft: '+',
    topRight: '+',
    bottomLeft: '+',
    bottomRight: '+',
    horizontal: '-',
    vertical: '|',
    topJoin: '+',
    bottomJoin: '+',
    leftJoin: '+',
    rightJoin: '+',
    cross: '+'
  }
};

/**
 * Box component for creating bordered containers
 * @param {object} options - Box options
 * @returns {object} Box component with render methods
 */
export function Box(options = {}) {
  const {
    content = '',
    title = '',
    titleAlign = 'left',
    width = null,
    height = null,
    padding = 1,
    borderStyle = 'single',
    borderColor = null,
    align = 'left',
    valign = 'top'
  } = options;

  const border = BORDERS[borderStyle] || BORDERS.single;

  /**
   * Build the box as a string
   * @returns {string} Rendered box
   */
  function build() {
    const lines = content.split('\n');

    // Calculate dimensions
    const contentWidth = width || Math.max(getMaxWidth(content), visibleLength(title) + 2);
    const innerWidth = contentWidth;

    // Add padding to content
    const paddingValue = typeof padding === 'number'
      ? { top: padding, right: padding, bottom: padding, left: padding }
      : padding;

    const paddedLines = [];

    // Top padding
    for (let i = 0; i < paddingValue.top; i++) {
      paddedLines.push('');
    }

    // Content lines with side padding
    for (const line of lines) {
      const leftPad = ' '.repeat(paddingValue.left);
      const rightPad = ' '.repeat(paddingValue.right);
      const contentLine = pad(line, innerWidth - paddingValue.left - paddingValue.right, align);
      paddedLines.push(leftPad + contentLine + rightPad);
    }

    // Bottom padding
    for (let i = 0; i < paddingValue.bottom; i++) {
      paddedLines.push('');
    }

    // Apply height constraint if specified
    const finalLines = height
      ? fitToHeight(paddedLines, height - 2, valign)
      : paddedLines;

    // Build the box
    const result = [];
    const boxWidth = innerWidth;

    // Apply border color if specified
    const colorize = borderColor
      ? (text) => Text({ text, color: borderColor }).toString()
      : (text) => text;

    // Top border with optional title
    if (title) {
      const titleText = ` ${title} `;
      const titleLen = visibleLength(titleText);
      const remainingWidth = boxWidth - titleLen;

      if (titleAlign === 'center') {
        const leftWidth = Math.floor(remainingWidth / 2);
        const rightWidth = remainingWidth - leftWidth;
        result.push(
          colorize(border.topLeft + border.horizontal.repeat(leftWidth)) +
          titleText +
          colorize(border.horizontal.repeat(rightWidth) + border.topRight)
        );
      } else if (titleAlign === 'right') {
        result.push(
          colorize(border.topLeft + border.horizontal.repeat(remainingWidth)) +
          titleText +
          colorize(border.topRight)
        );
      } else {
        result.push(
          colorize(border.topLeft) +
          titleText +
          colorize(border.horizontal.repeat(remainingWidth) + border.topRight)
        );
      }
    } else {
      result.push(colorize(border.topLeft + border.horizontal.repeat(boxWidth) + border.topRight));
    }

    // Content lines
    for (const line of finalLines) {
      const paddedLine = pad(line, boxWidth, 'left');
      result.push(colorize(border.vertical) + paddedLine + colorize(border.vertical));
    }

    // Bottom border
    result.push(colorize(border.bottomLeft + border.horizontal.repeat(boxWidth) + border.bottomRight));

    return result.join('\n');
  }

  /**
   * Fit lines to a specific height
   * @private
   */
  function fitToHeight(lines, targetHeight, valign) {
    if (lines.length === targetHeight) {
      return lines;
    }

    if (lines.length < targetHeight) {
      const emptyLines = targetHeight - lines.length;
      const emptyLine = '';

      if (valign === 'center') {
        const topEmpty = Math.floor(emptyLines / 2);
        const bottomEmpty = emptyLines - topEmpty;
        return [
          ...Array(topEmpty).fill(emptyLine),
          ...lines,
          ...Array(bottomEmpty).fill(emptyLine)
        ];
      } else if (valign === 'bottom') {
        return [...Array(emptyLines).fill(emptyLine), ...lines];
      } else {
        return [...lines, ...Array(emptyLines).fill(emptyLine)];
      }
    }

    return lines.slice(0, targetHeight);
  }

  return {
    /**
     * Render the box to a string
     * @returns {string} Rendered box
     */
    toString() {
      return build();
    },

    /**
     * Print the box to stdout
     */
    print() {
      writeLine(build());
    }
  };
}

/**
 * Shorthand methods for different border styles
 */
Box.single = (content, options = {}) => Box({ content, borderStyle: 'single', ...options });
Box.double = (content, options = {}) => Box({ content, borderStyle: 'double', ...options });
Box.round = (content, options = {}) => Box({ content, borderStyle: 'round', ...options });
Box.bold = (content, options = {}) => Box({ content, borderStyle: 'bold', ...options });
Box.classic = (content, options = {}) => Box({ content, borderStyle: 'classic', ...options });

export default Box;
