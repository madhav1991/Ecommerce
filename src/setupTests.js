Object.defineProperty(global, 'window', {
    value: {
      addEventListener: () => {},
      removeEventListener: () => {},
      localStorage: {},
      location: {},
      navigator: {
        userAgent: 'node.js',
      },
    },
    writable: true,
  });
  