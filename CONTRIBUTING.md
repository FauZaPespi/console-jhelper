# Contributing to console-helper

Thank you for your interest in contributing to console-helper! We welcome contributions from everyone.

## How to Contribute

### Reporting Bugs

If you find a bug, please open an issue on GitHub with:
- A clear description of the problem
- Steps to reproduce the issue
- Expected vs actual behavior
- Your environment (Node.js version, OS, terminal)

### Suggesting Features

We welcome feature suggestions! Please open an issue with:
- A clear description of the feature
- Use cases and examples
- Why this would be useful for the community

### Submitting Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Make your changes** with clear, focused commits
3. **Test your changes** by running the examples
4. **Update documentation** if you're adding new features
5. **Submit a pull request** with a clear description

### Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/console-helper.git
cd console-helper

# Run examples to test
npm run example:demo
npm run example:basic
npm run example:interactive
npm run example:advanced
```

### Code Style

- Use ES6+ modules
- Add JSDoc comments for functions and classes
- Keep functions focused and single-purpose
- Follow existing code patterns

### Adding New Components

When adding a new component:
1. Create the component file in `src/components/`
2. Export it from `src/index.js`
3. Add examples in `examples/`
4. Document it in `README.md`
5. Test thoroughly

### Testing

Before submitting a PR:
- Run all example files to ensure nothing breaks
- Test on different terminals if possible
- Verify that colors and formatting work correctly

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Focus on constructive feedback
- Assume good intentions

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Questions?

Feel free to open an issue for any questions about contributing!
