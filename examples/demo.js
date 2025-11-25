/**
 * Comprehensive demo showcasing all console-helper features
 */

import { Text, Box, ASCII, Spinner, ProgressBar, Table } from '../src/index.js';

async function demo() {
  console.clear();

  // Welcome banner
  console.log('\n');
  ASCII({ text: 'CONSOLE', font: 'standard', color: 'cyan' }).print();
  ASCII({ text: 'HELPER', font: 'standard', color: 'magenta' }).print();
  console.log('\n');

  Box({
    content: 'A powerful toolkit for creating beautiful terminal UIs\nWith colors, borders, animations, and interactive components',
    title: 'Welcome',
    titleAlign: 'center',
    borderStyle: 'double',
    borderColor: 'cyan',
    padding: 2,
    width: 70,
    align: 'center'
  }).print();

  await sleep(1000);

  // Feature showcase
  console.log('\n');
  Text({ text: '✨ Features Overview', bold: true, color: 'yellow' }).print();
  console.log('\n');

  const features = [
    { name: 'Text Styling', status: 'Colors, bold, italic, underline' },
    { name: 'Boxes', status: 'Multiple border styles with titles' },
    { name: 'Tables', status: 'Beautiful data display' },
    { name: 'Spinners', status: 'Loading animations' },
    { name: 'Progress Bars', status: 'Visual progress tracking' },
    { name: 'Interactive Input', status: 'User input with validation' },
    { name: 'Select Menus', status: 'Interactive option selection' },
    { name: 'ASCII Art', status: 'Text art and banners' }
  ];

  Table.fromObjects(features, {
    borderStyle: 'round',
    headerColor: 'cyan',
    borderColor: 'green'
  }).print();

  await sleep(1500);

  // Loading demo
  console.log('\n');
  Text({ text: '⏳ Loading Demo', bold: true, color: 'cyan' }).print();
  console.log('');

  const spinner = Spinner({ type: 'dots', text: 'Initializing...', color: 'cyan' });
  spinner.start();
  await sleep(1000);

  spinner.setText('Loading components...');
  await sleep(1000);

  spinner.setText('Building interface...');
  await sleep(1000);

  spinner.succeed('Ready!');

  // Progress bar demo
  console.log('');
  Text.cyan('Downloading packages...').print();

  const progress = ProgressBar({
    total: 100,
    width: 50,
    showPercentage: true,
    completeColor: 'green'
  });

  progress.start();

  for (let i = 0; i <= 100; i += 10) {
    progress.update(i);
    await sleep(150);
  }

  progress.complete();

  await sleep(500);

  // Color showcase
  console.log('\n');
  Text({ text: '🎨 Color Palette', bold: true, color: 'yellow' }).print();
  console.log('');

  const colors = ['red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white', 'gray'];
  colors.forEach(color => {
    Text({ text: `■ ${color.padEnd(10)}`, color }).print(false);
  });
  console.log('\n');

  await sleep(1000);

  // Box styles showcase
  console.log('\n');
  Text({ text: '📦 Box Styles', bold: true, color: 'yellow' }).print();
  console.log('');

  const boxStyles = [
    { style: 'single', color: 'cyan' },
    { style: 'double', color: 'green' },
    { style: 'round', color: 'magenta' },
    { style: 'bold', color: 'yellow' }
  ];

  for (const { style, color } of boxStyles) {
    Box({
      content: `This is a ${style} border box`,
      title: style.toUpperCase(),
      borderStyle: style,
      borderColor: color,
      padding: 1,
      width: 40
    }).print();
    console.log('');
  }

  await sleep(1000);

  // Data table demo
  console.log('\n');
  Text({ text: '📊 Data Tables', bold: true, color: 'yellow' }).print();
  console.log('');

  const salesData = [
    ['January', '$45,000', Text.green('↑ 12%').toString()],
    ['February', '$52,000', Text.green('↑ 15%').toString()],
    ['March', '$48,000', Text.red('↓ 8%').toString()],
    ['April', '$61,000', Text.green('↑ 27%').toString()]
  ];

  Table({
    headers: ['Month', 'Revenue', 'Change'],
    rows: salesData,
    borderStyle: 'single',
    headerColor: 'cyan',
    borderColor: 'blue',
    align: ['left', 'right', 'right']
  }).print();

  await sleep(1500);

  // Final message
  console.log('\n');
  Box({
    content: `${Text.green('✓').toString()} Demo completed successfully!\n\nTry the examples:\n  ${Text.cyan('npm run example:basic').toString()}\n  ${Text.cyan('npm run example:interactive').toString()}\n  ${Text.cyan('npm run example:advanced').toString()}\n\nVisit the README for full documentation.`,
    title: 'Thank You!',
    titleAlign: 'center',
    borderStyle: 'double',
    borderColor: 'green',
    padding: 2,
    width: 60
  }).print();

  console.log('\n');
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

demo().catch(console.error);
