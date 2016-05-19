# React component

Besides the core library are the UI components, all the rendering and interaction logics are packed inside these components as React Framework.

## book-item && book-list

book-item contains the logic to interate with each book component. book-list uses mulitple book-item to construct a list.

## sortable-item && sortable-list

Since these two components are designed as the parent class of category list and note list, so there are some vaguenesses.
Mainly the 'props.layoutMode' and 'props.addButtonLocation', the previous one has 'horizontal' and 'vertical', it decides whether the list is rendered horizontally or vertically; the later one has 'front' and 'end',
depends you want to 'add' button after or before the list.
And one more thing, any components that inherites from 'sortable-list' should call 'this.initState(name, indexes)' at initialization phase.

## chapter-list && page-list

These two components inherites from 'sortable-list' and responsible for displaying and managing the categories of current notebook/dairy list.

## editor

This component acts as the viewer of the editor, just by wrapping the ace editor like other react compoents.

## page

This component is used to display the content of the notes, including editor and preview. To change the writing modes means the style of this component will be changed.

## toolbar

The toolbar at top-right corner with buttons and selecting box, the detail has already be introduced in previous charpter. Attention, 'props.styleItem' only works on buttons, and will be applied to all buttons.

## context-menu

The context-menu is binded to every sortable elements. Currently only create, rename remove and copy functions are supported.

## notify

The component of notification system, used to poping out warning message or hint message at top-right corner( currently only 'save succed' message ).
The core of this component is 'show' method, when use it you the reference of the component need to be get first then the 'show' method can be invoked.

    :::javascript
    function show(type, message, callbacks)
    
### type

strings, 'warn' 'error' 'sysInfo' and 'info' 4 types are supported, the first 3 are modal and the last one is popup, each mode can received a 'message' string to be displayed and a collection of callbacks 'callbacks'.

### callbacks

Callback collections, a typical 'callbacks' looks like below:

    :::js
    callbacks = {
        onHide: {
            fun: this.onHide,
            param: []
        },
        onOk: {
            fun: this.onOk,
            param: []
        },
        onCancel: {
            fun: this.onCancel,
            param: []
        }
    }
      
Every callback should provide at least one 'fun' property used to invoke the call back function, param is optional and can be used to pass arguments to call back function.
ohHide is optional for every type and it will disappear after trigged by modal or popup.
onOk is only optional for 'warn' 'error' and 'sysInfo', it will be trigged after the user clicked the 'OK' button.
onCancel is only optional for 'warn', and will be trigged after the user clicked 'Cancel'.