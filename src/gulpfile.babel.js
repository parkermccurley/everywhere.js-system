import gulp from 'gulp';
import del from 'del';
import eslint from 'gulp-eslint';
import mocha from 'gulp-mocha';
import babel from 'gulp-babel';
import { exec } from 'child_process';

const paths = {
  gulpFile: './gulpfile.babel.js',
  app: './app/**/*.js',
  test: './test/**/*.spec.js',
  libDir: './lib/',
  libTests: './lib/**/*.spec.js'
};

gulp.task('clean', () =>
  del(paths.libDir)
);

gulp.task('lint', () => {
  gulp.src([paths.gulpFile, paths.app, paths.test])
   .pipe(eslint())
   .pipe(eslint.format())
   .pipe(eslint.failAfterError())
});

gulp.task('build', ['clean', 'lint'], () =>
  gulp.src([paths.app, paths.test])
    .pipe(babel())
    .pipe(gulp.dest(paths.libDir))
);

gulp.task('test', ['build'], () =>
  gulp.src(paths.libTests)
    .pipe(mocha())
);

gulp.task('main', ['test'], (callback) => {
  exec(`node ${ paths.libDir }`, (error, stdout) => {
    console.log(stdout);
    return callback(error);
  });
});

gulp.task('watch', () => {
  gulp.watch(paths.app, ['main']);
});

gulp.task('default', ['watch', 'main']);
