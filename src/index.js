import aarify from 'arrify';
import jsonTemplating from './jsonTemplating';
import { arrayJoinMap } from './arrayUtils';

export default ({ fontDirContext, fonts }) => {
    return arrayJoinMap(
        aarify(fonts),
        fontConfig => generateFontFace(fontDirContext, fontConfig),
        '\n',
    );
};

const generateFontFace = (fontDirContext, { name, weight, style, file }) => {
    const keysMap = fontDirContext.keys().reduce((acc, cur) => {
        acc[cur] = true;
        return acc;
    }, {});
    
    const fileResolver = ext => {
        const fileName = `./${file}.${ext}`;
        return keysMap[fileName] ? __webpack_require__(fontDirContext.resolve(fileName)) : null;
    };

    const urlTemplate = (name, format) => `url('${name}') format('${format}')`;

    return jsonTemplating({
        joinChar: ' ',
        tpl: [
            '@font-face {',
            `font-family: '${name}';`,
            {
                condition: weight,
                tpl: `font-weight: ${weight};`,
            },
            {
                condition: style,
                tpl: `font-style: ${style};`,
            },
            {
                control: 'with',
                resolve: () => fileResolver('eot'),
                tpl: file => `src: url('${file}');`,
            },
            {
                control: 'with',
                tpl: multipleUrls => `src: ${multipleUrls};`,
                resolve: jsonTemplating({
                    joinChar: ' , ',
                    tpl: [
                        {
                            control: 'with',
                            resolve: () => fileResolver('eot'),
                            tpl: file => urlTemplate(`${file}#iefix`, 'embedded-opentype'),
                        },
                        {
                            control: 'with',
                            resolve: () => fileResolver('woff'),
                            tpl: file => urlTemplate(file, 'woff'),
                        },
                        {
                            control: 'with',
                            resolve: () => fileResolver('woff2'),
                            tpl: file => urlTemplate(file, 'woff2'),
                        },
                        {
                            control: 'with',
                            resolve: () => fileResolver('ttf'),
                            tpl: file => urlTemplate(file, 'truetype'),
                        },
                        {
                            control: 'with',
                            resolve: () => fileResolver('svg'),
                            tpl: file => urlTemplate(`${file}#${name}`, 'svg'),
                        },
                    ],
                }),
            },
            '}',
        ],
    });
};
