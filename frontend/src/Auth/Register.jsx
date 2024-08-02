
import { useState } from "react";
import { Link } from "react-router-dom";
import { BiShow, BiHide } from "react-icons/bi";
import loginSignupImage from "../../public/images/login-animation.gif";
const Register = () => {
//  show hide aur showpassword 
const [showPassword, setShowPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);
const handleShowPassword = () => {
  setShowPassword((prev) => !prev);
};
const handleShowConfirmPassword = () => {
  setShowConfirmPassword((prev) => !prev);
};
// show the loading in register button
const [loading, setLoading] = useState(false);
// show the user detail in console
const [data,SetData] = useState({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  profilepic: null,
})

// upload image with Cloudinary
const [image, setImage] = useState(null);
const [imagePreview, setImagePreview] = useState(null);
const imageChange = (e) => {
  const file = e.target.files[0];
  setImagePreview(URL.createObjectURL(file));
  setImage(file);
};


const uploadImage = async () => {
  if (!image) return null;
  const data = new FormData();
  data.append('file', image);
  data.append('upload_preset', 'mahnoor');
  try {
    let response = await fetch('https://api.cloudinary.com/v1_1/dizrz6ejl/image/upload', {
      method: 'POST',
      body: data,
    });
    let urlData = await response.json();
    return urlData.secure_url; // Ensure to use secure_url
  } catch (error) {
    console.log(error);
    throw new Error('Image upload failed');
  }
};

// show the user detail in console
const handleInput = (e) => {
  SetData({
    ...data,
    [e.target.name]: e.target.value,
  });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log(data);
  try {
    // Upload image if available
    let imageUrl = null;
    if (image) {
      imageUrl = await uploadImage();
    }

    const userData = {
      ...data,
      image: imageUrl,
    };

    console.log(userData); // Handle form data here (e.g., send to server)
  } catch (error) {
    console.error('Error during form submission:', error);
  } finally {
    setLoading(false); // End loading
  }
};

  return (
    <div>
       <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-10 w-auto"
          src="https://www.svgrepo.com/show/301692/login.svg"
          alt="Workflow"
        />
        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
          Create a new account
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="w-20 h-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative">
          <div className="relative">
          <img
            className="w-20 h-20 rounded-full drop-shadow-md shadow-md mx-auto"
            src={imagePreview || loginSignupImage}
            alt="Profile Preview"
          />
          <label htmlFor="profileImage" className="absolute bottom-0 w-full bg-slate-500 bg-opacity-50 text-center cursor-pointer">
            <div className="text-sm p-1 text-white">Upload</div>
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              className="hidden"
              onChange={imageChange}
            />
          </label>
        </div>
          </div>
          <form  onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-5 text-gray-700">
                Name
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  value={data.name}
                  onChange={handleInput}
                />
              </div>
            </div>
            <div className="mt-6">
              <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
              <input
               name="email"
               type="email"
               autoComplete="email"
               required
               className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
               value={data.email}
               onChange={handleInput}
             />
              </div>
            </div>
            <div className="mt-6">
              <label htmlFor="password" className="block text-sm font-medium leading-5 text-gray-700">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  value={data.password}
                  onChange={handleInput}
                />
                <span
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                  onClick={handleShowPassword}
                >
                  {showPassword ? <BiShow /> : <BiHide />}
                </span>
              </div>
            </div>
            <div className="mt-6">
              <label htmlFor="confirmpassword" className="block text-sm font-medium leading-5 text-gray-700">
                Confirm Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmpassword"
                  name="confirmpassword"
                  autoComplete="new-password"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  value={data.confirmpassword}
                  onChange={handleInput}
                />
                <span
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                  onClick={handleShowConfirmPassword}
                >
                  {showConfirmPassword ? <BiShow /> : <BiHide />}
                </span>
              </div>
            </div>
            {<div className="mt-6 text-red-600 text-sm"></div>}
            <div className="mt-6">
              <span className="block w-full rounded-md shadow-sm">
              <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#62a403] hover:bg-[#7db430] focus:outline-none focus:border-[#62a403] focus:shadow-outline-indigo active:bg-[#62a403] transition duration-150 ease-in-out"
                  >
                    {loading ? 'Loading...' : 'Register'}
                  </button>
              </span>
            </div>
            <div className="mt-6">
              <span className="">
              <h2>Already have an account ? <a className=" text-[#62a403]" href="/login">Login</a></h2>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Register
