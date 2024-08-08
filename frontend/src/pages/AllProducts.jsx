import { useState } from "react"
import Upload_Product from "../Componets/Upload_Product"

// import UploadProduct from '../';
const AllProducts = () => {
  const [openUploadProduct,setOpenUploadProduct] = useState(false)
  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
            <h2 className='font-bold text-lg'>All Product</h2>
            <button  className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full ' onClick={()=>setOpenUploadProduct(true)}>Upload Product</button>
        </div>


        {/* upload product componets  */}

        {
          openUploadProduct &&(
          <Upload_Product onClick={()=>setOpenUploadProduct(true)}/>
        )
        }
    </div>
  )
}

export default AllProducts
