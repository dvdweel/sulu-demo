
module.exports = function (grunt) {

    var time = new Date().getTime();

    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        compass: {
            dev: {
                options: {
                    sourcemap: false,
                    sassDir: 'src/Client/Bundle/WebsiteBundle/Resources/public/default/scss/',
                    specify: ['src/Client/Bundle/WebsiteBundle/Resources/public/default/scss/main.scss'],
                    cssDir: 'src/Client/Bundle/WebsiteBundle/Resources/public/default/css/',
                    relativeAssets: false
                }
            }
        }

    });

    // 2. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-rev');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // 3. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['compass']);

};