module.exports = function ({ addComponents, theme }) {
  const screens = theme('screens');
  const userStyles = theme('debugScreens.style', {});
  const ignoredScreens = theme('debugScreens.ignore', [])

  const defaultPosition = ['bottom', 'left'];
  const position = theme('debugScreens.position', defaultPosition);
  const positionY = position[0] || defaultPosition[0];
  const positionX = position[1] || defaultPosition[1];

  const components = {
    '.debug-screens::before': Object.assign({
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
      content: `'screen: _'`,
    }, userStyles),
  };

  Object.entries(screens)
    .filter(([screen]) => !ignoredScreens.includes(screen))
    .sort(([screenA, pixelA], [screenB, pixelB]) => {
      return parseInt(pixelA) - parseInt(pixelB);
    })
    .forEach(([screen]) => {
      components[`@screen ${screen}`] = {
        '.debug-screens::before': {
          content: `'screen: ${screen}'`,
        },
      };
    });

  addComponents(components);
}

