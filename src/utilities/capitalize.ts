/* ============================================
Capitalize word helper function - capitalize.ts
1) Helper function to capitalize file name
=============================================== */

// capitalize word utils function
const capitalizeWord = (word: string): string => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

// export capitalizeWord routes for use in other node modules
export default capitalizeWord;
