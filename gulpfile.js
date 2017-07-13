var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');

gulp.task('sass', function() {
  return gulp.src('scss/**/*.scss')
  .pipe(sass())
  .pipe(gulp.dest('css'))
  .pipe(browserSync.reload({
    stream: true
  }));
});

gulp.task('watch', ['browserSync', 'sass'], function() {
  gulp.watch('scss/**/*.scss', ['sass']);
  gulp.watch('public/js/**/*.js', [browserSync.reload(),console.log('rl')]);
  gulp.watch('public/**.html', [browserSync.reload()]);

});

gulp.task('browserSync', function(){
  browserSync.init({
    server: {
      baseDir: ''
    }
  });
});
