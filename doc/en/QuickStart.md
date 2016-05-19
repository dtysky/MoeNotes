# Quick Start

## First Use

When the app is first runned a dialog will pop out, and just select a empty folder and open it, your first note is then created.

## File Structure

The notebook file structure is shown below：  

    book  
    ├──.tree
    ├──chapter1  
    |       ├──page1
    |       └──age2
    |
    ├──chapter2
            ├──page1
            └──page2
    ......

The content of the notebook is save at two levels, folders as category, notes are saved under category. .tree file is used to store some essential information for managing the notes.

## UI
 
As shown below, the UI can be divided into several regions:

![preview-main-marked](../preview-main-marked.jpg)  
![preview-books-marked](../preview-books-marked.jpg)  

### 1. BOOK Button

After clicking the button the listwill be opened, as shown the image above.

### 2. Category List
 
A horizontal list, showing all categories within it. The last button is used to add a new category at the end, you can also use the Create in ⑦ menu to create/delete/rename. The order of the categories can be changed by just drag and move.

### 3. Artical List

A vertical list, showing the content of the opened notebook, the first button is used to add a new note, and like category you can use ⑦ menu to create/delete/rename too.

### 4. Editor

THe editor used here is ACE editor without context menu, shortcuts are the same as system shortcuts (like Home+F to open search in MAC)
THe edit language is enhanced Markdown, combined with math formulas and tables.
It follows the standard of [Github Flavored Markdown](https://guides.github.com/features/mastering-markdown/).
Math part follows the standard of [Tex](https://www.mathjax.org/).
If you want to add codes, you need to specify the language like '::lang', for intance:

    :::python
    print "x"
    
### 5. Preview

Preview the result of markdown lively.

### 6. Toolbar

From left to right：  

1. Mode select: normal, writing and view
2. Theme select: switch themes
3. Refresh: reload the application
4. About: some info about this app

### 7. Context menu
  
Right click on category or notebook list:

1. Remove：Delete the selected category or notebook (from hard drive).
2. Rename：Rename the selected category or notebook (files/folders will be renamed)
3. Create：Create a new category or notebook.
4. Copy：Not implemented.

### 8. Notebook

Each notebook consists of the icon,name at left and the buttons at top-right corner:  

1. Icon：Click to switch to the selected notebook.
2. Name: After rename is clicked you can edit it.
3. Buttons：Rename and delete. Notice the rename of notebooks will not have effect on real files on hard drive.  

### 9. Create and load notebook

Create and Load button can open a system dialog, the difference is Create allows you to create new folders. After a folder is selected, if matches the standard the notes will be loaded otherwise a default category and note will be created.