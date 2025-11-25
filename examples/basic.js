/**
 * Basic examples demonstrating text styling and boxes
 */

import { Text, Box, ASCII } from '../src/index.js';

console.log('\n=== Basic Text Styling ===\n');

// Basic colors
Text.red('This is red text').print();
Text.green('This is green text').print();
Text.blue('This is blue text').print();
Text.yellow('This is yellow text').print();
Text.cyan('This is cyan text').print();
Text.magenta('This is magenta text').print();

console.log('');

// Text styles
Text.bold('This is bold text').print();
Text.italic('This is italic text').print();
Text.underline('This is underlined text').print();
Text.strikethrough('This is strikethrough text').print();

console.log('');

// Combined styles
Text({ text: 'Bold + Red + Underline', color: 'red', bold: true, underline: true }).print();
Text({ text: 'Cyan + Italic + Dim', color: 'cyan', italic: true, dim: true }).print();

console.log('\n=== Boxes ===\n');

// Simple box
Box({
  content: 'Hello, World!',
  padding: 2
}).print();

console.log('');

// Box with title
Box({
  content: 'This is a box with a title',
  title: 'Information',
  borderStyle: 'round',
  borderColor: 'cyan',
  padding: 2
}).print();

console.log('');

// Different border styles
Box({
  content: 'Single border style',
  borderStyle: 'single',
  padding: 1
}).print();

console.log('');

Box({
  content: 'Double border style',
  borderStyle: 'double',
  padding: 1
}).print();

console.log('');

Box({
  content: 'Bold border style',
  borderStyle: 'bold',
  padding: 1
}).print();

console.log('');

// Multi-line content
Box({
  content: 'Line 1\nLine 2\nLine 3\nLine 4',
  title: 'Multi-line Content',
  titleAlign: 'center',
  borderStyle: 'round',
  borderColor: 'green',
  padding: 2
}).print();

console.log('\n=== ASCII Art ===\n');

// ASCII text
ASCII.big('HELLO').print();

console.log('');

ASCII.small('WORLD').print();

console.log('');

// Colored ASCII
ASCII({ text: 'COOL', font: 'standard', color: 'cyan' }).print();

console.log('');

// Banner
console.log(ASCII.shapes.banner('Welcome to console-helper', { char: '=', width: 60, color: 'yellow' }));

console.log('');
