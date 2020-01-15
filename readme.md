# fontface

Simple CSS @font-face generator.

## Install
```javascript
npm i fontface
OR
yarn add fontface
```

## API usage
fontface library exports simple function to pass font configs and generate @font-face CSS tags.
Returned CSS needs to be injected into style tags separately.

## Usage

```javascript
const generatedFontFace = fontface({
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

This will generate:

```CSS
@font-face { font-family: 'Roboto'; font-weight: 200; font-style: normal; src: url('/static/media/Roboto-Light.88823c20.ttf') format('truetype'); }
@font-face { font-family: 'Roboto'; font-weight: 400; font-style: normal; src: url('/static/media/Roboto-Regular.11eabca2.ttf') format('truetype'); }
@font-face { font-family: 'Roboto'; font-weight: 600; font-style: bold; src: url('/static/media/Roboto-Medium.58aef543.ttf') format('truetype'); }
```

* fontDirContext * - Webpack require context. This is the base fonts directory.
* fonts * - Array of fonts configs.
* name *, * weight *, * style * are self explanatory
* file * - Font file name without extension. Appropriate url will be formed based on file format available in base directory. 

## Caveats
Currently this library could only be worked with webpack based projects.
If you have any idea to make it bundle agnostic, please feel free to raise an issue. 

