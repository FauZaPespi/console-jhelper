/**
 * Advanced examples demonstrating tables and progress bars
 */

import { Table, ProgressBar, Text, Box } from '../src/index.js';

async function main() {
  console.log('\n=== Tables ===\n');

  // Simple table
  Table.simple(
    ['Name', 'Age', 'City'],
    [
      ['Alice', '25', 'New York'],
      ['Bob', '30', 'London'],
      ['Charlie', '35', 'Tokyo']
    ],
    {
      borderStyle: 'single',
      headerColor: 'cyan'
    }
  ).print();

  console.log('');

  // Table with different border style
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
    align: ['left', 'right', 'right']
  }).print();

  console.log('');

  // Table from objects
  const users = [
    { id: 1, username: 'alice', status: 'active' },
    { id: 2, username: 'bob', status: 'inactive' },
    { id: 3, username: 'charlie', status: 'active' }
  ];

  Table.fromObjects(users, {
    borderStyle: 'round',
    headerColor: 'magenta',
    borderColor: 'cyan'
  }).print();

  console.log('\n=== Progress Bars ===\n');

  Text.cyan('Downloading files...').print();

  const progress = ProgressBar({ total: 100, width: 50 });
  progress.start();

  // Simulate progress
  for (let i = 0; i <= 100; i += 5) {
    progress.update(i);
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  progress.complete();

  console.log('');

  // Progress bar with values
  Text.cyan('Processing items...').print();
  const progress2 = ProgressBar({
    total: 50,
    width: 40,
    showValue: true,
    completeColor: 'green',
    incompleteColor: 'gray'
  });

  progress2.start();

  for (let i = 0; i <= 50; i += 2) {
    progress2.update(i);
    await new Promise(resolve => setTimeout(resolve, 50));
  }

  progress2.complete();

  console.log('');

  // Custom progress bar
  Text.cyan('Installing packages...').print();
  const progress3 = ProgressBar({
    total: 20,
    width: 30,
    complete: '■',
    incomplete: '□',
    showPercentage: true,
    showValue: false,
    completeColor: 'yellow'
  });

  progress3.start();

  for (let i = 0; i <= 20; i++) {
    progress3.increment();
    await new Promise(resolve => setTimeout(resolve, 150));
  }

  progress3.complete();

  console.log('\n=== Complex Layout ===\n');

  // Create a dashboard-like layout
  const header = Box({
    content: Text({ text: '🚀 System Dashboard', bold: true }).toString(),
    borderStyle: 'double',
    borderColor: 'cyan',
    padding: 1,
    width: 60,
    align: 'center'
  }).toString();

  console.log(header);
  console.log('');

  // Status boxes
  const statusBox = Box({
    content: `${Text.green('●').toString()} Server: Online\n${Text.green('●').toString()} Database: Connected\n${Text.yellow('●').toString()} Cache: Warming up\n${Text.red('●').toString()} Backup: Failed`,
    title: 'System Status',
    borderStyle: 'round',
    borderColor: 'green',
    padding: 2,
    width: 30
  }).toString();

  console.log(statusBox);
  console.log('');

  // Stats table
  const stats = Table({
    headers: ['Metric', 'Value', 'Change'],
    rows: [
      ['CPU Usage', '45%', Text.green('↓ 5%').toString()],
      ['Memory', '2.1 GB', Text.yellow('→ 0%').toString()],
      ['Requests', '1,234', Text.green('↑ 12%').toString()],
      ['Errors', '3', Text.red('↑ 2').toString()]
    ],
    borderStyle: 'single',
    headerColor: 'cyan',
    borderColor: 'blue',
    align: ['left', 'right', 'right']
  }).toString();

  console.log(stats);

  console.log('\n');
  Text({ text: '✓ Advanced demo completed!', color: 'green', bold: true }).print();
}

main().catch(console.error);
