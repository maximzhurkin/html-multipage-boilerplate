# html-multipage-boilerplate
Webpack 4 boilerplate with pug/stylus/es6 multiple pages

## Install
1. In project folder run in console
```
git clone https://github.com/maximzhurkin/html-multipage-boilerplate.git . && rm -rf .git
```
2. Install node modules
```
npm i
```

## Run
- npm run dev

## Build
- npm run favicon
- npm run build
- npm run pack

## Fonts
1) Change list fonts in ./layouts/page.pug
2) Change list fonts in ./components/app/config.styl

## Create favicon
1) Create icon.svg file 260x260 in src/static/favicon
2) update info in faviconDescription.json (design.safariPinnedTab.themeColor & design.androidChrome.manifest.name)
3) npm run favicon

## Styles animation
1) @import "../../styles/animations/float"
2) animation float .25s infinite

## Add SVG Sprites
1) npm i svg-sprite-loader@5 --save-dev
2) create folder src/static/icons
3) webpack.config.js
```js
{
  test: /\.svg$/,
  exclude: [path.resolve('node_modules')],
  loader: 'svg-sprite-loader',
  options: {
    extract: true,
    spriteFilename: './assets/images/icons.svg',
    runtimeCompat: true
  }
},
{
  // test: /\.(png|jpg|gif|svg)$/,
  exclude: [path.resolve('src/static/icons')],
  // loader: 'file-loader',
  // options: {
  //   name: 'assets/images/[name].[ext]'
  // }
},
// ...
plugins: [
	// ...pluginsOptions,
	new SpriteLoaderPlugin({
		plainSprite: true
	}),
]
```
