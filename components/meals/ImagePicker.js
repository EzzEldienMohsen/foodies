'use client';
import React from 'react';
import classes from './ImagePicker.module.css';
import Image from 'next/image';
const ImagePicker = ({ label, name }) => {
  const [pickedImage, setPickedImage] = React.useState();
  const imageInput = React.useRef();
  const handleImagePicker = () => {
    imageInput.current.click();
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) {
      setPickedImage(null);
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      console.log(fileReader.result);
      setPickedImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
    console.log(pickedImage);
  };
  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>There is no image picked yet</p>}
          {pickedImage && <Image src={pickedImage} alt="the Image" fill />}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          onChange={handleImageChange}
          ref={imageInput}
        />
      </div>
      <button
        className={classes.button}
        type="button"
        onClick={handleImagePicker}
      >
        Pick an Image
      </button>
    </div>
  );
};

export default ImagePicker;
