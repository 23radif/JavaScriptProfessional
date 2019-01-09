var gulp = require('gulp');

gulp.task('hello', function() {
  console.log('Hello, World!');
});

gulp.task('task-name', function () {
  return gulp.src('source-files')   // получаем источники с помощью gulp.src
    .pipe(aGulpPlugin())             // прогоняем их через плагин
    .pipe(gulp.dest('destination')) // выходные файлы в папке destination
});

// подключаем gulp-sass
var sass = require('gulp-sass');

// gulp.task('sass-compile', function(){
//   return gulp.src('app/scss/styles.scss')
//     .pipe(sass()) // Конвертируем Sass в CSS с помощью gulp-sass
//     .pipe(gulp.dest('app/css'))
// });

// gulp.task('sass-compile', function() {
//   return gulp.src('app/scss/**/*.scss') // Получаем все файлы с окончанием .scss в папке app/scss и дочерних директориях
//     .pipe(sass())
//     .pipe(gulp.dest('app/css'))
// });

gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// // Gulp watch
// gulp.task('watch', function(){
//   gulp.watch('app/scss/**/*.scss', ['sass-compile']);
// // другие ресурсы
// });

var browserSync = require('browser-sync');

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    },
  })
});

// gulp.task('watch', ['array', 'of', 'tasks', 'to', 'complete','before', 'watch'], function (){
//   // ...
// });

// gulp.task('watch', ['browserSync'], function (){
//   gulp.watch('app/scss/**/*.scss', ['sass-compile']);
// // другие ресурсы
// });

// gulp.task('watch', ['browserSync', 'sass'], function (){
//   gulp.watch('app/scss/**/*.scss', ['sass']);
// // другие ресурсы
// });


gulp.task('watch', ['browserSync', 'sass'], function (){
  gulp.watch('app/scss/**/*.scss', ['sass']);
// Обновляем браузер при любых изменениях в HTML или JS
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});


var useref = require('gulp-useref');

gulp.task('useref', function(){
  var assets = useref.assets();
  return gulp.src('app/*.html')
    .pipe(assets)
    .pipe(assets.restore())
    .pipe(useref())
    .pipe(gulp.dest('dist'))
});

// // другие подключения...
// var uglify = require('gulp-uglify');
// gulp.task('useref', function(){
//   var assets = useref.assets();
//   return gulp.src('app/*.html')
//     .pipe(assets)
//     .pipe(uglify())
//     .pipe(assets.restore())
//     .pipe(useref())
//     .pipe(gulp.dest('dist'))
// });

// другие подключения...
var gulpIf = require('gulp-if');
gulp.task('useref', function(){
  var assets = useref.assets();
  return gulp.src('app/*.html')
    .pipe(assets)
    // Если JS, то запускаем uglify()
    .pipe(gulpIf('*.js', uglify()))
    .pipe(assets.restore())
    .pipe(useref())
    .pipe(gulp.dest('dist'))
});


var minifyCSS = require('gulp-minify-css');
gulp.task('useref', function(){
  var assets = useref.assets();
  return gulp.src('app/*.html')
    .pipe(assets)
    // Минифицируем только CSS-файлы
    .pipe(gulpIf('*.css', minifyCSS()))
    // Uglifies only if it's a Javascript file
    .pipe(gulpIf('*.js', uglify()))
    .pipe(assets.restore())
    .pipe(useref())
    .pipe(gulp.dest('dist'))
});