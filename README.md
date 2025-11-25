# console-helper

A powerful and easy-to-use toolkit for creating beautiful terminal UIs with Node.js. Build CLI applications with colors, borders, interactive components, animations, and more!

## Features

- **Text Styling** - Colors, bold, italic, underline, and more
- **Boxes** - Beautiful bordered containers with customizable styles
- **Tables** - Display tabular data with elegant formatting
- **Spinners** - Animated loading indicators with multiple styles
- **Progress Bars** - Visual progress tracking
- **Interactive Input** - Text input with validation and password masking
- **Select Menus** - Interactive option selection with keyboard navigation
- **ASCII Art** - Create large text banners and decorative elements
- **Layout Utilities** - Centering, padding, margins, and alignment
- **Zero Dependencies** - Built from scratch with no external dependencies
- **Full TypeScript Support** - JSDoc type definitions included

## Installation

```bash
npm install console-helper
```

## Quick Start

```javascript
import { Text, Box, Spinner } from 'console-helper';

// Styled text
Text.red('Hello, World!').print();
Text({ text: 'Bold and Blue', color: 'blue', bold: true }).print();

// Beautiful boxes
Box({
  content: 'This is a beautiful box!',
  title: 'Welcome',
  borderStyle: 'round',
  borderColor: 'cyan',
  padding: 2
}).print();

// Loading spinner
const spinner = Spinner({ text: 'Loading...', type: 'dots' });
spinner.start();
// ... do some work
spinner.succeed('Done!');
```

## Documentation

### Text

Create styled text with colors and formatting.

```javascript
import { Text } from 'console-helper';

// Color shortcuts
Text.red('Red text').print();
Text.green('Green text').print();
Text.blue('Blue text').print();
Text.yellow('Yellow text').print();
Text.cyan('Cyan text').print();
Text.magenta('Magenta text').print();

// Style shortcuts
Text.bold('Bold text').print();
Text.italic('Italic text').print();
Text.underline('Underlined text').print();
Text.strikethrough('Strikethrough text').print();

// Combined styles
Text({
  text: 'Custom styled text',
  color: 'cyan',
  bgColor: 'black',
  bold: true,
  underline: true
}).print();

// Hex colors
Text({ text: 'Hex color', color: '#FF5733' }).print();

// RGB colors
Text({ text: 'RGB color', color: { r: 255, g: 87, b: 51 } }).print();
```

### Box

Create bordered containers with titles and padding.

```javascript
import { Box } from 'console-helper';

// Simple box
Box({ content: 'Hello, World!' }).print();

// Box with title
Box({
  content: 'This is the content',
  title: 'Box Title',
  titleAlign: 'center', // 'left', 'center', 'right'
  padding: 2,
  borderStyle: 'round', // 'single', 'double', 'round', 'bold', 'classic'
  borderColor: 'cyan',
  width: 50
}).print();

// Multi-line content
Box({
  content: 'Line 1\nLine 2\nLine 3',
  title: 'Multi-line',
  borderStyle: 'double',
  padding: 1
}).print();

// Shortcuts
Box.single('Content', { title: 'Single Border' }).print();
Box.double('Content', { title: 'Double Border' }).print();
Box.round('Content', { title: 'Round Border' }).print();
Box.bold('Content', { title: 'Bold Border' }).print();
```

### Table

Display data in beautiful tables.

```javascript
import { Table } from 'console-helper';

// Simple table
Table.simple(
  ['Name', 'Age', 'City'],
  [
    ['Alice', '25', 'New York'],
    ['Bob', '30', 'London'],
    ['Charlie', '35', 'Tokyo']
  ]
).print();

// Customized table
Table({
  headers: ['Product', 'Price', 'Stock'],
  rows: [
    ['Laptop', '$999', '15'],
    ['Mouse', '$29', '150'],
    ['Keyboard', '$79', '80']
  ],
  borderStyle: 'double',
  borderColor: 'green',
  headerColor: 'yellow',
  align: ['left', 'right', 'right'], // per-column alignment
  padding: 2
}).print();

// From array of objects
const users = [
  { id: 1, name: 'Alice', status: 'active' },
  { id: 2, name: 'Bob', status: 'inactive' }
];

Table.fromObjects(users, {
  borderStyle: 'round',
  headerColor: 'cyan'
}).print();
```

### Spinner

Animated loading indicators.

```javascript
import { Spinner } from 'console-helper';

const spinner = Spinner({
  type: 'dots', // 'dots', 'line', 'circle', 'arrow', 'bounce', 'pulse', etc.
  text: 'Loading...',
  color: 'cyan'
});

spinner.start();

// Update text
spinner.setText('Processing...');

// Different endings
spinner.succeed('Success!'); // Green checkmark
spinner.fail('Failed!');     // Red X
spinner.warn('Warning!');    // Yellow warning
spinner.stop('Finished');    // Custom ending

// Shortcuts
const spinner2 = Spinner.dots('Loading...');
spinner2.start();
```

Available spinner types: `dots`, `line`, `circle`, `square`, `arrow`, `bounce`, `box`, `star`, `toggle`, `grow`, `pulse`, `wave`

### ProgressBar

Visual progress tracking.

```javascript
import { ProgressBar } from 'console-helper';

const progress = ProgressBar({
  total: 100,
  width: 50,
  complete: '█',
  incomplete: '░',
  showPercentage: true,
  showValue: true,
  completeColor: 'green',
  incompleteColor: 'gray'
});

progress.start();

// Update progress
progress.update(50);

// Increment
progress.increment(10);

// Complete
progress.complete();

// Simple usage
const pb = ProgressBar.simple(100);
pb.start();
for (let i = 0; i <= 100; i += 10) {
  pb.update(i);
  await sleep(100);
}
pb.complete();
```

### Input

Collect user input with validation.

```javascript
import { Input } from 'console-helper';

// Simple text input
const name = await Input.text('What is your name?');

// Input with validation
const age = await Input({
  prompt: 'How old are you?',
  validate: (value) => {
    const num = parseInt(value);
    if (isNaN(num)) return 'Please enter a valid number';
    if (num < 0) return 'Age cannot be negative';
    return null; // null means valid
  }
});

// Password input (masked)
const password = await Input.password('Enter password:');

// Confirmation
const confirmed = await Input.confirm('Continue?', true); // default: true
console.log(confirmed); // true or false

// With options
const email = await Input({
  prompt: 'Email address:',
  defaultValue: 'user@example.com',
  placeholder: 'Enter your email',
  maxLength: 50,
  promptColor: 'cyan'
});
```

### Select

Interactive menu selection.

```javascript
import { Select } from 'console-helper';

// Simple select
const color = await Select({
  message: 'What is your favorite color?',
  choices: ['Red', 'Green', 'Blue', 'Yellow']
});

// With objects and disabled items
const framework = await Select({
  message: 'Choose a framework:',
  choices: [
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'Angular', value: 'angular' },
    { label: 'jQuery (Legacy)', value: 'jquery', disabled: true }
  ],
  defaultValue: 'react',
  pointer: '❯',
  selectedColor: 'cyan'
});

// Shorthand
const option = await Select.menu('Pick one:', ['Option 1', 'Option 2', 'Option 3']);
```

**Navigation:**
- Arrow keys (↑/↓) or `j`/`k` to move
- Enter to select
- Ctrl+C to cancel

### ASCII

Create ASCII art and banners.

```javascript
import { ASCII } from 'console-helper';

// Large text
ASCII.big('HELLO').print();

// Small text
ASCII.small('WORLD').print();

// With color
ASCII({ text: 'COOL', font: 'standard', color: 'cyan' }).print();

// Banner
console.log(ASCII.shapes.banner('Welcome!', {
  char: '=',
  width: 60,
  color: 'yellow'
}));

// Horizontal line
console.log(ASCII.shapes.line(50, '─', 'cyan'));

// Loading bar
console.log(ASCII.shapes.loadingBar(75, 30, 'green')); // 75% progress
```

### Terminal Utilities

Low-level terminal control functions.

```javascript
import {
  clear,
  clearLine,
  hideCursor,
  showCursor,
  moveCursor,
  getSize
} from 'console-helper';

// Clear screen
clear();

// Clear current line
clearLine();

// Cursor control
hideCursor();
showCursor();
moveCursor(10, 5); // x, y position

// Get terminal size
const { width, height } = getSize();
console.log(`Terminal is ${width}x${height}`);
```

### Layout Utilities

Helper functions for text layout and positioning.

```javascript
import {
  center,
  pad,
  addMargin,
  addPadding,
  wrap,
  truncate
} from 'console-helper';

// Center text
console.log(center('Centered text'));

// Pad to width
console.log(pad('Left', 20, 'left'));
console.log(pad('Center', 20, 'center'));
console.log(pad('Right', 20, 'right'));

// Add margin
const text = 'Hello\nWorld';
console.log(addMargin(text, 2)); // 2 on all sides
console.log(addMargin(text, { top: 1, left: 4 })); // specific sides

// Wrap text
console.log(wrap('This is a long line that needs to be wrapped', 20));

// Truncate
console.log(truncate('This is too long', 10)); // "This is..."
```

### Color Utilities

Direct access to ANSI color codes.

```javascript
import { ANSI, rgb, bgRgb, hex, bgHex, stripAnsi } from 'console-helper';

// Direct ANSI codes
console.log(ANSI.fg.red + 'Red text' + ANSI.reset);
console.log(ANSI.bold + 'Bold' + ANSI.reset);

// RGB colors
console.log(rgb(255, 100, 50) + 'Custom RGB' + ANSI.reset);
console.log(bgRgb(50, 100, 255) + 'RGB Background' + ANSI.reset);

// Hex colors
console.log(hex('#FF5733') + 'Hex color' + ANSI.reset);
console.log(bgHex('#3498DB') + 'Hex background' + ANSI.reset);

// Strip ANSI codes from string
const styled = ANSI.fg.red + 'Red text' + ANSI.reset;
const plain = stripAnsi(styled); // 'Red text'
```

## Examples

Run the included examples:

```bash
# Basic examples (text, boxes, ASCII)
npm run example:basic

# Interactive examples (input, select, spinner)
npm run example:interactive

# Advanced examples (tables, progress bars, layouts)
npm run example:advanced

# Full demo
npm run example:demo
```

## API Reference

### Components

- `Text(options)` - Styled text output
- `Box(options)` - Bordered container
- `Table(options)` - Tabular data display
- `Spinner(options)` - Loading animation
- `ProgressBar(options)` - Progress indicator
- `Input(options)` - User text input
- `Select(options)` - Interactive menu
- `ASCII(options)` - ASCII art generator

### Utilities

- **Terminal**: `clear()`, `clearLine()`, `hideCursor()`, `showCursor()`, `moveCursor()`, `getSize()`, etc.
- **Layout**: `center()`, `pad()`, `addMargin()`, `wrap()`, `truncate()`
- **Colors**: `ANSI`, `rgb()`, `hex()`, `stripAnsi()`, `visibleLength()`

## Requirements

- Node.js >= 18.0.0
- Terminal with ANSI color support

## TypeScript

This package includes JSDoc type definitions for full IntelliSense support in VS Code and other editors.

```javascript
// Types are automatically available
import { Text, Box } from 'console-helper';

// Full autocomplete and type checking
Text({ text: 'Hello', color: 'red' }).print();
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

If you encounter any issues or have questions, please file an issue on the GitHub repository.

---

Made with ❤️ for the Node.js community
