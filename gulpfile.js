let gulp = require('gulp'),
    sass = require('gulp-sass'),
    sassGlob = require('gulp-sass-glob'),
    watch = require('gulp-watch'),
    concat = require("gulp-concat"), 
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create(),
    pug = require('gulp-pug'),
    cleanCSS = require('gulp-clean-css'),
    gcmq = require('gulp-group-css-media-queries'),
    svgSprite = require('gulp-svg-sprite'),
    browserify = require('gulp-browserify'),
    changed = require('gulp-changed');
    
    

gulp.task('sass', function () {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sassGlob())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(gcmq())
        .pipe(cleanCSS({
            compatibility: 'ie8',
            format: 'keep-breaks'
        }))
        /* .pipe(cssnano()) */
        .pipe(browserSync.stream())
        .pipe(gulp.dest('./src/css/'));
});

gulp.task('watch', function(){
    browserSync.init({
        server: {
            baseDir : './dist/'
        }
    });
    gulp.watch("./src/scss/**/*scss", gulp.series('sass','concat'));
    gulp.watch("./src/pug/**/*.pug", gulp.series('pug'));
    gulp.watch("./src/js/*.js", gulp.series('js'));
});
gulp.task('concat', function() {
    return gulp.src('./src/css/main.css')
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.stream())
});


gulp.task('pug', function() {
    return gulp.src('./src/pug/*.pug')
    .pipe(changed('dist/', { extension: '.html' }))
    .pipe(pug({
        pretty: true
    }))
    .pipe(gulp.dest('dist/'))						
    .pipe(browserSync.reload({
        stream: true							
    }));
});

/* js *//* 
jsFiles = ['./node_modules/jquery/dist/jquery.min.js', './node_modules/imask/dist/imask.min.js','./src/js/main.js']; */
gulp.task('js', function () {
    return gulp.src('./src/js/main.js')
        .pipe(browserify())
        .pipe(gulp.dest('./dist/js/'))
        .pipe(browserSync.reload({
            stream: true							
        }));
});

/* end js */

/* svg-sprite */
gulp.task('svgSprite', function () {
    return gulp.src('./dist/img/**/*.svg') // svg files for sprite
    .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: "sprite.svg"  //sprite file name
                }
            },
        }
    ))
    .pipe(gulp.dest('./dist/img/sprite/'));
});
/* svg-sprite end */