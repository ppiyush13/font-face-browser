import generateFontFace from '@font-face/core';
import BrowserDirectoryContext from './browserDirectoryContext';
import styleInject from './style.inject';

export default ({fontDirContext, fonts, requireFn = __webpack_require__}) => {
    // Create DirectoryContext object to be utilised by core module
    const directoryContext  = new BrowserDirectoryContext(fontDirContext, requireFn);
    
    // generate @font-face css content
    const fontFaceCss = generateFontFace({
        directoryContext, fonts,
    });

    // create style tag and inject into document head
    styleInject(fontFaceCss);
}