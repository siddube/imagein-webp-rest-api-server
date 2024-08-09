/* =================================================================
Pathname Generator helper function - pathname_generator.ts
1) Helper function to generate paths to upload and download images
==================================================================== */

// import path
import path from 'path';

// declare returnPathName as a string variable
let returnPathName: string;

// generate path utils function
// accpet directory and filename to construct path and return it
const pathnameGeneratorRootDirectory = (directory: string, filename: unknown): string => {
  returnPathName = path.join(__dirname, `../assets/${directory}/${filename}`) as string;
  return returnPathName;
};

// export pathnameGeneratorRootDirectory method for use in other node modules
export default pathnameGeneratorRootDirectory;
