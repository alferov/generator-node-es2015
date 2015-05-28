module.exports = function(grunt) {
  grunt.initConfig({
    concat: {
      dist: {
        src: ["app/header.html", "app/menu.html", "app/sections/*.html", "app/footer.html"],
        dest: "build/index.html"
      }
    },
    cssmin: {
      css: {
        files: {
          "build/css/main.css": ["app/css/*.css"]
        }
      }
    },
    connect: {
      server: {
        options: {
          keepalive: true,
          open: true,
          middleware: function() {
            var middleware = [];

            middleware.push(function(req, res, next) {
              if (req.url !== "/") return next();

              res.setHeader("Content-type", "text/html");
              var html = grunt.file.read("app/header.html");
              html += grunt.file.read("app/menu.html");

              var files = grunt.file.expand("app/sections/*.html");

              for (var i = 0; i < files.length; i++) {
                html += grunt.file.read(files[i]);
              }

              html += grunt.file.read("app/footer.html");
              res.end(html);
            });
          }
        }
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('serve', ['connect']);
  grunt.registerTask('build', ['concat', 'cssmin']);
  grunt.registerTask('default', ['build']);
};
