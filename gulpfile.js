"use strict";

const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const server = require("browser-sync").create();
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const cheerio = require("gulp-cheerio");
const svgstore = require("gulp-svgstore");
const terser = require("gulp-terser");
const del = require("del");
const htmlmin = require("gulp-htmlmin");

gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css"));
  gulp.watch("source/js/script.js", gulp.series("compress-js", "refresh"));
  gulp.watch("source/img/icon-*.svg", gulp.series("make-sprite", "refresh"));
  gulp.watch("source/*.html", gulp.series("minify-html", "refresh"));
});

gulp.task("optimize-images", function () {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({ optimizationLevel: 3 }),
      imagemin.jpegtran({ progressive: true }),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"));
});

gulp.task("make-webp", function () {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest("build/img"));
});

gulp.task("make-sprite", function () {
  return gulp.src([
    "source/img/icon-*.svg",
    "source/img/logo-*.svg"
  ])
    .pipe(cheerio({
      run: function ($) {
        $("[fill]").removeAttr("fill");
      },
      parserOptions: { xmlMode: true }
    }))
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
});

gulp.task("compress-js", function () {
  return gulp.src("source/js/script.js")
    .pipe(gulp.dest("build/js"))
    .pipe(sourcemap.init())
    .pipe(terser())
    .pipe(rename("script.min.js"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/js"));
});

gulp.task("minify-html", function () {
  return gulp.src("source/*.html")
    .pipe(gulp.dest("build"))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/*.ico",
    "source/js/picturefill.min.js",
    "source/js/svg4everybody.min.js"
  ], {
      base: "source"
    })
    .pipe(gulp.dest("build"));
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("build", gulp.series(
  "clean",
  "copy",
  "optimize-images",
  gulp.parallel(
    "css",
    "make-sprite",
    "make-webp",
    "compress-js",
    "minify-html"
  )
));

gulp.task("start", gulp.series("build", "server"));
