/**
 * Spinner component for loading animations
 * @module components/Spinner
 */

import { write, clearLine, hideCursor, showCursor } from '../utils/terminal.js';
import { Text } from './Text.js';

/**
 * Predefined spinner animations
 */
const SPINNERS = {
  dots: {
    frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'],
    interval: 80
  },
  line: {
    frames: ['-', '\\', '|', '/'],
    interval: 100
  },
  circle: {
    frames: ['◐', '◓', '◑', '◒'],
    interval: 120
  },
  square: {
    frames: ['◰', '◳', '◲', '◱'],
    interval: 120
  },
  arrow: {
    frames: ['←', '↖', '↑', '↗', '→', '↘', '↓', '↙'],
    interval: 100
  },
  bounce: {
    frames: ['⠁', '⠂', '⠄', '⠂'],
    interval: 120
  },
  box: {
    frames: ['▖', '▘', '▝', '▗'],
    interval: 100
  },
  star: {
    frames: ['✶', '✸', '✹', '✺', '✹', '✷'],
    interval: 100
  },
  toggle: {
    frames: ['⊶', '⊷'],
    interval: 250
  },
  grow: {
    frames: ['▁', '▃', '▄', '▅', '▆', '▇', '█', '▇', '▆', '▅', '▄', '▃'],
    interval: 100
  },
  pulse: {
    frames: ['●', '◉', '◎', '◉'],
    interval: 150
  },
  wave: {
    frames: ['▁', '▂', '▃', '▄', '▅', '▆', '▇', '█', '▇', '▆', '▅', '▄', '▃', '▂'],
    interval: 80
  }
};

/**
 * Spinner component for animated loading indicators
 * @param {object} options - Spinner options
 * @returns {object} Spinner instance with start/stop methods
 */
export function Spinner(options = {}) {
  const {
    type = 'dots',
    text = '',
    color = 'cyan',
    textColor = null
  } = options;

  const spinner = SPINNERS[type] || SPINNERS.dots;
  let currentFrame = 0;
  let intervalId = null;
  let isSpinning = false;

  /**
   * Render a single frame
   */
  function renderFrame() {
    clearLine();
    const frame = spinner.frames[currentFrame];
    const frameText = Text({ text: frame, color }).toString();
    const textPart = text ? (textColor ? Text({ text: ` ${text}`, color: textColor }).toString() : ` ${text}`) : '';
    write(frameText + textPart);
    currentFrame = (currentFrame + 1) % spinner.frames.length;
  }

  return {
    /**
     * Start the spinner animation
     * @param {string} [newText] - Optional text to display
     * @returns {object} Spinner instance
     */
    start(newText) {
      if (isSpinning) {
        return this;
      }

      if (newText !== undefined) {
        options.text = newText;
      }

      isSpinning = true;
      hideCursor();
      renderFrame();

      intervalId = setInterval(renderFrame, spinner.interval);
      return this;
    },

    /**
     * Stop the spinner animation
     * @param {string} [finalText] - Optional final text to display
     * @param {string} [symbol] - Optional symbol to replace spinner
     */
    stop(finalText, symbol) {
      if (!isSpinning) {
        return this;
      }

      isSpinning = false;
      clearInterval(intervalId);
      clearLine();

      if (finalText !== undefined) {
        const symbolText = symbol || '✓';
        const symbolColored = Text({ text: symbolText, color: 'green' }).toString();
        write(symbolColored + ` ${finalText}\n`);
      }

      showCursor();
      return this;
    },

    /**
     * Update the spinner text
     * @param {string} newText - New text to display
     */
    setText(newText) {
      options.text = newText;
      return this;
    },

    /**
     * Succeed and stop the spinner
     * @param {string} [text] - Success message
     */
    succeed(text) {
      return this.stop(text || options.text, '✓');
    },

    /**
     * Fail and stop the spinner
     * @param {string} [text] - Failure message
     */
    fail(text) {
      clearInterval(intervalId);
      isSpinning = false;
      clearLine();

      const finalText = text || options.text;
      const symbolText = '✗';
      const symbolColored = Text({ text: symbolText, color: 'red' }).toString();
      write(symbolColored + ` ${finalText}\n`);
      showCursor();
      return this;
    },

    /**
     * Warn and stop the spinner
     * @param {string} [text] - Warning message
     */
    warn(text) {
      clearInterval(intervalId);
      isSpinning = false;
      clearLine();

      const finalText = text || options.text;
      const symbolText = '⚠';
      const symbolColored = Text({ text: symbolText, color: 'yellow' }).toString();
      write(symbolColored + ` ${finalText}\n`);
      showCursor();
      return this;
    },

    /**
     * Check if spinner is currently running
     * @returns {boolean} True if spinning
     */
    isSpinning() {
      return isSpinning;
    }
  };
}

/**
 * Shorthand methods for different spinner types
 */
Spinner.dots = (text, options = {}) => Spinner({ type: 'dots', text, ...options });
Spinner.line = (text, options = {}) => Spinner({ type: 'line', text, ...options });
Spinner.circle = (text, options = {}) => Spinner({ type: 'circle', text, ...options });
Spinner.arrow = (text, options = {}) => Spinner({ type: 'arrow', text, ...options });

export default Spinner;
