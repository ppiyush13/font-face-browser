
export default function BrowserDirectoryContext(directoryContext, requireFn) {
    this.directoryContext = directoryContext;
    this.requireFn = requireFn;

    /**
     * Create directory map for checking availability of files
     */
    this.directoryMap = directoryContext.keys().reduce((acc, cur) => {
        acc[cur] = true;
        return acc;
    }, {});
}

/**
 * Declare exits method to check whether fileName exists or not
 */
BrowserDirectoryContext.prototype.exists = function exists(fileName) {
    return this.directoryMap[fileName];
};

/**
 * Resolve fileName to static hosted path
 */
BrowserDirectoryContext.prototype.resolve = function resolve(fileName) {
    return this.requireFn(
        this.directoryContext.resolve(fileName)
    );
};
