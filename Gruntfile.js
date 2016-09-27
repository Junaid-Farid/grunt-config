module.exports = function (grunt) {
    grunt.initConfig({
        //reading the files
        pkg: grunt.file.readJSON("package.json"),
        uglify: {//name of the tasks plugin
            options: {//these are the value as a parameters like in function or method we are passing options object these vary from plugins to plugins
                mangle: true, //means short name in js compress file
                compress: true, //minify files
                sourceMap: "dist/application.map",
                banner: "/* <%= pkg.author%> <%= pkg.license%> | <%= grunt.template.date(new Date(100), 'yyyy-mm-dd')%>/\n */" // discription in min file at the top
                //Junaid Ahmed 2016
                        //the above banner is added in concat 
            },
            target: {//there may be destination or util or other things what will be perfome based on option parameter and what will be the source file and destination file
                src: "dest/application.js",
                dest: "dist/application.min.js" //minfied file
            }
        },
        //adding the another plugins as property object
        //here the jshint property object
        jshint: {
            options: {//creating options object 
                //visit jshint.com
                //there are two way to set the option
                //one set the option individual here 

//               eqeqeq: true, // that make sure that there is no double equal
//               curly: true, //make sure that we always use curly braces if we have one line if or one line loop
//               undef: true, //where keyword when creating variable
                //unused: true // will look the unused variable and method and alert us
                //another way is to put the hint option object in a separate file and link here as jshintsrc option object

                //comment out all the option to use in separate file create a .jshintrc file in home directory of project 
                jshintrc: ".jshintrc"
            },
            target: {
                //jshint does not need the destination because it just read the file and tells us the issue
                src: "src/*.js" // * indicate that all js files in scr directory 
            }
        },
        concat: {
            options: {
                seperator: ";", //seperator which indicate the files end
                //banner: "/* Junaid Ahmed 2016 */\n" // discription in min file at the top
            },
            target: {
                src: ["src/application.js", "src/util.js"], //this is the array where we put these file togather
                dest: "dest/application.js"
            }
        },
        //watch the changes
        watch: {
            options: {
                livereload: true
            },
            scripts: {
                files: ["src/*.js"],
                tasks: ["jshint"]
            }
        },
        clean: {
            target: ['dist', 'lib']
        },
        versioncheck: {
            target: {
                options: {
                    skip: ["semver", "npm", "lodash"],
                    hideUpToDate: false
                }
            }
        },
        //multi task
        //grunt multi will run all the tasks in multi

        multi: {
            target: {
                name: "Junaid",
                age: 23
            }, //run as grunt multi:target //will run only the obeve tast
            other: {
                arr: [1, 2, 3],
                bool: false
            },
            last: {
                obj: {
                    one: 1,
                    two: 2
                }
            }
        }
    });

    //loading the tasks
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');

    //checking the version

    grunt.loadNpmTasks('grunt-version-check');
    //register the task in order which you want
    grunt.registerTask("default", ['jshint', 'concat', 'uglify']);
    //in above "default" indicate the which command we write to run the tasks in order here default means just run grunt command
    //if we want another name to run means we want to run as grunt perform then we will write as "perfomr" 

    //making own task
    //task without parameter
    grunt.registerTask("tutorials", "This is an example task", function () { //here first parameter is the name of the task and second is for the description we can write the discription in the above task
        if (+new Date() % 2 === 0) {
            console.log("time is even");
        } else {
            console.log("time is odd");
        }
    });
    //run the above task
    //>>> grunt tutorials

    //tasks with parameters
    grunt.registerTask("withArgs", function (one, two) {
        var str = this.name + " : "; //here this.name indicate the name of the task
        str += one || "one, ";
        str += two ? ", " + two : ", two";
        console.log(str);
    });
    //runt as >>> grunt withArgs
    // the above will give print the one and two on the console

    //run as >>> grunt withArgs:Junaid
    //will print the Junaid two

    //run as >>> grunt withArgs:Junaid:Ahmed
    //output will be Junaid Ahmed

    //creating multi task
    grunt.registerMultiTask("multi", function () {
        console.log(this.target);
        console.log(this.data);
    });
};