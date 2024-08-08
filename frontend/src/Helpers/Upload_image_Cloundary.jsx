const Upload_image_Cloundary = async (image) => {
  try {
    const url = 'https://api.cloudinary.com/v1_1/$(process.env.cloundary-image)/image/upload';
    const formData = new FormData();
    formData.append("file", image);
    formData.append('upload_preset', 'mern_product');
    
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

export default Upload_image_Cloundary;
