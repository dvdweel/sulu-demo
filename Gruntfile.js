
module.exports = function (grunt) {

    var time = new Date().getTime();

    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        compass: {
            dev: {
                options: {
                    sourcemap: false,
                    sassDir: 'web/bundles/suluadmin/scss/',
                    specify: ['web/bundles/suluadmin/scss/main.scss', 'web/bundles/suluadmin/scss/todo.scss'],
                    cssDir: 'web/bundles/suluadmin/css/',
                    relativeAssets: false
                }
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'web/bundles/suluadmin/css/',
                    src: ['*.css', '!*.min.css'],
                    dest: 'web/bundles/suluadmin/dist/',
                    ext: '.min.css'
                }]
            }
        },
        watch: {
            scripts: {
                files: ['web/bundles/suluadmin/**'],
                tasks: ['compass'],
                options: {
                    nospawn: true,
                },
                compass: {
                    files: ['web/bundles/suluadmin/scss/{,*/}*.{scss,sass}'],
                    tasks: ['compass:dev']
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
    grunt.registerTask('default', ['compass','cssmin','watch']);

};