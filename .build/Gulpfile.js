const gulp = require("gulp");
const del = require("del");
const ts = require("gulp-typescript");

// Build script (transpile /api) -- npm run build:
exports.build = gulp.series([
    () => del(["../dist"], { force: true }),
    cb => {
        const tsProject = ts.createProject("../tsconfig.json");
        tsProject.src()
            .pipe(tsProject()).js
            .pipe(gulp.dest("../dist"));
        cb();
    }
])

// Watch script (transpile /api on changes) -- npm run watch:
exports.watch = cb => {
    try {
        gulp.watch("../api/*.ts", { delay: 500 }, exports.build);
    }
    catch (e) {  }
    finally { cb() }
};





