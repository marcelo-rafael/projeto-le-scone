// Adiciona os módulos instalados
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify');

// Função para compilar o Sass e adicionar os prefixos
function compilaSass() {
  return gulp
    .src('scss/**/*.scss')
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('css/'))
    .pipe(browserSync.stream());
}

// Tarefa de gulp para a função de Sass
gulp.task('sass', compilaSass);

// Função para iniciar o browser
function browser(){
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
}

// Tarefa para iniciar o browser-sync
gulp.task('browser-sync', browser);

// Função de watch do Gulp
function watch(){
  gulp.watch('scss/**/*.scss', compilaSass);
  gulp.watch(['*.html']).on('change', browserSync.reload);
}

// Inicia a tarefa de watch
gulp.task('watch', watch);

// tarefa padrão do Gulp, que inicia o watch e o browser-sync
gulp.task('default', gulp.parallel('watch', 'browser-sync', 'sass'));