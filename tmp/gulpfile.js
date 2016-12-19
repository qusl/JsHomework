/// <binding BeforeBuild='uglifyscripts' />
// include plug-ins
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var del = require('del');

var config = {
    src: [ 'scripts/services/javaScript.js'
        , 'scripts/**/*.js'
        , '!scripts/app.js'
        , '!scripts/app.bootstrap.js'
        , '!scripts/app.routes.js'
        , '!scripts/controllers/homeViewController.js'
        , '!scripts/services/dependencyResolverFor.js'
        , '!scripts/app.initial.js'
        , '!scripts/app.util.js'
        , '!scripts/app.service.helper.js'
        , '!scripts/**/*.min.js'
        , '!scripts/all.min.js'
    ]
}

//delete the output file(s)
gulp.task('clean', function () {
    //del is an async function and not a gulp plugin (just standard nodejs)
    //It returns a promise, so make sure you return that from this task function
    //  so gulp knows when the delete is complete
    return del(['scripts/all.min.js']);
});

// Combine and minify all files from the controllers folder and dataconfig folder
// This tasks depends on the clean task which means gulp will ensure that the 
// clean task is completed before running the scripts task.
gulp.task('uglifyscripts', ['clean'], function () {
    return gulp.src(config.src)
      .pipe(uglify())
      .pipe(concat('all.min.js'))
      .pipe(gulp.dest('scripts/'));
});

//Set a default tasks
gulp.task('default', ['scripts'], function () { });