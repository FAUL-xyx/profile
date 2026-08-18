# Premium Digital Business Card

A premium, interactive, 3D Digital Business Card and Link-in-Bio platform. Built with vanilla web technologies, featuring a dark luxury design and a fully functional editor dashboard.

## Features
- **Premium 3D UI:** Uses VanillaTilt.js for smooth, device-responsive 3D tilt effects.
- **Glassmorphism & Dark Luxury:** Custom design using Tailwind CSS with gold accents.
- **Interactive Editor:** Admin dashboard to live-edit your profile without touching code.
- **Drag & Drop:** Reorder social links effortlessly.
- **Live Preview:** See changes instantly in the desktop editor.
- **Data Persistence:** Uses `localStorage` to save your data seamlessly across reloads.
- **Share & QR Code:** Built-in sharing tools and dynamic QR code generation.

## How to Run
1. Unzip the downloaded folder.
2. Open `index.html` in your browser. (Since we use LocalStorage and no external assets that cause CORS issues, simply double-clicking the file works).
3. To edit your profile, click the golden pen icon floating at the bottom right, or open `admin.html`.

## Project Structure
- `index.html` - The public facing Digital Business Card.
- `admin.html` - The Editor/Dashboard for customization.
- `css/`
  - `style.css` - Custom styles and animations for the main view.
  - `admin.css` - Custom styles for the admin dashboard.
- `js/`
  - `data.js` - Data model and LocalStorage handlers.
  - `app.js` - Logic for `index.html` (rendering data, 3D init, modal).
  - `admin.js` - Logic for `admin.html` (form handling, drag&drop, live preview updates).

## Next Steps for Production
If you want to host this for multiple users:
1. Replace `localStorage` in `js/data.js` with an API call (Fetch API) to your backend.
2. Add Authentication (Login/Register) before accessing `admin.html`.
3. Use a database (MongoDB, PostgreSQL) to store each user's links and profile data.
