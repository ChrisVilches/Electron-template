// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var uglify = require('gulp-uglify');
var tsc = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var order = require("gulp-order");
var concat = require("gulp-concat");


var source_ts = "src";

var dest_js = "compiled";



gulp.task('compileScripts', function(){
	return gulp.src(source_ts+'/**/*.ts')
	.pipe(sourcemaps.init())
	.pipe(tsc({target: 'ES6', module: 'commonjs'}))
	.pipe(sourcemaps.write('/'))
	.pipe(gulp.dest(dest_js));
});



gulp.task('watch', function(){
	// Compile Typescript
	gulp.watch(source_ts+'/**/*.ts', ['compileScripts']);
});




gulp.task('default', ['compileScripts', 'watch']);
