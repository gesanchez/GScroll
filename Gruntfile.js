module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
        build: {
            files:{
                "build/GScroll.min.js" : "src/GScroll.js",
                "build/jquery-1.8.3.min.js" : "src/jquery-1.8.3.js"
            }
        } 
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
    
    
  grunt.registerTask('default', ['uglify']);

};