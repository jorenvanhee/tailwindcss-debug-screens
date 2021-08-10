module.exports = function ({ addComponents, theme }) {
  const screens = theme('screens');
  const userStyles = theme('debugScreens.style', {});
  const ignoredScreens = theme('debugScreens.ignore', ['dark']);
  const prefix = theme('debugScreens.prefix', 'screen: ');
  const selector = theme('debugScreens.selector', '.debug-screens');

  const defaultPosition = ['bottom', 'left'];
  const position = theme('debugScreens.position', defaultPosition);
  const positionY = position[0] || defaultPosition[0];
  const positionX = position[1] || defaultPosition[1];

  const components = {
    [`${selector}::before`]: Object.assign({
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
    }, userStyles),
  };

  Object.entries(screens)
    .filter(([screen]) => !ignoredScreens.includes(screen))
    .forEach(([screen]) => {
      components[`@screen ${screen}`] = {
        [`${selector}::before`]: {
          content: `'${prefix}${screen}'`,
        },
      };
    });

  addComponents(components);
}

