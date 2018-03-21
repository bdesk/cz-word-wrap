# cz-word-wrap
Grammar extension for Czech to wrap words

## Description ##
The Czech language has special rules to wrap words in copy text, so that single characters or numbers at the end of a line should be moved to the next line for better reading experience. We create a JavaScript extension, that apply those rules and formats the copy text on the website. 

## Installation and dependecies ##

### Include necessary js files ###

```<!DOCTYPE html>
<html>
   <head>
      <!--Include this css file in the <head> tag -->
   </head>
   
   <body>
      ...
      <!--Include these script files in the <head> or <body> tag-->
      <script src="lib/jquery.1.11.min.js"></script>
      <script src="jquery.czText.js"></script>
   </body>
</html>
```
### Initialize plugin ###

``$(document).ready(function () {$('p').czText();});``
