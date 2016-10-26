var gulp = require('gulp');
var rsync = require('gulp-rsync');

var paths = {
  configs: ['homeassistant/**/*', 'traefik/**/*'],
  compose: 'docker-compose.yml'
};

var rpi = '10.0.0.10'; 

// Copy app
gulp.task('copy', ['copy-config', 'copy-compose']);

// Copy configuration files
gulp.task('copy-config', function() {
  gulp.src(paths.configs)
    .pipe(rsync({
      hostname: rpi,
      username: 'pi',
      destination: '/usr/share/'
    }));
});

// Copy compose file
gulp.task('copy-compose', function() {
  gulp.src(paths.compose)
    .pipe(rsync({
      hostname: rpi,
      username: 'pi',
      destination: '/home/pi/compose'
    }));
});

// Watch for file changes
gulp.task('watch', function() {
  gulp.watch(paths.configs, ['copy-config']);
  gulp.watch(paths.compose, ['copy-compose']);
});

gulp.task('default', ['watch', 'copy']);