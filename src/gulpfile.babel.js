import gulp from 'gulp';
import del from 'del';
import babel from 'gulp-babel';
import eslint from 'gulp-eslint';
import { exec } from 'child_process';

const paths = {
  gulpFile: './gulpfile.babel.js',
  app: './app/**/*.js',
  libDir: './lib/'
};

gulp.task('clean', () =>
  del(paths.libDir)
);

gulp.task('lint', () => {
  gulp.src([paths.gulpFile, paths.app])
   .pipe(eslint())
   .pipe(eslint.format())
   .pipe(eslint.failAfterError())
});

gulp.task('build', ['clean', 'lint'], () =>
  gulp.src(paths.app)
    .pipe(babel())
    .pipe(gulp.dest(paths.libDir))
);

gulp.task('main', ['build'], (callback) => {
  exec(`node ${paths.libDir}`, (error, stdout) => {
    console.log(stdout);
    return callback(error);
  });
});

gulp.task('watch', () => {
  gulp.watch(paths.app, ['main']);
});

gulp.task('default', ['watch', 'main']);
