/* eslint-disable react/prop-types */
import { useState } from 'react';
import { toast } from 'react-toastify';
import { IoMdClose } from 'react-icons/io';

const ChangeUserRole = ({
  name = '',
  email = '',
  isAdmin = false, // Indicates if the user is currently an admin
  onClose = () => {},
  userId = '',
  callFunc = () => {},
  roles = { admin: 'Admin', user: 'User' }, // Default roles if none are provided
}) => {
  // Initialize userRole state based on isAdmin prop
  const [userRole, setUserRole] = useState(isAdmin ? 'admin' : 'user');

  // Function to handle changes in the role selection
  const handleOnChangeSelect = (e) => {
    setUserRole(e.target.value);
    console.log('Selected role:', e.target.value);
  };

  // Function to update user role
  const updateUserRole = async () => {
    try {
      console.log('Sending request with:', { userId, role: userRole }); // Debugging
  
      if (!userId) {
        throw new Error('User ID is required');
      }
  
      const fetchResponse = await fetch(`http://localhost:5000/registeruser/updateuser/${userId}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          userId:userId,
          isAdmin: userRole === 'admin'
        }),
      });
  
      if (!fetchResponse.ok) {
        const errorText = await fetchResponse.text();
        throw new Error(`HTTP error! status: ${fetchResponse.status} - ${errorText}`);
      }
  
      const responseData = await fetchResponse.json();
  
      if (responseData.success) {
        toast.success(responseData.message);
        onClose();
        callFunc();
      } else {
        toast.error(responseData.message || 'Role update failed');
      }
  
      console.log('Role updated', responseData);
    } catch (error) {
      toast.error('An error occurred while updating the role');
      console.error('Error updating role:', error);
    }
  };
  
  

  return (
    <div>
      <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-center items-center bg-slate-200 bg-opacity-50'>
        <div className='mx-auto bg-white shadow-md p-4 w-full max-w-sm'>
          <button className='block ml-auto' onClick={onClose}>
            <IoMdClose />
          </button>

          <h1 className='pb-4 text-lg font-medium'>Change User Role</h1>

          <p>Name: {name}</p>
          <p>Email: {email}</p>

          <div className='flex items-center justify-between my-4'>
            <p>Role:</p>
            <select className='border px-4 py-1' value={userRole} onChange={handleOnChangeSelect}>
              {Object.keys(roles).length > 0 ? (
                Object.keys(roles).map((key) => (
                  <option value={key} key={key}>
                    {roles[key]}
                  </option>
                ))
              ) : (
                <>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </>
              )}
            </select>
          </div>

          <button
            className='w-fit mx-auto block py-1 px-3 rounded-full bg-red-600 text-white hover:bg-red-700'
            onClick={updateUserRole}
          >
            Change Role
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeUserRole;
