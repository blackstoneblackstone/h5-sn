const gulp = require('gulp')
const webserver = require('gulp-webserver')
gulp.task('webserver', function () {
  return gulp.src('/')
    .pipe(webserver({
      livereload: true,
      directoryListing: false,
      open: true,
      host: "lihb.vipkid.com.cn",
      port: 10000,
    }))
})
gulp.task('start', ['webserver'])
