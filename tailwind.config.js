module.exports = {
  mode: 'jit',
  purge: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],

  theme: {
    // font
    fontFamily: {
      sans: ['Work Sans', 'sans-serif'],
    },
    container: {
      "center": true,
      screens: {
        sm: "100%",
        md: "100%",
        lg: "720px",
        xl: "940px",
      },
      "padding-left": "1rem",
      "padding-right": "1rem"
    }
  },
};
