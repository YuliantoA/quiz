/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    
    extend: {
     fontFamily: {
    gardenia: ['gardenia', 'sans-serif'],
      },
      colors: {
      'quiz-beige':'#f5f5dc',
      'quiz-darkBlue':'#264898',
      'quiz-blue':'#0AA7E8',
      'quiz-lightBlue':'#59d2fe',
      'quiz-darkBlue2':'#191923'
    },
    },
  },
  plugins: [],
 };

