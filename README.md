# info

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

I use styled components and redux toolkit to manage the state and requests

tfjs lives within a hook, initially I planned on have a class for it and have it live in the userImage state and be used through thunk actions. but redux toolkit doesnt have proper use of asynk thunks outside of requests

the use effect loads the model and could clear the model, but it appears tfjs doesnt have that functionality yet

most of the apps functionality lives within the app HomeScreen Component and the use-breeds and use-mobilenet hooks that centralize all of the logic for them nad expose a limited number of props and callbacks. Allowing for all other components to be mostly visual. 

these hooks also expose normalized errors that can be easily be handled by the apps load & error component

while I was planing to keep most of the logic in async thunks, the structure of RTk's hooks makes this hard, so now the app is mostly based in hooks.

## instalation

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
