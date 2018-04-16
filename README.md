#### How to run the project locally
##### Install dependencies
```
$ npm install
```

##### Start the development server
```
$ npm start
```

##### Watch `.scss` files to compile them to `.css`
```
$ npm run watch-css 
```

##### When ready to deploy, make production build of the app
```
$ npm run build
```
#### Note on the source files structure
The source folder structure is as follows:
```
src/
    img/
        loader.svg
        logo.svg
    js/
        components/
        services/
    scss/
        _homepage.scss
        ...
    App.css
    App.js
    index.css
    index.js
```

There is a slight deviation from the folder structure provided by `create-react-app`
to make managing component files easier. Therefore when adding a new component/module it should be placed into 
respective folder (js or scss) and then imported into top-level App component for `.scss` or into relevant JS file/top-level App component.

