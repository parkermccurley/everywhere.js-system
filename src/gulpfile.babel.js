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
  build: './lib/',
  buildTests: './lib/**/*.spec.js'
};

gulp.task('clean', () =>
  del(paths.build)
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
    .pipe(gulp.dest(paths.build))
);

gulp.task('test', ['build'], () =>
  gulp.src(paths.buildTests)
    .pipe(mocha({reporter: 'progress'}))
);

gulp.task('main', ['test'], (callback) => {
  exec(`node ${ paths.build }`, (error, stdout) => {
    console.log(stdout);
    return callback(error);
  });
});

gulp.task('watch', () => {
  gulp.watch([paths.app, paths.test], ['main']);
});

gulp.task('default', ['watch', 'main']);
