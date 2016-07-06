# core-lib

The project consists of two parts, core-lib and components, one for maintaining the essential logics one for view.
Core-lib has following parts:

## storage-book
  
The storage-book, which responsible for creating and managing notebooks. Each time a notebook is loaded such a new instance of this class will be created.
When creating such instance it will check if .tree file exists under the folder, if not or parse failed a new .tree file will be created. Otherwise, the 
instance will check if the parsed the file tree match with the existing one and correct it.
Be aware, not all property values are checked, so you should do it at upper layer. (e.g when invoking 'change' method, it will not check if it do need to change category/notebook). 
Besides, almost all methos has two way to be called, like 'getNow', when argument 'chapter' exists, it will return the index of current note, otherwise the index of current category is returned.

## storage-top
 
Managing all notebooks via .tree file under user folder. Within the life cycle of the application only one instance will be created, and .tree file will be loaded/created depending on situation. 
Be aware like the class above, it will not check the validity of the properties and the check should be done on upper layers.

## config-manager

This class is used to manage the configurations of the application, mainly loading/swithing themes.
An instance will be created after launch the application, it will retrive a list of folders under the theme folder and get the last used theme(saved in .now folder). User can use 'refresh(theme)' to change theme. (still need external refresh, and usually need to restart the whole application to make it work)

## parser

This class provides a method to convert markdown into html.
Be aware in unit test use "config-manager-zhizhang" due a potential bug in babel-istanbul, otherwise the unit test will give a wrong hint that something is undefined in configManager.

## editor-theme

Only one method is provided which is used to load theme of the editor. This method is saved into global, under the current theme's style editor file, and generated from brace standard.

## book-picker

This is a singleton class, it provides two important methods 'create' and 'open' which both accepts a callback handler as argument, when executing a native folder selector will be opened. After user opened the selected folder, this method will get the absolute path of the folder and pass it to the registered callback handler.

## utils

Provides some useul method. 

### getFiles(dp)

Retrive all the .md files under dp folder, the returned array has already removed '.md' , e.g "1.md" will be "1".

### arrayAreSimilar(a1, a2)

Check if two arrays are similar (elements are same but orders doesn't matter):

    :::js
    arrayIsLike([1, 2, 3], [2, 1, 3]) //ture
    arrayIsLike([1, 2, 3, 4], [2, 1, 3]) //false
    
### stringToColor(string, colorConstraints)

This method is used to convert a string into RGBA color, details will be elaborated in "Theme-advanced" chapter.

### bindTryCatchWrapper(self, methods, handler)

This method will warp all methods of self with errorHandler. After invoked this method, if any error happens, it will be passed to the registered handler.

### logError(file)

Error log method, used to dump log to fil, the returned function can be used as a handler of bindTryCatchWrapper or other simlilar methods.  

### bindFunctions(self, methods, tryCatchHandler)

Bind all methods to self, if tryCatchHandler is provided then bindTryCatchWrapper will be applied also.

### createObjectWithErrorHandler(obj, handler)

Create error handler for all methods of a certain object.