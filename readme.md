# @font-face/browser

Simple CSS @font-face Stylesheet injector for browser.

## Install
```javascript
npm i @font-face/browser
OR
yarn add @font-face/browser
```

## API usage
**@font-face/browser** library exports simple function to pass font configs and injects @font-face CSS stylesheet into document head.

## Usage

```javascript
import fontFaceBrowser from '@font-face/browser';

fontFaceBrowser({
    fontDirContext: require.context('./fonts'),
    fonts: [
        {
            name: 'Roboto',
            weight: 200,
            style: 'normal',
            file: 'Roboto-Light',
        },
        {
            name: 'Roboto',
            weight: 400,
            style: 'normal',
            file: 'Roboto-Regular',
        },
        {
            name: 'Roboto',
            weight: 600,
            style: 'bold',
            file: 'Roboto-Medium',
        }
    ]
});
```

This will inject a style tag into document head with following contents:

```CSS
@font-face { font-family: 'Roboto'; font-weight: 200; font-style: normal; src: url('/static/media/Roboto-Light.88823c20.ttf') format('truetype'); }
@font-face { font-family: 'Roboto'; font-weight: 400; font-style: normal; src: url('/static/media/Roboto-Regular.11eabca2.ttf') format('truetype'); }
@font-face { font-family: 'Roboto'; font-weight: 600; font-style: bold; src: url('/static/media/Roboto-Medium.58aef543.ttf') format('truetype'); }
```

* fontDirContext - Webpack require context. This is the base fonts directory.
* fonts - Array of fonts configs.
* name, weight, style are self explanatory
* file - Font file name without extension. Appropriate url will be formed based on file format available in base directory. 

## Caveats
Currently this library could only be worked with webpack based projects.
If you have any idea to make it bundle agnostic, please feel free to raise an issue. 

