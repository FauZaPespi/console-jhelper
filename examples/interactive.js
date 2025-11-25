/**
 * Interactive examples demonstrating user input components
 */

import { Input, Select, Text, Box, Spinner } from '../src/index.js';

async function main() {
  console.log('\n');
  Box({
    content: 'Interactive Components Demo',
    title: 'console-helper',
    titleAlign: 'center',
    borderStyle: 'round',
    borderColor: 'cyan',
    padding: 2,
    width: 50
  }).print();

  console.log('\n');

  // Text input
  const name = await Input.text('What is your name?');
  Text.green(`Hello, ${name}!`).print();

  console.log('');

  // Input with validation
  const age = await Input({
    prompt: 'How old are you?',
    validate: (value) => {
      const num = parseInt(value);
      if (isNaN(num)) return 'Please enter a valid number';
      if (num < 0) return 'Age cannot be negative';
      if (num > 150) return 'Please enter a realistic age';
      return null;
    }
  });
  Text.cyan(`You are ${age} years old.`).print();

  console.log('');

  // Password input
  const password = await Input.password('Enter a password:');
  Text.green(`Password set (${password.length} characters)`).print();

  console.log('');

  // Confirmation
  const confirmed = await Input.confirm('Do you want to continue?', true);
  Text({ text: confirmed ? '✓ Confirmed!' : '✗ Cancelled', color: confirmed ? 'green' : 'red' }).print();

  console.log('');

  // Select menu
  const color = await Select({
    message: 'What is your favorite color?',
    choices: [
      'Red',
      'Green',
      'Blue',
      'Yellow',
      'Cyan',
      'Magenta'
    ]
  });
  Text({ text: `You selected: ${color}`, color: color.toLowerCase() }).print();

  console.log('');

  // Select with objects and disabled items
  const framework = await Select({
    message: 'Choose a JavaScript framework:',
    choices: [
      { label: 'React', value: 'react' },
      { label: 'Vue', value: 'vue' },
      { label: 'Angular', value: 'angular' },
      { label: 'Svelte', value: 'svelte' },
      { label: 'jQuery (Legacy)', value: 'jquery', disabled: true }
    ],
    defaultValue: 'react'
  });
  Text.green(`You chose: ${framework}`).print();

  console.log('');

  // Spinner demo
  const spinner = Spinner({ type: 'dots', text: 'Loading...', color: 'cyan' });
  spinner.start();

  await new Promise(resolve => setTimeout(resolve, 2000));
  spinner.setText('Processing...');

  await new Promise(resolve => setTimeout(resolve, 2000));
  spinner.succeed('Done!');

  console.log('');

  // Different spinner outcomes
  const spinner2 = Spinner.circle('Checking something...');
  spinner2.start();
  await new Promise(resolve => setTimeout(resolve, 1500));
  spinner2.fail('Something went wrong');

  const spinner3 = Spinner.dots('Warning test...');
  spinner3.start();
  await new Promise(resolve => setTimeout(resolve, 1500));
  spinner3.warn('This is a warning');

  console.log('');
  Text.bold('Interactive demo completed!').print();
}

main().catch(console.error);
