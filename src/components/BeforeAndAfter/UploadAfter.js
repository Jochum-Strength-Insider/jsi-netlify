import React, { useState, useEffect, useCallback } from 'react';

import { withFirebase } from '../Firebase';
import ImageUpload from './ImageUpload';

// import axios from 'axios';
// const getBlob = (url) => {

//    axios.get(url, { responseType: 'arraybuffer' })
//       .then((response) => {
//          let image = btoa(
//             new Uint8Array(response.data)
//                .reduce((data, byte) => data + String.fromCharCode(byte), '')
//          );
//          return `data:${response.headers['content-type'].toLowerCase()};base64,${image}`;
//       });
// }

// const canvasRef = useRef(null);
// const imageRef = useRef(null);

// const loadTest = (e) => {
//    console.log(e, "onLoad");
//    canvasRef.current.width = imageRef.current.width;
//    canvasRef.current.height = imageRef.current.height;
//    const ctx = canvasRef.current.getContext("2d");
//    ctx.drawImage(imageRef.current, 0, 0);
//    const dataUrl = canvasRef.current.toDataURL();
//    console.log(dataUrl);
// }

// <canvas ref={canvasRef} />
// <img style={{ visibility: "hidden" }} ref={imageRef} alt="test" src={img} onLoad={loadTest} />

const UploadAfter = ({ firebase, uid }) => {
   const [file, setFile] = useState(null);
   const [img, setImage] = useState(null);
   const [error, setError] = useState(null);

   const loadImage = useCallback(() => {
      firebase.userAfter(uid)
         .getDownloadURL()
         .then(function (url) {
            // console.log(url);
            if (url) {
               setImage(url);
               localStorage.setItem("afterUrl", url);
            } else {
               setImage(null);
               localStorage.removeItem("afterUrl");
            }
            return url
         }).catch(error => {
            if (error.code === "storage/object-not-found") {
               console.log("not found");
            } else {
               setError(error)
            }
         });
   }, [firebase, uid])

   useEffect(() => {
      const url = localStorage.getItem("afterUrl") || null;

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
         firebase.userAfter(uid).put(file, metadata)
            .then((snapshot) => {
               // console.log("upload", snapshot);
               // loadImage();

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
                  localStorage.setItem("afterUrl", base64);
               };
               Main();
            })
            .catch(error => setError(error));
      }
   }

   const onFileChange = (e) => {
      const file = e.target.files[0];
      setFile(file);
   }

   const removeImage = () => {
      firebase.userAfter(uid).delete().then(function () {
         // File deleted successfully
         setFile(null);
         setImage(null);
         localStorage.removeItem("afterUrl");
      })
         .catch(error => setError(error));
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
            title={"After"}
         />
      </>
   )
}

export default withFirebase(UploadAfter);