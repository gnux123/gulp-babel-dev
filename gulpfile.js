const del = require('del');
const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify-es').default;

let _dirs = 'src/{*, */*/}*.jsx';

const jsbuild = () => {
    return gulp.src(_dirs)
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest('dest'));
}

const uglifyjs = () => {
    return gulp.src('dest/{*,*/*}*.js')
        .pipe(uglify().on('error',  err => console.log(err)))
        .pipe(gulp.dest('dest'));
}

const clean = done => del('dest', {force: true, read: false});

const listener = done => gulp.watch(_dirs, gulp.parallel(jsbuild));

const jsCreate = gulp.series(jsbuild, uglifyjs);
const watchJsDev = gulp.parallel(jsbuild, listener);
gulp.task("server", gulp.series(clean, gulp.series(watchJsDev)));

gulp.task("build", gulp.series(clean, gulp.parallel(jsCreate)));
