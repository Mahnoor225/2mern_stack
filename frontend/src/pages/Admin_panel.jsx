import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import { useEffect } from "react";
import Role from "../Common/Role";

const Admin_panel = () => {
  const user = useSelector(state => state?.user?.user);
  // console.log("User Object from Redux:", user);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (user?.role !== Role.ADMIN) {
  //     navigate("/");
  //   }
  // }, [user, navigate]);

  useEffect(() => {
    // Assuming `user?.role` matches with `Role.ADMIN`
    if (user?.role !== Role.ADMIN) {
      navigate('/admin-panel');
    }
  }, [user, navigate]);
  // Check if user is available
  if (!user) {
    return <p>Loading...</p>; // Or redirect to a login page
  }

  return (
    <div>
      <div className='min-h-[calc(100vh-120px)] md:flex hidden'>
        <aside className=' min-h-full w-full max-w-60 customShadow  bg-white shadow-md'>
          <div className='h-32 flex justify-center items-center flex-col'>
            <div className={`relative text-[23px]  top-1 sm:block hidden pt-7`}>
              {user?.profilepic ? (
                <img src={user?.profilepic} alt={user.name} className="w-16 h-16 rounded-full" />
              ) : (
                <MdAccountCircle className="text-[30px]" />
              )}
            </div>
            <p className='capitalize text-lg font-semibold pt-4'>{user?.name}</p>
            <p className='text-sm '>{user?.isAdmin ? 'Admin' : 'Admin'}</p>
          </div>

          <div>
            <nav className='grid p-4 pt-12'>
              <Link to={"/allusers"} className='px-2 py-1 hover:bg-slate-100 bg-[#62a403]'>All Users</Link>
              <Link to={"/allproducts"} className='px-2 py-1 hover:bg-slate-100'>All Products</Link>
              {/* {user?.isAdmin && (
                <Link to="/admin/settings" className='px-2 py-1 hover:bg-slate-100'>Admin Settings</Link>
              )} */}
            </nav>
          </div>
        </aside>
        <main className='w-full h-full p-2'>
          <Outlet/>
        </main>
      </div>
    </div>
  );
}

export default Admin_panel;
