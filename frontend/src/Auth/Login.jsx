import { useState, useContext } from "react";
import { BiShow, BiHide } from "react-icons/bi";
import loginSignupImage from "../../public/images/login-animation.gif"; // Ensure this path is correct
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the CSS for toast notifications
import Context from "../Context";
import { useForm } from "react-hook-form";

const Login = () => {
  // States for showing/hiding passwords
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Function to handle password visibility toggle
  const handleShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(prev => !prev);
  };

  // State for image upload
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const imageChange = (e) => {
    const file = e.target.files[0];
    setImagePreview(URL.createObjectURL(file));
    setImage(file);
  };

  const uploadImage = async () => {
    if (!image) return null;
    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'mahnoor');

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dizrz6ejl/image/upload', {
        method: 'POST',
        body: formData,
      });
      const urlData = await response.json();
      return urlData.secure_url;
    } catch (error) {
      console.error('Image upload failed:', error);
      toast.error('Image upload failed');
      throw new Error('Image upload failed');
    }
  };

  const navigate = useNavigate();
  const { fetchUserDetails } = useContext(Context);
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    const { password, confirmpassword } = data;

    if (password !== confirmpassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const imageUrl = image ? await uploadImage() : null;

      const userData = {
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmpassword, // Match server-side field name
        profilePic: imageUrl,
      };

      console.log('Submitting data:', userData);

      const response = await fetch('http://localhost:5000/registeruser/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Login successful');
        navigate('/');
        fetchUserDetails();
      } else {
        setError(result.message || 'Login failed');
        toast.error(result.message || 'Login failed');
      }
    } catch (error) {
      console.error('Catch block error:', error);
      setError(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-10 w-auto"
          src="https://www.svgrepo.com/show/301692/login.svg"
          alt="Workflow"
        />
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="email" className="block mt-5 text-sm font-medium leading-5 text-gray-700">
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  {...register("email", { 
                    required: "Please provide a valid email",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Please enter a valid email address"
                    }
                  })}
                  type="email"
                  autoComplete="email"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
                {errors.email && <span className="text-red-600">{errors.email.message}</span>}
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
                  {...register("password", { 
                    required: "Please provide a password",
                    pattern: {
                      value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                      message: "Password must be at least 8 characters long and include one number, one uppercase letter, and one lowercase letter"
                    }
                  })}
                  autoComplete="current-password"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
                {errors.password && <span className="text-red-600">{errors.password.message}</span>}
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
                  {...register("confirmpassword", { 
                    required: "Confirm password is required",
                    validate: value => value === watch('password') || "Passwords must match",
                    pattern: {
                      value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                      message: "Password must be at least 8 characters long and include one number, one uppercase letter, and one lowercase letter"
                    }
                  })}
                  autoComplete="new-password"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                />
                {errors.confirmpassword && <span className="text-red-600">{errors.confirmpassword.message}</span>}
                <span
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                  onClick={handleShowConfirmPassword}
                >
                  {showConfirmPassword ? <BiShow /> : <BiHide />}
                </span>
              </div>
            </div>
            <div className="text-end">
              <p className="mb-3 mt-2 text-sm text-gray-500">
                <a href="/forgetpassword" className="text-[#62a403] hover:text-black">Forgot Password?</a>
              </p>
            </div>
            {error && <div className="mt-6 text-red-600 text-sm">{error}</div>}
            <div className="mt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#62a403] hover:bg-[#7db430] focus:outline-none focus:border-[#62a403] focus:shadow-outline-indigo active:bg-[#62a403] transition duration-150 ease-in-out"
              >
                {loading ? 'Loading...' : 'Login'}
              </button>
            </div>
            <div className="mt-6">
              <h2>Don't have an account? <a className="text-[#62a403]" href="/register">Register</a></h2>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
