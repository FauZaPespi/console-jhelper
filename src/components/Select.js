/**
 * Select component for interactive menu selection
 * @module components/Select
 */

import { stdin as input, stdout as output } from 'process';
import { write, writeLine, hideCursor, showCursor, clearLine, cursorUp, setRawMode } from '../utils/terminal.js';
import { Text } from './Text.js';

/**
 * Select component for choosing from a list of options
 * @param {object} options - Select options
 * @returns {Promise<any>} Selected value
 */
export async function Select(options = {}) {
  const {
    message = 'Select an option:',
    choices = [],
    defaultValue = null,
    pointer = '❯',
    margin = 1,
    messageColor = 'cyan',
    selectedColor = 'cyan',
    unselectedColor = null
  } = options;

  if (choices.length === 0) {
    throw new Error('Select requires at least one choice');
  }

  // Find default index
  let selectedIndex = 0;
  if (defaultValue !== null) {
    const defaultIndex = choices.findIndex(c =>
      (typeof c === 'object' ? c.value : c) === defaultValue
    );
    if (defaultIndex !== -1) {
      selectedIndex = defaultIndex;
    }
  }

  return new Promise((resolve) => {
    const restoreMode = setRawMode();

    // Display message
    if (message) {
      const messageText = Text({ text: message, color: messageColor }).toString();
      writeLine(messageText);
    }

    // Add margin
    if (margin > 0) {
      writeLine('');
    }

    hideCursor();

    const renderMenu = () => {
      choices.forEach((choice, index) => {
        const label = typeof choice === 'object' ? choice.label : choice;
        const disabled = typeof choice === 'object' && choice.disabled;
        const isSelected = index === selectedIndex;

        clearLine();

        let line = '  ';

        if (isSelected) {
          const pointerText = Text({ text: pointer, color: selectedColor, bold: true }).toString();
          line = pointerText + ' ';
        }

        if (disabled) {
          line += Text({ text: label, color: 'gray', dim: true }).toString();
          line += Text({ text: ' (disabled)', color: 'gray', dim: true, italic: true }).toString();
        } else if (isSelected) {
          line += Text({ text: label, color: selectedColor, bold: true }).toString();
        } else {
          line += unselectedColor ? Text({ text: label, color: unselectedColor }).toString() : label;
        }

        writeLine(line);
      });

      // Move cursor back to selected item
      cursorUp(choices.length - selectedIndex);
    };

    renderMenu();

    const onData = (data) => {
      const byte = data[0];
      const key = data.toString();

      // Enter key
      if (byte === 13) {
        const selected = choices[selectedIndex];
        const disabled = typeof selected === 'object' && selected.disabled;

        if (disabled) {
          return; // Don't allow selecting disabled items
        }

        // Clear the menu
        cursorUp(choices.length - selectedIndex);
        for (let i = 0; i < choices.length; i++) {
          clearLine();
          if (i < choices.length - 1) {
            writeLine('');
          }
        }
        cursorUp(choices.length - 1);

        // Show final selection
        const label = typeof selected === 'object' ? selected.label : selected;
        const finalText = Text({ text: `${pointer} ${label}`, color: selectedColor, bold: true }).toString();
        writeLine(finalText);

        input.removeListener('data', onData);
        restoreMode();
        showCursor();

        const value = typeof selected === 'object' ? selected.value : selected;
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

      // Up arrow or 'k'
      if (key === '\u001b[A' || key === 'k') {
        // Move cursor back to top of menu
        cursorUp(choices.length - selectedIndex);

        // Find previous non-disabled option
        let newIndex = selectedIndex;
        do {
          newIndex = (newIndex - 1 + choices.length) % choices.length;
        } while (
          typeof choices[newIndex] === 'object' &&
          choices[newIndex].disabled &&
          newIndex !== selectedIndex
        );

        selectedIndex = newIndex;
        renderMenu();
        return;
      }

      // Down arrow or 'j'
      if (key === '\u001b[B' || key === 'j') {
        // Move cursor back to top of menu
        cursorUp(choices.length - selectedIndex);

        // Find next non-disabled option
        let newIndex = selectedIndex;
        do {
          newIndex = (newIndex + 1) % choices.length;
        } while (
          typeof choices[newIndex] === 'object' &&
          choices[newIndex].disabled &&
          newIndex !== selectedIndex
        );

        selectedIndex = newIndex;
        renderMenu();
        return;
      }
    };

    input.on('data', onData);
  });
}

/**
 * Create a simple select menu
 * @param {string} message - Message to display
 * @param {Array} choices - Array of choices
 * @param {object} [options] - Additional options
 * @returns {Promise<any>} Selected value
 */
Select.menu = (message, choices, options = {}) => {
  return Select({ message, choices, ...options });
};

export default Select;
