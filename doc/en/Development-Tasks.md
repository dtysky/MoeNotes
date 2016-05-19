# Grunt task

This app uses Grunt as building tool, I have predfined lots of grunt tasks to help developing, to use it just run 'grunt <TaskName>' 

## Task list

### debug

This task will compile the code and start a debugging server, usually used together with 'electron mainDev' for developing purpose.

### test

This task is used for unit tests and details will be explained in later chapters.

### build-pre

THis task is used for distribution, use webpack to pack everything into dist folder and prepare for final release. 

### build-xxx series

This series of tasks contain 'build-osx' 'build-linux' 'build-windows' 'build-all', which are used to deploy this app to different platforms, should run after 'build-pre'.
And it will be stored inside release folder.

### release-xxx series

This series of tasks contain 'build-pre' and 'build-xxx', use for release.