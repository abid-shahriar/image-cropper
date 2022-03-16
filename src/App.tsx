import { ChangeEvent, useState } from 'react';
import ReactCrop from 'react-image-crop';
import styled from 'styled-components';

import 'react-image-crop/dist/ReactCrop.css';

function App() {
  const [image, setImage] = useState<any>('');
  const [loadedImage, setLoadedImage] = useState<any>('');
  const [crop, setCrop] = useState<any>({
    unit: '%',
    width: 30,
    aspect: 1
  });

  const onImageLoaded = (image: any) => setLoadedImage(image);

  const uploadImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target) return;

    if (!e?.target?.files?.length) return;

    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onloadend = function () {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const uploadImage = () => {
    const canvas = document.createElement('canvas');
    const scaleX = loadedImage.naturalWidth / loadedImage.width;
    const scaleY = loadedImage.naturalHeight / loadedImage.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(loadedImage, crop.x * scaleX, crop.y * scaleY, crop.width * scaleX, crop.height * scaleY, 0, 0, crop.width, crop.height);

    // const base64Image = canvas.toDataURL('image/jpeg');

    canvas.toBlob(
      (fileBlob) => {
        if (fileBlob) {
          console.log(fileBlob);
        }
      },
      'image/jpeg',
      1
    );
  };

  return (
    <Container>
      <input type='file' onChange={uploadImageHandler} accept='.jpg,.jpeg,.png' />

      <CropperWrapper>
        <ReactCrop onImageLoaded={onImageLoaded} src={image} crop={crop} onChange={(newCrop) => setCrop(newCrop)} keepSelection={true} />
      </CropperWrapper>

      <button onClick={uploadImage}>click me</button>
    </Container>
  );
}

export default App;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const CropperWrapper = styled.div`
  max-width: 400px;
  max-height: 400px;
  border: 1px solid red;
  position: relative;
  display: flex;
`;
