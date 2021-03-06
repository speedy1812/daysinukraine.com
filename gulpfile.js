'use strict'; // http://www.w3schools.com/js/js_strict.asp

// 1. LOAD PLUGINS

var gulp = require('gulp');
var postcss = require("gulp-postcss");
var p    = require('gulp-load-plugins')({ // This loads all the other plugins.
	DEBUG: false,
	pattern: ['gulp-*', 'gulp.*', 'del', 'run-*', 'browser*', 'vinyl-*', 'through2'],
	rename: {
		'vinyl-source-stream': 'source',
		'vinyl-buffer': 'buffer',
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

	js = {
		in: src + 'javascripts/*.{js,coffee}',
		out: dest + 'javascripts/'
	},

	images = {
		in: src + 'images/**/*.{jpg,jpeg,png,gif}',
		out: dest + 'images/'
	},

	serverOpts = {
		proxy: 'localhost:4567',
		open: false,
		reloadDelay: 500,
		files: [dest + '**/*.{js,css}', src + '**/*.{html,erb,markdown}']
	};

// 3. WORKER TASKS

// CSS Preprocessing
gulp.task('css', function() {
	return gulp.src(css.in)
		.pipe(development(p.sourcemaps.init()))
    .pipe(postcss([
        require("postcss-import"),
        require("tailwindcss"),
        require("autoprefixer")
      ]))
		.pipe(production(p.sourcemaps.init()))
		.pipe(production(p.cleanCss()))
		.pipe(development(p.sourcemaps.write()))
		.pipe(production(p.sourcemaps.write()))
		.pipe(gulp.dest(css.out));
});

// Javascript Bundling
gulp.task('js', function(done) {
	var b = p.browserify({
		entries: src + 'javascripts/all.js',
		debug: true // This provides sourcemaps in development
	});

	return b.bundle().on('error', handleError)
		.pipe(p.source('bundle.js'))
		.pipe(production ? p.buffer() : p.through.obj())
		.pipe(production(p.stripDebug()))
		.pipe(production(p.sourcemaps.init()))
    .pipe(production(p.terser()))
    .pipe(production(p.sourcemaps.write()))
		.pipe(gulp.dest(js.out))
    done();
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
gulp.task('production', gulp.series('clean', 'css', 'js', 'images', 'sizereport'));

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
