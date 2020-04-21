import React, { useState, useEffect, useCallback } from 'react';

import { withFirebase } from '../Firebase';
import ImageUpload from './ImageUpload';

const UploadBefore = ({ firebase, uid }) => {
   const [file, setFile] = useState(null);
   const [img, setImage] = useState(null);
   const [error, setError] = useState(null);

   const loadImage = useCallback(() => {
      // console.log("loadImage");
      firebase.userBefore(uid).getDownloadURL().then(function (url) {
         if (url) {
            setImage(url);
            localStorage.setItem("beforeUrl", url);
         } else {
            setImage(null);
            localStorage.removeItem("beforeUrl");
         }
      }).catch(error => {
         if (error.code === "storage/object-not-found") {
            console.log("not found");
         } else {
            setError(error)
         }
      });
   }, [firebase, uid])

   useEffect(() => {

      const url = localStorage.getItem("beforeUrl") || null;

      if (url) {
         setImage(url);
      } else {
         loadImage();
      }

      // console.log("mount");
      // return () => console.log("unmount");
   }, [loadImage]);

   const onSubmit = (e) => {
      e.preventDefault();
      if (file && file.size < 3000000) {
         const metadata = {
            contentType: file.type,
         };
         // console.log(e, file);
         firebase.userBefore(uid).put(file, metadata)
            .then((snapshot) => {
               // console.log("upload", snapshot);

               const toBase64 = async file => new Promise((resolve, reject) => {
                  const reader = new FileReader();
                  reader.readAsDataURL(file);
                  reader.onload = () => resolve(reader.result);
                  reader.onerror = error => reject(error);
               });
               const Main = async () => {
                  const base64 = await toBase64(file);
                  setFile(null);
                  setImage(base64);
                  localStorage.setItem("beforeUrl", base64);
               };
               Main();
            })
            .catch(error => setError(error));
      }
   }

   const removeImage = () => {
      firebase.userBefore(uid).delete().then(function () {
         // File deleted successfully
         setFile(null);
         setImage(null);
         localStorage.removeItem("beforeUrl");
      })
         .catch(error => setError(error));
   }

   const onFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
         setFile(file);
      }
   }

   return (
      <>
         <ImageUpload
            onSubmit={onSubmit}
            onFileChange={onFileChange}
            onRemove={removeImage}
            img={img}
            error={error}
            file={file}
            title={"Before"}
         />
      </>
   )
}

export default withFirebase(UploadBefore);