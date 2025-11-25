/**
 * ProgressBar component for progress tracking
 * @module components/ProgressBar
 */

import { write, clearLine, hideCursor, showCursor } from '../utils/terminal.js';
import { Text } from './Text.js';

/**
 * ProgressBar component for visualizing progress
 * @param {object} options - ProgressBar options
 * @returns {object} ProgressBar instance
 */
export function ProgressBar(options = {}) {
  const {
    total = 100,
    width = 40,
    complete = '█',
    incomplete = '░',
    showPercentage = true,
    showValue = false,
    completeColor = 'green',
    incompleteColor = 'gray'
  } = options;

  let current = 0;

  /**
   * Render the progress bar
   */
  function render() {
    const percentage = Math.min(100, Math.max(0, (current / total) * 100));
    const filled = Math.round((width * percentage) / 100);
    const empty = width - filled;

    const completeBar = Text({ text: complete.repeat(filled), color: completeColor }).toString();
    const incompleteBar = Text({ text: incomplete.repeat(empty), color: incompleteColor }).toString();

    let output = `[${completeBar}${incompleteBar}]`;

    if (showPercentage) {
      output += ` ${Math.round(percentage)}%`;
    }

    if (showValue) {
      output += ` (${current}/${total})`;
    }

    clearLine();
    write(output);
  }

  return {
    /**
     * Start the progress bar
     */
    start() {
      hideCursor();
      render();
      return this;
    },

    /**
     * Update the progress
     * @param {number} value - New current value
     */
    update(value) {
      current = Math.min(total, Math.max(0, value));
      render();
      return this;
    },

    /**
     * Increment the progress
     * @param {number} [amount=1] - Amount to increment
     */
    increment(amount = 1) {
      return this.update(current + amount);
    },

    /**
     * Complete the progress bar
     */
    complete() {
      current = total;
      render();
      write('\n');
      showCursor();
      return this;
    },

    /**
     * Stop the progress bar at current position
     */
    stop() {
      write('\n');
      showCursor();
      return this;
    },

    /**
     * Get current progress value
     * @returns {number} Current value
     */
    getCurrent() {
      return current;
    },

    /**
     * Get total value
     * @returns {number} Total value
     */
    getTotal() {
      return total;
    },

    /**
     * Get percentage complete
     * @returns {number} Percentage (0-100)
     */
    getPercentage() {
      return (current / total) * 100;
    }
  };
}

/**
 * Create a simple progress bar with minimal options
 * @param {number} total - Total value
 * @param {object} [options] - Additional options
 * @returns {object} ProgressBar instance
 */
ProgressBar.simple = (total, options = {}) => ProgressBar({ total, ...options });

export default ProgressBar;
