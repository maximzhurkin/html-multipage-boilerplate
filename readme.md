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
1) @import ../styles/animations/popup
2) animation popup .25s 1
