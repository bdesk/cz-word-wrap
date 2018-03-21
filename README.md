# cz-word-wrap
Grammar extension for Czech to wrap words

## Description ##
The Czech language has special rules to wrap words in copy text, so that single characters or numbers at the end of a line should be moved to the next line for better reading experience. We create a JavaScript extension, that apply those rules and formats the copy text on the website. 

## Installation and dependecies ##

### Include necessary js files ###

```<!DOCTYPE html>
<html>
   <head>
     
   </head>
   
   <body>
      <script src="https://code.jquery.com/jquery-3.3.1.min.js"
                  integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
                  crossorigin="anonymous"></script>
      <script src="jquery.czText.js"></script>
   </body>
</html>
```
### Initialize plugin ###

```
$(document).ready(function () {
    $('p').czText();
    window.onresize = function () {
      $('p').czText('refresh');
    };
});
```

