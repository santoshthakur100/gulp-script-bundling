var gulp = require('gulp');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var rev = require('gulp-rev');
var del = require('del');

gulp.task('clean-js', function () {
  return del([
    'public/build/js/*.js'
  ]);
});


gulp.task('pack-js', ['clean-js'], function () {  
  return gulp.src(['script/*.js', 'script/test*.js'])
    .pipe(concat('bundle.js'))
    .pipe(minify({
        ext:{
            min:'.js'
        }, 
        noSource: true
    }))
    .pipe(rev())
    .pipe(gulp.dest('production/script/js'))
    .pipe(rev.manifest('production/script/rev-manifest.json', {
      merge: false
    }))
    .pipe(gulp.dest(''));
});


gulp.task('watch', function() {
  gulp.watch('script/*.js', ['pack-js']);
});

gulp.task('default', ['watch']);
