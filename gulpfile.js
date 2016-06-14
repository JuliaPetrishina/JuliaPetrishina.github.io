const gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    useref = require('gulp-useref'),
    uglify = require('gulp-uglify'),
    gulpIf = require('gulp-if'),
    cssnano = require('gulp-cssnano'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    del = require('del'),
    runSequence = require('run-sequence'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    moduleImporter = require('sass-module-importer'),
    scsslint = require('gulp-scss-lint'),
    fontAwesome = require('node-font-awesome');

gulp.task('sass', () => {
    return gulp.src('app/scss/main.scss')
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('browserSync', () => {
    browserSync.init({
        server: {
            baseDir: 'app'
        },
    })
});

gulp.task('css', () => {
    gulp.src('app/css/**/*.css')
        .pipe(sourcemaps.init())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(concat('all.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'))
});

gulp.task('scss-lint', function() {
    return gulp.src('/app/**/*.scss')
        .pipe(scsslint());
});

gulp.task('useref', () => {
    return gulp.src('app/**/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        // Minifies only if it's a CSS file
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('dist'))
});

gulp.task('images', () => {
    return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
        // Caching images that ran through imagemin
        .pipe(cache(imagemin({
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
});

gulp.task('cache:clear', (callback) => {
    return cache.clearAll(callback);
});

gulp.task('fontsAwesome', function() {
    gulp.src(fontAwesome.fonts)
        .pipe(gulp.dest('./app/fonts'));
});

gulp.task('fonts', () => {
    return gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))
});

gulp.task('clean:dist', () => {
    return del.sync('dist');
});

gulp.task('watch', ['browserSync', 'sass'], () => {
    gulp.watch('app/scss/**/*.scss', ['sass']);
    gulp.watch('app/**/*.html', browserSync.reload);
    gulp.watch('app/**/*.js', browserSync.reload);
});

gulp.task('build', (callback) => {
    runSequence('clean:dist',
        ['sass', 'css', 'useref', 'images', 'fonts'],
        callback
    )
});

gulp.task('default', (callback) => {
    runSequence(['sass', 'css', 'scss-lint', 'browserSync', 'watch'],
        callback
    )
});

