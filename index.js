const plugin = require('tailwindcss/plugin');

module.exports = plugin.withOptions(
  ({
    className = 'debug-screens',
    prefix = 'screen: ',
    position = 'bottom, left',
  } = {}) => {
    return function({ addComponents, theme }) {
      /**
       * Workaround to get the screens.
       * https://github.com/tailwindlabs/tailwindcss/issues/16130
       */
      const allScreens = theme('screens') || {};
      const enabledScreenNames = Object.keys(allScreens['__CSS_VALUES__'] || {});
      const screens = Object.fromEntries(enabledScreenNames.map((name) => [name, allScreens[name]]));

      const positions = position.split(',').map(position => position.trim());
      const positionY = ['top', 'bottom'].includes(positions[0]) ? positions[0] : 'bottom';
      const positionX = ['left', 'right'].includes(positions[1]) ? positions[1] : 'left';

      const mediaQueries = {};

      Object.entries(screens).forEach(([name, size]) => {
        mediaQueries[`@media (min-width: ${size})`] = {
          content: `'${prefix}${name}'`,
        }
      });

      addComponents({
        [`.${className}::before`]: {
          position: 'fixed',
          zIndex: '2147483647',
          [positionY]: '0',
          [positionX]: '0',
          padding: '.3333333em .5em',
          fontSize: '12px',
          lineHeight: '1',
          fontFamily: 'sans-serif',
          backgroundColor: '#000',
          color: '#fff',
          boxShadow: '0 0 0 1px #fff',
          content: `'${prefix}_'`,
          ...mediaQueries,
        },
      });
    };
  },
);
