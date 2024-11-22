import React, { useState } from 'react';
import * as mobilenet from '@tensorflow-models/mobilenet';
import '@tensorflow/tfjs';

function App() {
  const [image, setImage] = useState(null);
  const [predictions, setPredictions] = useState([]);

  const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const imageUrl = URL.createObjectURL(file);
    setImage(imageUrl);
    recognizeImage(imageUrl);
    }
  };

  const recognizeImage = async (imageUrl) => {
    try {
      // Load the MobileNet model
      const model = await mobilenet.load();
      const img = document.getElementById('uploaded-image');
      // Make predictions
      const predictions = await model.classify(img);
      setPredictions(predictions);
      } catch (error) {
      console.error('Error recognizing image:', error);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Client-Side Image Recognition</h1>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ margin: '20px 0' }}
      />
      {image && (
        <div>
          <h2>Uploaded Image:</h2>
          <img
            id="uploaded-image"
            src={image}
            alt="Uploaded"
            style={{ width: '300px', height: 'auto', marginTop: '20px' }}
          />
        </div>
      )}
      {predictions.length > 0 && (
      <div>
        <h2>Predictions:</h2>
        <ul>
          {predictions.map((prediction, index) => (
            <li key={index}>
              {prediction.className}: {(prediction.probability * 100).toFixed(2)}%
            </li>
          ))}
        </ul>
      </div>
      )}
    </div>
  );
}

  export default App;