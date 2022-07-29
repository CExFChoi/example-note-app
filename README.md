# Example Note App

Simple Backbone JS application using localstorage, dustjs, and webpack

[Live Link via GH Pages](https://cexfchoi.github.io/example-note-app/)


## Local

1. clone repo
2. change into directory
    ```
    cd example-note-app
    ```
3. Install dependancies
    ```
    yarn install
    ```
4. Compile any dustJS templates
    ```
    cd src/templates
    npx dustc *.dust -o ../../lib/templates.js
    ```
5. Run webpack dev server
    ```
    npx webpack-dev-server
    ```
6. Application hosted on [localhost:8080](http://localhost:8080/)