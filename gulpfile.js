/**
 * 实现把js压缩放置在html的script标签 用inlinesource
 *
 * gulp-imagemin使用：(http://www.dtao.org/archives/26)
 * 使用：先不用可选参数，再使用可选参数
 */
'use strict'

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var inlinesource = require('gulp-inline-source');
var imagemin = require('gulp-imagemin');
// var pngquant = require('imagemin-pngquant');

gulp.task('default', function() {
	return gulp.src('index.js')
		.pipe(uglify())
		.pipe(gulp.dest('scripts'));
});

gulp.task('test', function() {
	return gulp.src(['index.js', 'test.js'])
		.pipe(concat('testandindex.js'))
		.pipe(gulp.dest('scripts'));
});

gulp.task('inlinesource', function() {
	return gulp.src('index.html')
		.pipe(inlinesource())
		.pipe(gulp.dest('scripts'));
});

gulp.task('imagemin', function() {
	return gulp.src('images/*')
		.pipe(imagemin({
			// 无损压缩jpg
			progressive: true
		}))
		.pipe(gulp.dest('images.min/'));
});