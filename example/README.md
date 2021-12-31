# react-crossword example app

This is a brief example of using
[@jaredreisinger/react-crossword](https://www.npmjs.com/package/@jaredreisinger/react-crossword)
in a React app.

## Usage

First, `npm install` from the parent directory (the crossword library proper),
and then `npm build` to populate the `dist/` files. Then, 'cd' into this example
directory, and `npm install` here as well.

> _In order to keep React happy when running this as a subdirectory of the
> component repo, we have to pull React and the peerDependencies in using
> file-relative references in this example's `package.json`, which means that
> the parent directory **must** be installed first. A real application should
> use React and other dependencies as normal, and simply `npm install @jaredreisinger/react-crossword` to use the Crossword component._

Finally, `npm start` to start up the demo server, and visit
http://localhost:3000 to see the crossword in action!
