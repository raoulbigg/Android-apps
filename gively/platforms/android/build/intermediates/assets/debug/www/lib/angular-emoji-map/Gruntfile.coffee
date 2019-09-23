module.exports = (grunt) -> 
  grunt.initConfig
    jshint:
      files: ['*.js', '!*.min.js']
    uglify:
      default:
        files: 
          'angular-emoji-map.min.js': ['angular-emoji-map.js']
      

  grunt.loadNpmTasks 'grunt-contrib-jshint'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.registerTask 'default', ['jshint', 'uglify:default']
