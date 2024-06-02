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

## Examples

![collapsables](https://github.com/Ledsav/md-portal/assets/82059014/f9bdab04-9639-4992-8a5d-22dcad6fc721)
Collapsable panels

![basicComponents](https://github.com/Ledsav/md-portal/assets/82059014/a4d06826-8b7e-414a-81ef-f257ed7ed860)
Slider and Tree View

![basicImport](https://github.com/Ledsav/md-portal/assets/82059014/58ef987d-6a0f-4272-8538-c608bc335fac)
Basic Import with button and dropzone

![filteredImport](https://github.com/Ledsav/md-portal/assets/82059014/cbc1a58b-cf76-4b67-9580-e7e67d02978b)
Filtered Import with a mini gallery

![deleteImages](https://github.com/Ledsav/md-portal/assets/82059014/def901f8-d174-4fb4-a6c4-f96cfa60edb5)
Delete Images from the gallery

![responsive](https://github.com/Ledsav/md-portal/assets/82059014/d762188e-4029-455f-81b0-616d8865d3c3)
App responsiveness in both desktop and mobile view

![changeLenguage](https://github.com/Ledsav/md-portal/assets/82059014/2eaaf734-fcf3-4a17-8288-274d1e8c9100)
Change language (en,fr)

![changeTheme](https://github.com/Ledsav/md-portal/assets/82059014/1928a80d-34b5-4453-b331-4c35897247be)
Change theme (light, dark)

![editTools](https://github.com/Ledsav/md-portal/assets/82059014/c7f679da-72a5-4cd1-8edd-6bc34a0085a8)
Edit tools (Draw, Delete, Contrast, Move)

![saveEdit](https://github.com/Ledsav/md-portal/assets/82059014/43eaaf48-892d-4fe3-92b3-3a3058cf4a87)
Save and Download the edited image

![resetApp](https://github.com/Ledsav/md-portal/assets/82059014/7f274d7b-f417-4035-b7de-39ac277a49f9)
Reset the App

### Possible Improvements:

- Additional tools: Zoom, recenter, filters.
- Database connection for permanent image storage.
- Authentication and login functionality.
- Support for uploading videos and models.

### Known Issues:

- The initial render of the language menu does not show the default selection (EN).
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
