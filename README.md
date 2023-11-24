### Router
npm i react-router-dom
### Tailwind CSS
npm i -D tailwindcss
npm i -D postcss
npm i -D autoprefixer
npx tailwindcss init -p

Open tailwind.config.js and specify the path to the React components as follows:
module.exports = {
content: ['./src/**/*.{js,jsx,ts,tsx}'],

Now, open index.css in the src folder and add the following three lines at the top of the file:
@tailwind base;
@tailwind components;
@tailwind utilities;