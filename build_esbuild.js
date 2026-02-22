const esbuild = require('esbuild');

esbuild.build({
    entryPoints: ['src/browser.js'],
    bundle: true,
    outfile: 'docs/dare.js',
    format: 'iife',
    minify: true,
    define: {
        'process.env.NODE_ENV': '"production"',
        'process.cwd': '"/"'
    },
    alias: {
        'fs': 'path/to/virtual/fs',
        'path': 'path-browserify',
        'mime-types': 'path/to/virtual/mime'
    },
    plugins: [
        {
            name: 'empty-node-builtins',
            setup(build) {
                build.onResolve({ filter: /^(fs|path|mime-types)$/ }, args => ({
                    path: args.path,
                    namespace: 'empty-node-builtins'
                }));
                build.onLoad({ filter: /.*/, namespace: 'empty-node-builtins' }, () => ({
                    contents: 'module.exports = {};',
                    loader: 'js'
                }));
            }
        }
    ]
}).then(() => {
    console.log("esbuild success!");
    process.exit(0);
}).catch((err) => {
    console.error("esbuild failed:", err);
    process.exit(1);
});
