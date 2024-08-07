import { useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS
import { toast } from 'react-toastify';
import moment from 'moment'; // For date formatting
import { MdModeEdit } from 'react-icons/md'; // For the edit icon
import ChangeUserRole from "../Componets/ChangeuserRole"; // Ensure correct path and case

const AllUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [error, setError] = useState(null);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    name: "",
    email: "",
    userId: "",
    isAdmin: "",
  });
  const [openUpdateRole, setOpenUpdateRole] = useState(false);

  const fetchAllUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/registeruser/allusers', {
        method: 'GET',
        credentials: 'include', // Include cookies if needed
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Network response was not ok');
      }

      const data = await response.json();

      if (data.success) {
        setAllUsers(data.data);
        console.log(data);
      } else if (data.error) {
        toast.error(data.message);
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching users:', err);
      toast.error('Error fetching users: ' + err.message);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="bg-white p-6">
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-[#85b740] text-white">
            <th className="border border-gray-300 p-2">Sr.</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Email</th>
            <th className="border border-gray-300 p-2">Role</th>
            <th className="border border-gray-300 p-2">Created Date</th>
            <th className="border border-gray-300 p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {
            allUsers.map((el, index) => (
              <tr key={el._id} className="even:bg-gray-100 text-center">
                <td className="border border-gray-300 p-2">{index + 1}</td>
                <td className="border border-gray-300 p-2">{el?.name}</td>
                <td className="border border-gray-300 p-2">{el?.email}</td>
                <td className="border border-gray-300 p-2">{el?.isAdmin ? 'Admin' : 'User'}</td>
                <td className="border border-gray-300 p-2">{moment(el?.createdAt).format('LL')}</td>
                <td className="border border-gray-300 p-2">
                  <button 
                    className="bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white"
                    onClick={() => {
                      setUpdateUserDetails(el);
                      setOpenUpdateRole(true);
                    }}
                  >
                    <MdModeEdit />
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  
    { 
      openUpdateRole && (
        <ChangeUserRole
          onClose={() => setOpenUpdateRole(false)} 
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          isAdmin={updateUserDetails.isAdmin}
          userId={updateUserDetails._id}
          callFunc={fetchAllUsers}
        />
      ) 
    }
  </div>
  
  );
};

export default AllUsers;
