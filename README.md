# MD Portal

## Application Description

MD Portal is a React.js application designed for managing and editing medical images.

### Requested Features:

- **Ribbon:** User-friendly navigation.
- **Main Panel:** Displays imported medical images.
- **Collapsible Side Panels:**
    - **Left Panel:** Slider and tree view.
    - **Right Panel:** Import button.
- **Import Functionality:** Import modal dialog for success or failure.
- **Image Display:** Display image dimensions.
- **Color Schema:** Similar to Spine Sim.

### Delivered Features:

- **Enhanced Import Methods:**
    - Button with drag-and-drop zone and modal dialog.
    - Modern widget with gallery showcase.
- **Gallery Management:** Import multiple images, create a gallery, select, and remove images.
- **Language and Theme Switching:** Easily switch languages and themes.
- **Edit Panel:** Draw lines, delete lines, adjust contrast, move images, save, and download edited images.
- **Reset Functionality:** Reset all features.
- **Persistent State:** Maintains state after browser refresh or reopening.
- **Mobile Friendly:** Optimized for key features.

### Possible Improvements:

- Additional tools: Zoom, recenter, filters.
- Database connection for permanent image storage.
- Authentication and login functionality.
- Support for uploading videos and models.

### Known Issues:

- Initial render of the language menu does not show the default selection (EN).
- Difficulty drawing and navigating the edit window on mobile devices.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The
page will reload if you make edits, and you will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode. See the section
about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the
build for the best performance. The build is minified and the filenames include the hashes. Your app is ready to be
deployed!

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!** This command will remove the single build
dependency from your project, copying all the configuration files and dependencies into your project so you have full
control over them.

## Learn More

You can learn more in
the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started). To learn React,
check out the [React documentation](https://reactjs.org/).
