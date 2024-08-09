/* ====================================================================
Sharp API method utility function - sharpize_image.ts
1) Helper function to rum sharp method to convert image to .webp format
======================================================================= */

// import sharp module
import sharp from 'sharp';

// import capitalizeWord module
import capitalizeWord from './capitalize';

// variable to resolve sharp promise
let returBool: boolean;

// sharpizeImage function to wrap sharp method
const sharpizeImage = async (inputFilepath: string, outputFilepath: string, filename: unknown): Promise<boolean> => {
  //define sharp promise
  // the promise is resolved if the image is converted to webp
  // use outputFilePath to set output .webp image file name
  // else reject promise
  const sharpPromise: Promise<boolean> = new Promise((resolve, reject) => {
    sharp(inputFilepath)
      .webp({ force: true })
      .toFormat('webp')
      .toFile(outputFilepath)
      .then(() => {
        console.log(`Done Processing ${capitalizeWord(filename as string)}`);
        resolve(true);
      })
      .catch((err) => {
        console.error(`File Error` + err);
        reject(false);
      });
  });

  // return promise so the function calling sharpizeImage method can use .then() and .catch methods
  returBool = await sharpPromise;
  return returBool;
};

// export sharpizeImage method for use in other node modules
export default sharpizeImage;
