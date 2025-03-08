# Tailwind CSS Debug Screens 📱

A Tailwind CSS component that shows the currently active screen (responsive breakpoint).

[Demo](https://joren.co/tailwindcss-debug-screens-demo/)

<img src="screenshot.png" width="534">

> [!NOTE]
> Docs for Tailwind CSS v1, v2 & v3 can be found [here](https://github.com/jorenvanhee/tailwindcss-debug-screens/tree/v2).

## Install

Requires **Tailwind v4.0** or higher.

1. Install the plugin:

```bash
npm install tailwindcss-debug-screens --save-dev
```

2. Add the plugin to your main `style.css` file:

```diff
  @import "tailwindcss";
+ @plugin "tailwindcss-debug-screens";
```

3. Add the class `debug-screens` to your `<body>` tag:

```html
<body class="debug-screens">
```

### Disable in production

#### Laravel

```twig
<body class="{{ app()->isLocal() ? 'debug-screens' : '' }}">
```

#### Craft CMS

```twig
<body class="{{ devMode ? 'debug-screens' : '' }}">
```

## Customization

You can customize this plugin by using the following options when registering the plugin.

```css
@import "tailwindcss";
@plugin "tailwindcss-debug-screens" {
  className: 'debug-screens';
  position: 'bottom, left';
  prefix: 'screen: ';
}
```
