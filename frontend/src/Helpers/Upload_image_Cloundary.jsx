


const Upload_image_Cloundary = async (image) => {

  const url = `https://api.cloudinary.com/v1_1/$(process.env.cloundinary_name)/image/upload`;
    const formData = new FormData();
    formData.append("file", image);
    formData.append('upload_preset', 'mahnoor');

      const dataResponse = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      return dataResponse.json()

    }

export default Upload_image_Cloundary;
