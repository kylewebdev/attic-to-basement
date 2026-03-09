const config = {
  plugins: {
    "@tailwindcss/postcss": {},
    "postcss-preset-env": {
      features: {
        "nesting-rules": false,
      },
    },
  },
};

export default config;
