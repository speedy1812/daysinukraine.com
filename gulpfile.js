'use strict'; // http://www.w3schools.com/js/js_strict.asp

// 1. LOAD PLUGINS

var gulp = require('gulp');
var bourbon = require('bourbon').includePaths;
var neat = require('bourbon-neat').includePaths;
var p    = require('gulp-load-plugins')({ // This loads all the other plugins.
	DEBUG: false,
	pattern: ['gulp-*', 'gulp.*', 'del', 'run-*', 'browser*', 'vinyl-*'],
	rename: {
		'vinyl-source-stream': 'source',
		'vinyl-buffer': 'buffer',
		'gulp-util': 'gutil'
	},
});

// 2. CONFIGURATION

var
	src  = 'source/', // The Middleman source folder
	dest = '.tmp/',   // The "hot" build folder used by Middleman's external pipeline

	development = p.environments.development,
	production = p.environments.production,

	css = {
		in: src + 'stylesheets/**/*.{css,scss,sass}',
		out: dest + 'stylesheets/',
	},

	sassOpts = {
		imagePath: '../images',
    includePaths: [bourbon, neat],
		errLogToConsole: true
	},

	js = {
		in: src + 'javascripts/*.{js,coffee}',
		out: dest + 'javascripts/'
	},

	uglifyOpts = {
    output: {
      comments: 'uglify-save-license'
    }
	},

	images = {
		in: src + 'images/*',
		out: dest + 'images/'
	},

	serverOpts = {
		proxy: 'localhost:4567',
		open: false,
		reloadDelay: 500,
		files: [dest + '**/*.{js,css}', src + '**/*.{html,erb,haml,markdown}']
	};

// 3. WORKER TASKS

// CSS Preprocessing
gulp.task('css', function() {
	return gulp.src(css.in)
		.pipe(development(p.sourcemaps.init()))
		.pipe(p.sass(sassOpts).on('error', p.sass.logError))
		.pipe(p.autoprefixer()).on('error', handleError)
		.pipe(production(p.cleanCss()))
		.pipe(development(p.sourcemaps.write()))
		.pipe(gulp.dest(css.out));
});

// Javascript Bundling
gulp.task('js', function() {
	var b = p.browserify({
		entries: src + 'javascripts/all.js',
		debug: true
	});

	return b.bundle().on('error', handleError)
		.pipe(p.source('bundle.js'))
		.pipe(production() ? p.buffer() : p.gutil.noop())
		.pipe(production(p.stripDebug()))
		.pipe(production() ? p.uglify(uglifyOpts) : p.gutil.noop())
		.pipe(gulp.dest(js.out));
});

// Image Optimization
gulp.task('images', function() {
	return gulp.src(images.in)
		.pipe(p.changed(images.out))
		.pipe(p.imagemin())
		.pipe(gulp.dest(images.out));
});

// Clean .tmp/
gulp.task('clean', function(done) {
	p.del([
		dest + '*'
	]), done();
});

// Asset Size Report
gulp.task('sizereport', function () {
	return gulp.src(dest + '**/*')
		.pipe(p.sizereport({
			gzip: true
		}));
});

// 4. SUPER TASKS

// Development Task
gulp.task('development', gulp.series('clean', 'css', 'js', 'images'));

// Production Task
gulp.task('production', function(done) {
	p.runSequence('clean', 'css', 'js', 'images', 'sizereport', done);
});

// Default Task
// This is the task that will be invoked by Middleman's exteranal pipeline when
// running 'middleman server'
gulp.task('default', gulp.series('development', function browsersync () {

	p.browserSync.init(serverOpts);

	gulp.watch(css.in, gulp.series('css'));
	gulp.watch(js.in, gulp.series('js'));
	gulp.watch(images.in, gulp.series('images'));

}));

function handleError(err) {
	console.log(err.toString());
	this.emit('end');
}
