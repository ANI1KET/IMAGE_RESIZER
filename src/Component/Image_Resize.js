import React, { useEffect, useState } from 'react';
import "./Image_Resize.css";

function App() {

  const [image, setImage] = useState('');

  useEffect(() => {
    const uploadBox = document.querySelector(".upload-box"),
      previewImg = uploadBox.querySelector("img"),
      fileInput = uploadBox.querySelector("input"),
      widthInput = document.querySelector(".width input"),
      heightInput = document.querySelector(".height input"),
      ratioInput = document.querySelector(".ratio input"),
      qualityInput = document.querySelector(".quality input"),
      downloadBtn = document.querySelector(".download-btn");
    const previewBtn = document.querySelector(".preview-btn");

    let ogImageRatio;

    const loadFile = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      previewImg.src = URL.createObjectURL(file);
      previewImg.addEventListener("load", () => {
        widthInput.value = previewImg.naturalWidth;
        heightInput.value = previewImg.naturalHeight;
        ogImageRatio = previewImg.naturalWidth / previewImg.naturalHeight;
        document.querySelector(".wrapper").classList.add("active");
        document.querySelector(".imagesize").classList.add("img");
      });
    }

    widthInput.addEventListener("change", () => {
      const height = ratioInput.checked ? widthInput.value / ogImageRatio : heightInput.value;
      heightInput.value = Math.floor(height);
    });
    widthInput.addEventListener("keyup", () => {
      const height = ratioInput.checked ? widthInput.value / ogImageRatio : heightInput.value;
      heightInput.value = Math.floor(height);
    });

    heightInput.addEventListener("change", () => {
      const width = ratioInput.checked ? heightInput.value * ogImageRatio : widthInput.value;
      widthInput.value = Math.floor(width);
    });
    heightInput.addEventListener("keydown", () => {
      const width = ratioInput.checked ? heightInput.value * ogImageRatio : widthInput.value;
      widthInput.value = Math.floor(width);
    });

    const preview = () => {
      const canvas = document.createElement("canvas");
      let ctx = canvas.getContext("2d");

      canvas.width = widthInput.value;
      canvas.height = heightInput.value;

      ctx.drawImage(previewImg, 0, 0, canvas.width, canvas.height);
      setImage(canvas.toDataURL());

      const modal = document.getElementById("myModal");
      modal.style.display = "block";
      const span = document.getElementsByClassName("close")[0];
      span.onclick = function () {
        modal.style.display = "none";
      }
    }

    const resizeAndDownload = () => {
      const canvas = document.createElement("canvas");
      const a = document.createElement("a");
      const ctx = canvas.getContext("2d");

      const imgQuality = qualityInput.checked ? 0.5 : 1.0;

      canvas.width = widthInput.value;
      canvas.height = heightInput.value;

      ctx.drawImage(previewImg, 0, 0, canvas.width, canvas.height);

      a.href = canvas.toDataURL("image/jpeg", imgQuality);
      a.download = new Date().getTime();
      a.click();
    }

    previewBtn.addEventListener("click", preview);
    downloadBtn.addEventListener("click", resizeAndDownload);
    fileInput.addEventListener("change", loadFile);
    uploadBox.addEventListener("click", () => fileInput.click());
  }, []);


  // const changewidth = () => {
  //   let ogImageRatio;
  //   const uploadBox = document.querySelector(".upload-box"),
  //     previewImg = uploadBox.querySelector("img");
  //   const widthInput = document.querySelector(".width input"),
  //     heightInput = document.querySelector(".height input"),
  //     ratioInput = document.querySelector(".ratio input");
  //   ogImageRatio = previewImg.naturalWidth / previewImg.naturalHeight;
  //   const height = ratioInput.checked ? widthInput.value / ogImageRatio : heightInput.value;
  //   heightInput.value = Math.floor(height);
  // }

  // const changeheight = () => {
  //   let ogImageRatio;
  //   const uploadBox = document.querySelector(".upload-box"),
  //     previewImg = uploadBox.querySelector("img");
  //   const widthInput = document.querySelector(".width input"),
  //     heightInput = document.querySelector(".height input"),
  //     ratioInput = document.querySelector(".ratio input");
  //   ogImageRatio = previewImg.naturalWidth / previewImg.naturalHeight;
  //   const width = ratioInput.checked ? heightInput.value * ogImageRatio : widthInput.value;
  //   widthInput.value = Math.floor(width);
  // }

  // const preview = () => {
  //   const canvas = document.createElement("canvas");
  //   const ctx = canvas.getContext("2d");
  //   const uploadBox = document.querySelector(".upload-box"),
  //     previewImg = uploadBox.querySelector("img"),
  //     widthInput = document.querySelector(".width input"),
  //     heightInput = document.querySelector(".height input");
  //   canvas.width = widthInput.value;
  //   canvas.height = heightInput.value;
  //   ctx.drawImage(previewImg, 0, 0, canvas.width, canvas.height);
  //   // document.body.appendChild(canvas);
  //   // document.querySelector("canvas").classList.add("previewimg");
  // }

  return (
    <>
      <div className="wrapper">
        <div className="upload-box">
          <input type="file" hidden />
          <img className="imagesize" src="https://cdn3d.iconscout.com/3d/premium/thumb/upload-image-8079452-6458695.png" alt="" />
          <p>Upload your Image File</p>
        </div>
        <div className="content">
          <div className="row sizes">
            <div className="column width">
              <label>Width</label>
              <input type="number" />
              {/* <input type="number" onChange={changewidth}/> */}
            </div>
            <div className="column height">
              <label>Height</label>
              <input type="number" />
              {/* <input type="number" onChange={changeheight}/> */}
            </div>
          </div>
          <div className="row checkboxes">
            <div className="column ratio">
              <input type="checkbox" id="ratio" defaultChecked={true} />
              <label htmlFor="ratio">Lock aspect ratio</label>
            </div>
            <div className="column quality">
              <input type="checkbox" id="quality" />
              <label htmlFor="quality">Reduce quality</label>
            </div>
          </div>
          <div className='Button'>
            <button className="preview-btn">Preview Image</button>
            <button className="download-btn">Download Image</button>
          </div>
        </div>
      </div>
      {/* {image && <img src={image} alt="" />} */}
      {
        <div id="myModal">
          <span className="close">&times;</span>
          <img src={image} className="modal-content" alt="" />
        </div>
      }
    </>
  )
}

export default App;