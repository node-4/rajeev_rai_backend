const picture = require("../../model/image");
// const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require('cloudinary').v2;

// Configure Cloudinary with your credentials
// cloudinary.config({
//     cloud_name: "dbrvq9uxa",
//     api_key: "567113285751718",
//     api_secret: "rjTsz9ksqzlDtsrlOPcTs_-QtW4",
// });

// function uploadImageFromBase64(base64String, publicId) {
//   return new Promise((resolve, reject) => {
//     cloudinary.uploader.upload(
//       'data:image/jpeg;base64,' + base64String,
//       { public_id: publicId },
//       (error, result) => {
//         if (error) {
//           reject(error);
//         } else {
//           resolve(result.secure_url);
//         }
//       }
//     );
//   });
// }

// // Example usage
// const imageBase64 = req.body.image // Replace with your actual base64 string
// const publicId = req.body.id; // Replace with the desired public ID for the image

// uploadImageFromBase64(imageBase64, publicId)
//   .then(uploadedUrl => {
//     console.log('Uploaded image URL:', uploadedUrl);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });

// exports.uploadRouter = async (req, res) => {
//   try {
//     uploadedUrl.single("file")(req, res, async (err) => {
//       if (err) {
//         return res.status(400).json({ msg: err.message });
//       }

//       // Get the URL of the uploaded file
//       const fileUrl = req.file ? req.file.path : "";

//       const {

//         profile,
//       } = req.body;

//       const user = await picture.findOneAndUpdate(
//         { _id: req.params.id },
//         {
//           $set: {

//             profile: fileUrl || profile,
//           },
//         },
//         { new: true }
//       );

//       if (user) {
//         return res
//           .status(200)
//           .json({ msg: "Profile details updated", data: user });
//       } else {
//         return res.status(400).json({ msg: "Something went wrong" });
//       }
//     });
//   } catch (error) {
//     console.log(error)
//     return res.status(500).json({ msg: error.message, name: error.name });
//   }
// };

const cloudinary = require("cloudinary").v2;

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: "dbrvq9uxa",
  api_key: "567113285751718",
  api_secret: "rjTsz9ksqzlDtsrlOPcTs_-QtW4",
});

async function uploadImageFromBase64(base64String) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      "data:image/jpeg;base64," + base64String,
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.secure_url);
        }
      }
    );
  });
}

exports.uploadRouter = async (req, res) => {
  try {
    const { image } = req.body;

    const uploadedUrl = await uploadImageFromBase64(image);
    console.log(uploadedUrl);

    // Perform other operations here

    return res.status(201).json({ message: "Image uploaded successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};
