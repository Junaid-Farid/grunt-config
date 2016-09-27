var MyModule = (function(){
    function sayHi(name){
        return "Hi, " + name + " ! ";
    }
    return {
        sayHi: sayHi
    };
}());
function h1(text){
    return "<h1>" + text + "</h1>";
}