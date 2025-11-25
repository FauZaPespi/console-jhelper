/**
 * Table component for displaying tabular data
 * @module components/Table
 */

import { visibleLength } from '../utils/colors.js';
import { pad } from '../utils/layout.js';
import { writeLine } from '../utils/terminal.js';
import { Text } from './Text.js';

/**
 * Border characters for tables
 */
const TABLE_BORDERS = {
  single: {
    topLeft: '┌',
    topRight: '┐',
    topJoin: '┬',
    bottomLeft: '└',
    bottomRight: '┘',
    bottomJoin: '┴',
    leftJoin: '├',
    rightJoin: '┤',
    middleJoin: '┼',
    horizontal: '─',
    vertical: '│'
  },
  double: {
    topLeft: '╔',
    topRight: '╗',
    topJoin: '╦',
    bottomLeft: '╚',
    bottomRight: '╝',
    bottomJoin: '╩',
    leftJoin: '╠',
    rightJoin: '╣',
    middleJoin: '╬',
    horizontal: '═',
    vertical: '║'
  },
  round: {
    topLeft: '╭',
    topRight: '╮',
    topJoin: '┬',
    bottomLeft: '╰',
    bottomRight: '╯',
    bottomJoin: '┴',
    leftJoin: '├',
    rightJoin: '┤',
    middleJoin: '┼',
    horizontal: '─',
    vertical: '│'
  }
};

/**
 * Table component for displaying data in rows and columns
 * @param {object} options - Table options
 * @returns {object} Table component
 */
export function Table(options = {}) {
  const {
    headers = [],
    rows = [],
    columnWidths = null,
    padding = 1,
    borderStyle = 'single',
    headerColor = 'cyan',
    borderColor = null,
    align = 'left',
    showHeaders = true
  } = options;

  const border = TABLE_BORDERS[borderStyle] || TABLE_BORDERS.single;

  /**
   * Calculate column widths
   */
  function calculateColumnWidths() {
    if (columnWidths) {
      return columnWidths;
    }

    const numColumns = Math.max(headers.length, ...rows.map(r => r.length));
    const widths = new Array(numColumns).fill(0);

    // Check header widths
    if (showHeaders) {
      headers.forEach((header, i) => {
        const width = visibleLength(String(header));
        widths[i] = Math.max(widths[i], width);
      });
    }

    // Check row widths
    rows.forEach(row => {
      row.forEach((cell, i) => {
        const width = visibleLength(String(cell));
        widths[i] = Math.max(widths[i], width);
      });
    });

    return widths;
  }

  /**
   * Build the table
   */
  function build() {
    const widths = calculateColumnWidths();
    const result = [];

    const colorize = borderColor
      ? (text) => Text({ text, color: borderColor }).toString()
      : (text) => text;

    // Top border
    const topBorder = colorize(border.topLeft) +
      widths.map(w => colorize(border.horizontal.repeat(w + padding * 2))).join(colorize(border.topJoin)) +
      colorize(border.topRight);
    result.push(topBorder);

    // Headers
    if (showHeaders && headers.length > 0) {
      const headerCells = headers.map((header, i) => {
        const cellAlign = Array.isArray(align) ? (align[i] || 'left') : align;
        const content = pad(String(header), widths[i], cellAlign);
        const paddedContent = ' '.repeat(padding) + content + ' '.repeat(padding);
        return headerColor ? Text({ text: paddedContent, color: headerColor, bold: true }).toString() : paddedContent;
      });

      const headerRow = colorize(border.vertical) +
        headerCells.join(colorize(border.vertical)) +
        colorize(border.vertical);
      result.push(headerRow);

      // Header separator
      const headerSep = colorize(border.leftJoin) +
        widths.map(w => colorize(border.horizontal.repeat(w + padding * 2))).join(colorize(border.middleJoin)) +
        colorize(border.rightJoin);
      result.push(headerSep);
    }

    // Data rows
    rows.forEach((row, rowIndex) => {
      const cells = row.map((cell, i) => {
        const cellAlign = Array.isArray(align) ? (align[i] || 'left') : align;
        const content = pad(String(cell), widths[i], cellAlign);
        return ' '.repeat(padding) + content + ' '.repeat(padding);
      });

      const dataRow = colorize(border.vertical) +
        cells.join(colorize(border.vertical)) +
        colorize(border.vertical);
      result.push(dataRow);

      // Row separator (except for last row)
      if (rowIndex < rows.length - 1) {
        const rowSep = colorize(border.leftJoin) +
          widths.map(w => colorize(border.horizontal.repeat(w + padding * 2))).join(colorize(border.middleJoin)) +
          colorize(border.rightJoin);
        result.push(rowSep);
      }
    });

    // Bottom border
    const bottomBorder = colorize(border.bottomLeft) +
      widths.map(w => colorize(border.horizontal.repeat(w + padding * 2))).join(colorize(border.bottomJoin)) +
      colorize(border.bottomRight);
    result.push(bottomBorder);

    return result.join('\n');
  }

  return {
    /**
     * Render the table to a string
     * @returns {string} Rendered table
     */
    toString() {
      return build();
    },

    /**
     * Print the table to stdout
     */
    print() {
      writeLine(build());
    }
  };
}

/**
 * Create a simple table
 * @param {Array} headers - Column headers
 * @param {Array} rows - Data rows
 * @param {object} [options] - Additional options
 * @returns {object} Table component
 */
Table.simple = (headers, rows, options = {}) => {
  return Table({ headers, rows, ...options });
};

/**
 * Create a table from array of objects
 * @param {Array} data - Array of objects
 * @param {object} [options] - Additional options
 * @returns {object} Table component
 */
Table.fromObjects = (data, options = {}) => {
  if (data.length === 0) {
    return Table(options);
  }

  const headers = Object.keys(data[0]);
  const rows = data.map(obj => headers.map(key => obj[key]));

  return Table({ headers, rows, ...options });
};

export default Table;
