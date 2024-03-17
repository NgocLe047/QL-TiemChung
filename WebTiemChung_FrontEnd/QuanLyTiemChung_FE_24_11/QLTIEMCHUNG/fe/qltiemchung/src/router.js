import Login from "pages/public/Login";
import HomePage from "./pages/public/homePage";
import Profile from "./pages/public/profile";
import MasterLayout from "./pages/public/theme/masterLayout";
import MasterLayoutUsers from "assets/users/pages/Users/theme/masterLayoutUser"
import { ADMINROUTER, NHANVIENROUTER, ROUTERS,USERSROUTER } from "./utils/router";
import { Routes, Route } from "react-router-dom";
import Register from "pages/public/Register";
import KhachHang from "assets/users/pages/Users/khachhang";
import DoiMatKhau from "assets/users/pages/Users/doimatkhau";
import DangKyTiem from "assets/users/pages/Users/dangkytiem";
import HOMEPageUsers from "assets/users/pages/Users/homePageUsers";
import HomePageNhanVien from "assets/nhanvien/pages/NhanVien/homePageNhanVien";
import NhanVien from "assets/nhanvien/pages/NhanVien/nhanvien";
import MasterLayoutNhanVien from "assets/nhanvien/pages/NhanVien/theme/masterLayoutNhanVien";
import MasterLayoutAdmin from "assets/admin/pagesAdmin/pages/Admin/theme/masterLayoutAdmin";
import HomePageAdmin from "assets/admin/pagesAdmin/pages/Admin/homePageAdmin";
import Admin from "assets/admin/pagesAdmin/pages/Admin/Admin";
import LoaiVaccine from "assets/admin/pagesAdmin/pages/Admin/LoaiVaccine";
import NhapVaccine from "assets/admin/pagesAdmin/pages/Admin/NhapVaccine";
import XuatVaccine from "assets/admin/pagesAdmin/pages/Admin/XuatVaccine";
import Vaccine from "assets/admin/pagesAdmin/pages/Admin/Vaccine";
import QLCombo from "assets/admin/pagesAdmin/pages/Admin/QLCombo";
import TTThamKham from "assets/nhanvien/pages/NhanVien/TTThamKham";
import DangKyHoGiaDinh from "assets/users/pages/Users/dangkyhogiadinh";
import XemLichKham from "assets/users/pages/Users/xemlichkham";
const renderPublicRouter = () => {
    const PublicRouters = [
        {
            path:ROUTERS.PUBLIC.HOME,
            component:<HomePage/>
        },
        {
            path:ROUTERS.PUBLIC.PROFILE,
            component:<Profile/>
        },
        {
            path:ROUTERS.PUBLIC.LOGIN,
            component:<Login/>
        },
        {
            path:ROUTERS.PUBLIC.REGISTER,
            component:<Register/>
        }
    ]
    return (
        <MasterLayout>
            <Routes>
                {
                    PublicRouters.map((item,key)=>(
                        <Route 
                        key={key}path={item.path}element={item.component}/>
                    )
                    )
                        
                }
            </Routes>
        </MasterLayout>    
    );
};

//ADMIN
const renderAdminRouter = () => {
    const AdminRouters = [
        {
            path:ADMINROUTER.ADMIN.HOME,
            component:<HomePageAdmin/>
        },
        {
            path:ADMINROUTER.ADMIN.ADMIN,
            component:<Admin/>
        },
        {
            path:ADMINROUTER.ADMIN.LOAIVACCINE,
            component:<LoaiVaccine/>
        },
        {
            path:ADMINROUTER.ADMIN.NHAPVACCINE,
            component:<NhapVaccine/>
        },
        {
            path:ADMINROUTER.ADMIN.XUATVACCINE,
            component:<XuatVaccine/>
        },
        {
            path:ADMINROUTER.ADMIN.VACCINE,
            component:<Vaccine/>
        },
        {
            path:ADMINROUTER.ADMIN.QLCOMBO,
            component:<QLCombo/>
        }
    ]
    return (
        <MasterLayoutAdmin>
            <Routes>
                {
                    AdminRouters.map((item,key)=>(
                        <Route 
                        key={key}path={item.path}element={item.component}/>
                    )
                    )
                        
                }
            </Routes>
        </MasterLayoutAdmin>    
    );
}


//NHANVIEN
const renderNhanVienRouter = () => {
    const NhanVienRouters = [
        {
            path:NHANVIENROUTER.NHANVIEN.HOME,
            component:<HomePageNhanVien/>
        },
        {
            path:NHANVIENROUTER.NHANVIEN.NHANVIEN,
            component:<NhanVien/>
        },
        {
            path:NHANVIENROUTER.NHANVIEN.TTTHAMKHAM,
            component:<TTThamKham/>
        }
    ]
    return (
        <MasterLayoutNhanVien>
            <Routes>
                {
                    NhanVienRouters.map((item,key)=>(
                        <Route 
                        key={key}path={item.path}element={item.component}/>
                    )
                    )
                        
                }
            </Routes>
        </MasterLayoutNhanVien>    
    );
}

//KHÁCH Hàng
const renderUserRouter = () => {
    const UsersRouters = [
        {
            path:USERSROUTER.USERS.HOME,
            component:<HOMEPageUsers/>
        },
        {
            path:USERSROUTER.USERS.KHACHHANG,
            component:<KhachHang/>
        },
        {
            path:USERSROUTER.USERS.DOIMATKHAU,
            component:<DoiMatKhau/>
        },
        {
            path:USERSROUTER.USERS.DANGKYTIEM,
            component:<DangKyTiem/>
        },
        {
            path:USERSROUTER.USERS.DANGKYHOGIADINH,
            component:<DangKyHoGiaDinh/>
        },
        {
            path:USERSROUTER.USERS.XEMLICHKHAM,
            component:<XemLichKham/>
        }
    ]
    return (
        <MasterLayoutUsers>
            <Routes>
                {
                    UsersRouters.map((item,key)=>(
                        <Route 
                        key={key}path={item.path}element={item.component}/>
                    )
                    )
                        
                }
            </Routes>
        </MasterLayoutUsers>    
    );
}
const determineRoute = () => {
    const role = localStorage.getItem("role");
    
    if (role === "KhachHang") {
      return renderUserRouter();
    } else if (role === "NhanVien") {
      return renderNhanVienRouter();
    }else if (role === "QuanLy") {
        return renderAdminRouter();
    }else {
        return renderPublicRouter();
    }
  };

  const RouterCustom = () => {
    const role = localStorage.getItem("role");
    const isLoggedIn = localStorage.getItem("data") !== null;

    console.log("Role:", role);
    console.log("IsLoggedIn:", isLoggedIn);

    return isLoggedIn ? determineRoute() : renderPublicRouter();
};
  
export default RouterCustom;