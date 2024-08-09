/* ========================================================
Multer image upload module - multer.ts
1) Helper function to upload image on the server with multer
=========================================================== */

// import multer module
import multer from 'multer';

// set and map .png, .jpg and .jpeg to known mime types
const mime_type_map: any = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

// storage function to wrap multer.diskStorage method
const storage = multer.diskStorage({
  // provide destination and file name callbacks
  destination: (req, file, cb) => {
    const isValid: boolean = mime_type_map[file.mimetype];
    let err = new Error('Invalid Mime Type');
    if (isValid) {
      err = null as unknown as Error;
    }
    cb(err, './src/assets/uploads');
  },
  filename: (req, file, cb) => {
    const filename = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, `${filename}`);
  }
});

// export storage method for use in other node modules
export default storage;
