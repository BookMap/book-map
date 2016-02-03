const gulp = require('gulp');
const mocha = require('gulp-mocha');
const jshint = require('gulp-jshint');
require('jshint-stylish');

gulp.task('lint', function() {
  gulp.src(['./*.js', '**/*.js', '!node_modules/**/*.*', '!public/lib/**/*.*'])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('run-tests', ['lint'], function() {
  gulp.src(['test/*.js'], { read: false })
    .pipe(mocha());
});

gulp.task('watch-files', function() {
  gulp.watch(['**/*.*'], ['run-tests']);
});

gulp.task('default', ['run-tests']);
gulp.task('test', ['run-tests', 'watch-files']);
