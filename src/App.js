// import { useState,useRef } from 'react';
// import './App.css';
// import Tesseract from 'tesseract.js';

// function App() {
//   const [getText, setText] = useState('');
//   const [imagePath, setImagePath] = useState('');
//   const [display, setDisplay] = useState(false)
//   const handleOnChange = (e) =>{
//     setImagePath(URL.createObjectURL(e.target.files[0]));
//     console.log(URL.createObjectURL(e.target.files[0]))
//   } 
//   const handleClick = () =>{
//     Tesseract.recognize(
//       imagePath,'eng',
//       {
//         logger: m =>
//         console.log(m)
//       }
//     )
//     .catch((err)=>{console.log(err)})
//     .then((res)=>{
//       setText(res);
//       setDisplay(true)
//     })
//   }
//   return (
//     <div className="App">
//       { display
//         ? 
//           <div>
//             <p>{JSON.stringify(getText)}</p>
//           </div>
//         :
//           <div>
//           <h1>hello</h1>
//             <img src={imagePath} alt="logo" />
//             <h3>Text From Image</h3>
//             <input type="file" onChange={handleOnChange} />
//             <button onClick={handleClick}>Convert Image To Text</button> 
//           </div>
//       }
//     </div>
//   );
// }

// export default App;


import { useEffect, useState } from "react";
import { createWorker } from "tesseract.js";
import "./App.css";
function App() {
  const [data, setData] = useState("");
  const [imageData, setImageData] = useState(null);
  const worker = createWorker({
    logger: (m) => {
      console.log(m);
    },
  });
  const convertImageToText = async () => {
    if (!imageData) return;
    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");
    const {
      data: { text },
    } = await worker.recognize(imageData);
    setData(text);
  };

  useEffect(() => {
    convertImageToText();
  }, [imageData]);

  function handleImageChange(e) {
    const file = e.target.files[0];
    if(!file)return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageDataUri = reader.result;
      console.log({ imageDataUri });
      setImageData(imageDataUri);
    };
    reader.readAsDataURL(file);
  }
  return (
    <div className="App">
      <div>
        <p>Choose an Image</p>
        <input
          type="file"
          name=""
          id=""
          onChange={handleImageChange}
          accept="image/*"
        />
      </div>
      <div className="display-flex">
        <img src={imageData} alt="" srcset="" />
        <p>{data}</p>
      </div>
    </div>
  );
}
export default App;
// */