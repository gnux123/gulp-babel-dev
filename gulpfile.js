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
const clean = () => del('dest', {force: true, read: false});
const listener = () => gulp.watch(_dirs, gulp.parallel(jsbuild));

gulp.task("server", gulp.series(clean, jsbuild, listener));
gulp.task("build", gulp.series(clean, jsbuild, uglifyjs));
