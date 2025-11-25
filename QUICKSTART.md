# Quick Start Guide

Get started with console-helper in 5 minutes!

## Installation

```bash
npm install console-helper
```

## 5-Minute Tutorial

### 1. Text Styling (30 seconds)

```javascript
import { Text } from 'console-helper';

Text.red('Error: Something went wrong!').print();
Text.green('Success!').print();
Text({ text: 'Custom style', color: 'cyan', bold: true }).print();
```

### 2. Boxes (1 minute)

```javascript
import { Box } from 'console-helper';

Box({
  content: 'Welcome to my CLI app!',
  title: 'Info',
  borderStyle: 'round',
  borderColor: 'cyan',
  padding: 2
}).print();
```

### 3. Loading Spinner (1 minute)

```javascript
import { Spinner } from 'console-helper';

const spinner = Spinner({ text: 'Loading...', type: 'dots' });
spinner.start();

// Do some async work
await someAsyncTask();

spinner.succeed('Done!');
```

### 4. Progress Bar (1 minute)

```javascript
import { ProgressBar } from 'console-helper';

const progress = ProgressBar({ total: 100 });
progress.start();

for (let i = 0; i <= 100; i += 10) {
  progress.update(i);
  await sleep(100);
}

progress.complete();
```

### 5. Interactive Input (1.5 minutes)

```javascript
import { Input, Select } from 'console-helper';

// Text input
const name = await Input.text('What is your name?');

// Select menu
const color = await Select({
  message: 'Choose a color:',
  choices: ['Red', 'Green', 'Blue']
});

// Confirmation
const confirmed = await Input.confirm('Continue?', true);
```

## Complete Example

Here's a complete CLI app in under 20 lines:

```javascript
import { Text, Box, Spinner, Input, Select } from 'console-helper';

async function main() {
  // Welcome
  Box({
    content: 'Welcome to My CLI App',
    borderStyle: 'double',
    borderColor: 'cyan',
    padding: 2
  }).print();

  // Get user input
  const name = await Input.text('What is your name?');
  const theme = await Select({
    message: 'Choose a theme:',
    choices: ['Dark', 'Light', 'Auto']
  });

  // Show loading
  const spinner = Spinner({ text: 'Setting up...' });
  spinner.start();
  await new Promise(r => setTimeout(r, 2000));
  spinner.succeed('Setup complete!');

  // Show result
  Text.green(`✓ Welcome, ${name}! Theme: ${theme}`).print();
}

main();
```

## Next Steps

- Read the [full documentation](README.md)
- Try the [examples](examples/)
- Check out all available [components](README.md#documentation)

## Need Help?

- Issues: Report bugs or request features on GitHub
- Examples: Run `npm run example:demo` to see all features
- Documentation: See README.md for complete API reference

Happy coding! 🚀
