import React, { useState } from 'react';
import Product_Cateary_name from '../Helpers/Product_Cateary_name';
import { FaCloudUploadAlt } from "react-icons/fa";
import Upload_image_Cloundary from '../Helpers/Upload_image_Cloundary';
const Upload_Product = () => {
  // State for form data
  const [data, setData] = useState({
    productName: '',
    brandName: '',
    category: '',
    price: '',
    quantity: '',
    productImage: [],
    description: '',
    selling: ''
  });

  // Upload_Product

  const [uploadproductimageinput,SetUploadProductImage]= useState("")

  // Handle form input changes
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission
  const handleOnSubmit = (e) => {
    e.preventDefault();
    // Process the form data here
    console.log(data);
    // You can add logic to send `data` to a server or perform other actions
  };
  
  const handleUploadProduct= async(e)=>{
    const file = e.target.files[0];
    SetUploadProductImage(file.name);
    console.log("file",file)

    const UploadimageCloundary = await Upload_image_Cloundary(file)
    console.log("upload-image", UploadimageCloundary.url)
  }

  return (
    <div className='fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
      <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
        <div className='flex justify-between items-center pb-3'>
          <h2 className='font-bold text-lg'>Upload Product</h2>
        </div>
        <form className='grid p-4 gap-2 h-full pb-5 overflow-y-auto' onSubmit={handleOnSubmit}>
          <label htmlFor='productName'>Product Name:</label>
          <input 
            type='text' 
            id='productName' 
            placeholder='Enter product name' 
            name='productName'
            value={data.productName} 
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded'
            required
          />
          <label htmlFor='brandName' className='mt-3'>Brand Name:</label>
          <input 
            type='text' 
            id='brandName' 
            placeholder='Enter brand name' 
            name='brandName'
            value={data.brandName} 
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded'
            required
          />
          <label htmlFor='category' className='mt-3'>Category:</label>
          <select 
            id='category' 
            name='category' 
            value={data.category} 
            onChange={handleOnChange} 
            className='p-2 bg-slate-100 border rounded'
            required
          >
            <option value="">Select Category</option>
            {Product_Cateary_name.map((el, index) => (
              <option value={el.value} key={el.value + index}>{el.label}</option>
            ))}
          </select>
          <label htmlFor='productImage' className='mt-3 block text-sm font-medium text-gray-700'>Product Image URL:</label>
<div className='p-2 bg-slate-100 border rounded h-48 w-full flex justify-center items-center'>
  <label htmlFor="uploadimageinput" className='w-full h-full flex flex-col justify-center items-center text-slate-500 cursor-pointer'>
    <span className='text-4xl'><FaCloudUploadAlt /></span>
    <p className='text-sm text-center mt-2'>Upload product image</p>
    <input type='file' id='uploadimageinput' className='sr-only' onChange={handleUploadProduct} />
  </label>
</div>

          <div>
            <img src="" width={80} height={80} className='bg-slate-100 border' alt="" />
          </div>

          {/* <label htmlFor='description' className='mt-3'>Description:</label>
          <textarea 
            id='description' 
            placeholder='Enter description' 
            name='description'
            value={data.description} 
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded'
          /> */}
          {/* <label htmlFor='selling' className='mt-3'>Selling Price:</label>
          <input 
            type='number' 
            id='selling' 
            placeholder='Enter selling price' 
            name='selling'
            value={data.selling} 
            onChange={handleOnChange}
            className='p-2 bg-slate-100 border rounded'
          /> */}
          <button type='submit' className='mt-4 bg-blue-500 text-white p-2 rounded'>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Upload_Product;
