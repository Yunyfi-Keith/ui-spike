const os = require('os');
const path = require('path');
const fs = require('fs');
const fileExclusions = [
    '.js',
    '.less',
    '.md',
    '.sh',
    '.png',
    '.jpg',
    '.json',
    '.xml',
    '.html',
    '.css',
    'webpack.config.js',
    'jest.config.js',
    '.yarnignore',
    'NOTICE',
    'LICENSE',
    '.d.ts',
    '.DS_Store',
    'Tests.ts',
    '.d.ts'
];
const directoryExclusions = [
    'css',
    'node_modules',
    'packages-codegen',
    'typings',
    'dist',
    'tests',
];
// don't write index export entries for items in this, but still go into the directories and write index files
const directoryExportExclusions = [
    '_test-common_',
];

const logger = (message) => {
    console.log(`IndexWriter: ${message}`);
};

const ignoreThisFileAnnotation = '@index-writer-ignore'
const exportAsModuleAnnotation = '@index-writer-export-as-module'

const fileSorter = (a, b) => a.toLowerCase().localeCompare(b.toLowerCase());

const capatiliseFirstLetter = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
};
const tryRecursivelyWriteIndexFiles = function (directory) {
    if (directoryExclusions.includes(path.basename(directory))) {
        return;
    }
    let files = fs.readdirSync(directory).sort(fileSorter);
    let directoryExports = '';
    let sideEffectImport = '';
    let fileExports = '';
    let newLine = os.platform() === 'win32' ? '\r\n' : '\n';
    files.forEach(function (file) {
        let directory1 = directory + '/' + file;
        if (fs.statSync(directory1).isDirectory()) {
            if (tryRecursivelyWriteIndexFiles(directory1)) {
                let excludeExport = directoryExportExclusions.some(ex => ex === file);
                if (!excludeExport) {
                    if (file.includes('.global')) {
                        sideEffectImport += `import './${file}'; // directory${newLine}`;
                    } else {
                        directoryExports += `export * from './${file}';${newLine}`;
                    }
                }
            }
        } else {
            const baseName = path.basename(file);
            let excludeFile = baseName === 'index.ts' || fileExclusions.some(exclusion => {
                return baseName.toLowerCase().endsWith(exclusion.toLowerCase());
            });
            if (!excludeFile) {
                if (file.includes('.global')) {
                    sideEffectImport += `import './${path.parse(file).name}';${newLine}`;
                } else {
                    const fileContents = fs.readFileSync(directory + '/' + file, 'utf8');
                    const exportAsModule = fileContents.includes(exportAsModuleAnnotation);
                    if (exportAsModule) {
                        const fileNameWithoutExt = path.parse(file).name;
                        const importExportName = capatiliseFirstLetter(fileNameWithoutExt);
                        fileExports += `import * as ${importExportName} from './${fileNameWithoutExt}';${newLine}`;
                        fileExports += `export { ${importExportName} };`;
                    } else {
                        let exportFile = path.parse(file).name;
                        if (file.endsWith('.svelte')) {
                            exportFile = path.parse(file).base;
                        }
                        fileExports += `export * from './${exportFile}';${newLine}`;
                    }
                }
            }
        }
    });
    let finalOutput = ``;
    if (directoryExports) {
        finalOutput += directoryExports;
    }
    if (sideEffectImport) {
        finalOutput += sideEffectImport;
    }
    if (fileExports) {
        finalOutput += fileExports;
    }

    if (finalOutput === '') {
        finalOutput = 'export { };';
    }

    let blurb = `// Auto-generated ${newLine}`;
    let indexFile = `${directory}/index.ts`;
    finalOutput = `${blurb}${finalOutput}`;

    const existingContents = fs.existsSync(indexFile) && fs.readFileSync(indexFile, 'utf8');

    if (existingContents && existingContents.includes(ignoreThisFileAnnotation)) {
        return true;
    }

    if (existingContents === finalOutput) {
        return true;
    }

    logger(`Wrote file: ${indexFile}`);
    fs.writeFileSync(indexFile, finalOutput);
    return true;
};

const writeAllIndexFiles = (packagesDirectory) => {
    let directories = fs.readdirSync(packagesDirectory).sort(fileSorter);

    const tryRecursivelyWriteIndexFilesForSubDir = (pkg, directory, subDirectory) => {
        let path = `${pkg}/${directory}/${subDirectory}`;
        if (!fs.existsSync(path)) {
            return;
        }
        if (!fs.statSync(path).isDirectory()) {
            return;
        }
        tryRecursivelyWriteIndexFiles(path, true);
    }

    directories.forEach(function (directory) {
        let fullDirectoryPath = `${packagesDirectory}/${directory}`;
        if (!fs.statSync(fullDirectoryPath).isDirectory()) {
            return;
        }
        if (directoryExclusions.includes(path.basename(directory))) {
            return;
        }
        tryRecursivelyWriteIndexFilesForSubDir(packagesDirectory, directory, 'src');
        tryRecursivelyWriteIndexFilesForSubDir(packagesDirectory, directory, 'tests');
    });
};

writeAllIndexFiles(path.join(__dirname, 'apps'));
