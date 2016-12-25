'use strict';

var appName = 'app';

var fs = require('fs');
var yaml = require('js-yaml');
var b2v = require('buffer-to-vinyl');
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var del = require('del');
var opn = require('opn');
var beep = require('beepbeep');
var express = require('express');
var path = require('path');
var stylish = require('jshint-stylish');
var connectLr = require('connect-livereload');
var streamqueue = require('streamqueue');
var wiredep = require('wiredep')({
    exclude: ['bower_components/ionic/release/css/ionic.css']
});

/**
 * Parse arguments
 */
var args = require('yargs')
    .alias('e', 'emulate')
    .alias('b', 'build')
    .alias('r', 'run')
    // remove all debug messages (console.logs, alerts etc) from release build
    .alias('release', 'strip-debug')
    .default('build', false)
    .default('port', 9000)
    .default('strip-debug', false)
    .argv;

var build = !!(args.build || args.emulate || args.run);
var emulate = args.emulate;
var run = args.run;
var port = args.port;
var env = args.env;
var stripDebug = !!args.stripDebug;
var targetDir = path.resolve(build ? 'www' : '.tmp');
// composite tasks
var styles;
var scripts;
var index;
// main config
var appSettings;

// if we just use emualate or run without specifying platform, we assume iOS
// in this case the value returned from yargs would just be true
if (emulate === true) {
    emulate = 'ios';
}
if (run === true) {
    run = 'ios';
}

// global error handler
var errorHandler = function (error) {
    if (build) {
        throw error;
    } else {
        beep(2, 170);
        plugins.util.log(error);
    }
};

// clean target dir
function clean(done) {
    return del([targetDir, '.processed'], done);
}

// load main settings file
function loadSettings() {

    var mainConfigPath = 'config/settings' + (env ? '.' + env : '') + '.yml';
    var origConfig = yaml.safeLoad(fs.readFileSync(mainConfigPath, 'utf8'));

    appSettings = {};

    // convert config parameter keys to upper case
    Object.keys(origConfig).forEach(function (key) {
        appSettings[key.toUpperCase()] = origConfig[key];
    });

    return b2v.stream(new Buffer(JSON.stringify({
            AppContext: appSettings
        })), 'context.constants.js')
        .pipe(plugins.ngConfig(appName + '.core', {
            createModule: false,
            wrap: '(function () {\n\'use strict\';\n/*jshint ignore:start*/\n return <%= module %> /*jshint ignore:end*/\n})();'
        }))
        .pipe(gulp.dest('app/scripts/core/'))
        .on('error', errorHandler);
}

function copyCordovaConfig() {
    var cordovaConfigPath = 'config/config' + (env ? '.' + env : '') + '.xml';

    return gulp.src(cordovaConfigPath, {
            allowEmpty: true
        })
        .pipe(plugins.rename('config.xml'))
        .pipe(gulp.dest('.'));
}

// build templatecache, copy scripts.
// if build: concat, minsafe, uglify and versionize
function buildScripts() {
    var dest = path.join(targetDir, 'scripts');

    var minifyConfig = {
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes: true,
        removeComments: true
    };

    // prepare angular template cache from html templates    
    var templateStream = gulp
        .src(['**/*.html', '!index.html'], {
            cwd: 'app/'
        })
        .pipe(plugins.angularTemplatecache('templates.js', {
            root: 'app/',
            module: appName,
            htmlmin: build && minifyConfig
        }));

    var scriptStream = gulp
        .src(['**/*.js'], {
            cwd: 'app/scripts'
        })
        .pipe(plugins.angularFilesort())
        .pipe(plugins.if(!build, plugins.changed(dest)));

    return streamqueue({
            objectMode: true
        }, scriptStream, templateStream)
        .pipe(plugins.if(build, plugins.ngAnnotate()))
        .pipe(plugins.if(stripDebug, plugins.stripDebug()))
        .pipe(plugins.if(build, plugins.concat('app.js')))
        .pipe(plugins.if(build, plugins.uglify()))
        .pipe(plugins.if(build && !emulate, plugins.rev()))

    .pipe(gulp.dest(dest))

    .on('error', errorHandler);
}

scripts = gulp.series(buildScripts);


// compile sass templates using main config
function processTemplates() {
    return gulp.src(['app/styles/**/*.scss'])
        .pipe(plugins.template(appSettings))
        .pipe(gulp.dest('.processed'));
}


// compile styles
function buildStyles() {
    var options = build ? {
        style: 'compressed'
    } : {
        style: 'expanded'
    };

    var sassStream = gulp.src(['.processed/main.scss'])
        .pipe(plugins.sass(options))
        .on('error', function (err) {
            console.log('err: ', err);
            beep();
        });

    var vendorStream = gulp.src(wiredep.css);

    return streamqueue({
            objectMode: true
        }, sassStream, vendorStream)
        .pipe(plugins.autoprefixer({
            browsers: ['last 1 Chrome version',
                'last 5 iOS versions',
                'last 10 Android versions'
            ]
        }))
        .pipe(plugins.concat('main.css'))
        .pipe(plugins.if(build, plugins.stripCssComments()))
        .pipe(plugins.if(build && !emulate, plugins.rev()))
        .pipe(gulp.dest(path.join(targetDir, 'styles')))
        .on('error', errorHandler);
}

// clean processed templates
function cleanProcessed(done) {
    return del('.processed', done);
}

// process style templates, compile sass, clean up
styles = gulp.series(processTemplates, buildStyles, cleanProcessed);

// copy fonts
function fonts() {
    return gulp
        .src(['app/fonts/*.*', 'bower_components/ionic/release/fonts/*.*'])

    .pipe(gulp.dest(path.join(targetDir, 'fonts')))

    .on('error', errorHandler);
}

// copy language files
function language() {
    return gulp.src('resources/languages/**')
        .pipe(gulp.dest(path.join(targetDir, 'languages')))
        .on('error', errorHandler);
}

// generate iconfont
function iconfont() {
    return gulp.src('app/icons/*.svg', {
            buffer: false
        })
        .pipe(plugins.iconfont({
            fontName: 'appIconFont',
            normalize: true,
            fontHeight: 1001
        }))
        .on('glyphs', function (glyphs, options) {
            return gulp.src('app/icons/own-icons-template.css')
                .pipe(plugins.consolidate('lodash', {
                    glyphs: glyphs,
                    fontName: 'appIconFont',
                    fontPath: '../fonts/',
                    className: 'app-icon'
                }))
                .pipe(plugins.rename({
                    basename: 'appIcons'
                }))
                .pipe(gulp.dest(path.join(targetDir, 'styles')));
        })
        .pipe(gulp.dest(path.join(targetDir, 'fonts')))
        .on('error', errorHandler);
}


// copy images
function images() {
    return gulp.src('app/images/**/*.*')
        .pipe(gulp.dest(path.join(targetDir, 'images')))

    .on('error', errorHandler);
}


// lint js sources based on .jshintrc ruleset
function jsHint() {
    return gulp
        .src(['app/scripts/**/*.js', '!app/scripts/categories/categories.constants.js'])
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter(stylish))

    .on('error', errorHandler);
}


// concatenate and minify vendor sources
function vendor() {
    var vendorFiles = wiredep.js;

    return gulp.src(vendorFiles)
        .pipe(plugins.concat('vendor.js'))
        .pipe(plugins.if(build, plugins.uglify()))
        .pipe(plugins.if(build, plugins.rev()))

    .pipe(gulp.dest(targetDir))

    .on('error', errorHandler);
}

// inject the files in index.html
function injectIntoIndex() {

    // build has a '-versionnumber' suffix
    var cssNaming = 'styles/main*';

    // injects 'src' into index.html at position 'tag'
    var _inject = function (src, tag) {
        return plugins.inject(src, {
            starttag: '<!-- inject:' + tag + ':{{ext}} -->',
            read: false,
            addRootSlash: false
        });
    };

    // get all our javascript sources
    // in development mode, it's better to add each file seperately.
    // it makes debugging easier.
    var _getAllScriptSources = function () {
        var scriptStream = gulp.src(['scripts/**/*.js'], {
                cwd: targetDir
            })
            .pipe(plugins.angularFilesort());
        return streamqueue({
            objectMode: true
        }, scriptStream);
    };

    return gulp.src('app/index.html')
        // inject css
        .pipe(_inject(gulp.src(cssNaming, {
            cwd: targetDir
        }), 'app-styles'))
        // inject vendor.js
        .pipe(_inject(gulp.src('vendor*.js', {
            cwd: targetDir
        }), 'vendor'))
        // inject app.js (build) or all js files indivually (dev)
        .pipe(plugins.if(build,
            _inject(gulp.src('scripts/app*.js', {
                cwd: targetDir
            }), 'app'),
            _inject(_getAllScriptSources(), 'app')
        ))

    .pipe(gulp.dest(targetDir))
        .on('error', errorHandler);
}

index = gulp.series(gulp.parallel(jsHint, scripts, language), injectIntoIndex);

// start local express server
function serve(done) {
    express()
        .use(!build ? connectLr() : function () {})
        .use(express.static(targetDir))
        .listen(port);
    opn('http://localhost:' + port + '/');
    done();
}

// ionic emulate wrapper
gulp.task('ionic:emulate', plugins.shell.task([
    'ionic emulate ' + emulate + ' --livereload --consolelogs'
]));

// ionic run wrapper
gulp.task('ionic:run', plugins.shell.task([
    'ionic run ' + run
]));

// ionic resources wrapper
gulp.task('icon', plugins.shell.task([
    'ionic resources --icon'
]));
gulp.task('splash', plugins.shell.task([
    'ionic resources --splash'
]));
gulp.task('resources', plugins.shell.task([
    'ionic resources'
]));

// select emulator device
gulp.task('select', plugins.shell.task([
    './helpers/emulateios'
]));

// start watchers
function watchers(done) {
    plugins.livereload.listen();
    gulp.watch(['app/styles/**/*.scss'], styles);
    gulp.watch('app/fonts/**/*', fonts);
    gulp.watch('app/icons/**/*', iconfont);
    gulp.watch('app/images/**/*', images);
    gulp.watch(['app/scripts/**/*.js', '!app/scripts/core/core.constants.js'], index);
    gulp.watch('app/scripts/**/*.html', index);
    gulp.watch('resources/languages/**', index);
    gulp.watch('bower.json', vendor);
    gulp.watch('app/index.html', index);
    gulp.watch('config/settings.*yml', gulp.series(loadSettings, styles, index));
    gulp.watch(targetDir + '/**/*')
        .on('change', plugins.livereload.changed)
        .on('error', errorHandler);
    done();
}

// no-op = empty function
function noop(done) {
    done();
}

// our main sequence, with some conditional jobs depending on params
gulp.task('default', gulp.series(loadSettings,
    copyCordovaConfig,
    clean,
    iconfont,
    gulp.parallel(fonts, styles, images, vendor),
    index,
    build ? noop : watchers,
    build ? noop : serve,
    emulate ? gulp.parallel('ionic:emulate', watchers) : noop,
    run ? 'ionic:run' : noop
));