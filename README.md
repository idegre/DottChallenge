## info

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

The SPA uses styled components and redux toolkit to manage the state and requests

TFJS lives within a hook, initially I planned on have a class for it and have it live in the userImage state and be used through thunk actions. but redux toolkit doesnt have proper use of asynk thunks outside of requests. The use effect loads the model and could clear the model, but it appears tfjs doesnt have that functionality yet.

Most of the apps functionality lives within the app HomeScreen Component and the use-breeds and use-mobilenet hooks that centralize all of the logic for them nad expose a limited number of props and callbacks. Allowing for all other components to be mostly visual. These hooks also expose normalized errors that can be easily be handled by the apps load & error component. While I was planing to keep most of the logic in async thunks, the structure of RTk's hooks makes this hard, so now the app is mostly based in hooks.

The app utilizes chrome's built in lazy loading of images. This comes with the drawback that images must have static dimentions set as a prop.

### Flow description

1. the homeScreen component mounts and the useMobilenet hook starts loading, along with the List query, setting the isLoading prop to true
2. the user selects an image
3. the `selectImage` action is dispatched with the event
4. the image reducer produces a usable image URl and stores it (this could exist in a useEffect and erase the need for a store outside of the queryes)
5. `HomeScreen` gets the updated `selected image` from the store, sets the image into a `<img` html tag and rehidrates
6. once the image is loaded in the DOM, the `<img />` triggers its onLoad callback
7. at this point we know that the image Ref contains the loaded image and we can safely send it to TFJS as it requires a mounted image to work. ( doing this we can save on the extra memory of mounting a hidden image/ canvas within the useMobilenet hook, tough it would make the hook safer )
8. the callback from `useMobilenet` is called with the ref for the image and it runs the model returning a promise that resolves the classes (error are handled via the hook and catches are not necesary)
9. if classes are returned, the `getBreedPhotos` method is called
10. this method checks within the known breeds list for matches with the image classes. and uses the match to request for dog pictures, cutting down on errors
11. the image array is fed into the photoGallery and shown
## future improvements

- add themes
- style loading and error component (The wrapper supports pasing a custom component, there just isnt one)
- more tests
- add clear input button

## instalation

create .env file with the following variables
    - `REACT_APP_BREEDS_API_URL` -> the base url for the [dogs api](https://dog.ceo/api)
install node modules

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
]

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn jest`

Runs all avaliable tests
