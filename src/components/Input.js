/**
 * Input component for user text input
 * @module components/Input
 */

import { stdin as input, stdout as output } from 'process';
import { write, writeLine, hideCursor, showCursor, clearLine, setRawMode } from '../utils/terminal.js';
import { Text } from './Text.js';

/**
 * Input component for collecting user text input
 * @param {object} options - Input options
 * @returns {Promise<string>} User input
 */
export async function Input(options = {}) {
  const {
    prompt = '',
    defaultValue = '',
    placeholder = '',
    validate = null,
    mask = false,
    maxLength = null,
    promptColor = 'cyan'
  } = options;

  return new Promise((resolve) => {
    let value = defaultValue;
    let cursorPos = value.length;

    const restoreMode = setRawMode();

    // Display prompt
    if (prompt) {
      const promptText = Text({ text: prompt + ' ', color: promptColor }).toString();
      write(promptText);
    }

    // Show placeholder or default value
    if (value) {
      write(value);
    } else if (placeholder) {
      const placeholderText = Text({ text: placeholder, color: 'gray', dim: true }).toString();
      write(placeholderText);
      clearLine();
      if (prompt) {
        const promptText = Text({ text: prompt + ' ', color: promptColor }).toString();
        write(promptText);
      }
    }

    const onData = (data) => {
      const byte = data[0];

      // Enter key
      if (byte === 13) {
        input.removeListener('data', onData);
        restoreMode();
        writeLine('');

        // Validate if validator provided
        if (validate) {
          const error = validate(value);
          if (error) {
            const errorText = Text({ text: `✗ ${error}`, color: 'red' }).toString();
            writeLine(errorText);
            return Input(options).then(resolve);
          }
        }

        resolve(value);
        return;
      }

      // Ctrl+C
      if (byte === 3) {
        input.removeListener('data', onData);
        restoreMode();
        showCursor();
        writeLine('\n');
        process.exit(0);
      }

      // Backspace or Delete
      if (byte === 127 || byte === 8) {
        if (cursorPos > 0) {
          value = value.slice(0, cursorPos - 1) + value.slice(cursorPos);
          cursorPos--;
          updateDisplay();
        }
        return;
      }

      // Delete key (ESC sequence)
      if (byte === 27) {
        return;
      }

      // Arrow keys and other control sequences
      if (byte < 32) {
        return;
      }

      // Regular character
      const char = data.toString('utf8');

      // Check max length
      if (maxLength && value.length >= maxLength) {
        return;
      }

      value = value.slice(0, cursorPos) + char + value.slice(cursorPos);
      cursorPos++;
      updateDisplay();
    };

    function updateDisplay() {
      // Clear line and rewrite
      clearLine();

      if (prompt) {
        const promptText = Text({ text: prompt + ' ', color: promptColor }).toString();
        write(promptText);
      }

      const displayValue = mask ? '•'.repeat(value.length) : value;
      write(displayValue);
    }

    input.on('data', onData);
  });
}

/**
 * Create a password input (masked)
 * @param {string} prompt - Prompt text
 * @param {object} [options] - Additional options
 * @returns {Promise<string>} User input
 */
Input.password = (prompt, options = {}) => {
  return Input({ prompt, mask: true, ...options });
};

/**
 * Create a simple text input
 * @param {string} prompt - Prompt text
 * @param {object} [options] - Additional options
 * @returns {Promise<string>} User input
 */
Input.text = (prompt, options = {}) => {
  return Input({ prompt, ...options });
};

/**
 * Confirm prompt (yes/no)
 * @param {string} prompt - Prompt text
 * @param {boolean} [defaultValue=false] - Default value
 * @returns {Promise<boolean>} User confirmation
 */
Input.confirm = async (prompt, defaultValue = false) => {
  const suffix = defaultValue ? ' (Y/n)' : ' (y/N)';
  const fullPrompt = prompt + suffix;

  const answer = await Input({ prompt: fullPrompt, promptColor: 'yellow' });
  const normalized = answer.toLowerCase().trim();

  if (normalized === '') {
    return defaultValue;
  }

  return normalized === 'y' || normalized === 'yes';
};

export default Input;
