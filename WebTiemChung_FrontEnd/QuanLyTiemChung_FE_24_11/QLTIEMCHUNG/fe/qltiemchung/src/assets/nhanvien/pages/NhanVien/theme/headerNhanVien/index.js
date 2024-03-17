// Header.jsx
import { memo, useState } from "react";
import { AiOutlineFacebook, AiOutlineGlobal, AiOutlineInstagram, AiOutlineLinkedin, AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { useLocation,Link, Route } from "react-router-dom";
import { ROUTERS,NHANVIENROUTER } from "utils/router";
import logo from "../../../img/logo.png";
import { logoutAPI } from "serviceAPI/userService";
import { toast } from "react-toastify";
import {  NavLink, useNavigate } from "react-router-dom";
import jwtDecode from 'jwt-decode';


// import Login from "../../../public/Login";
// import Register from "../../../public/Register";

import "./style.scss";

const HeaderNhanVien = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("data");
  let unique_name = "unique_name";

  if (token) {
    const decodedToken = jwtDecode(token);
    unique_name = decodedToken.unique_name;
  }
  const handleLogout = async () => {
    try {
      await logoutAPI();
      localStorage.removeItem("data");
      localStorage.removeItem("role");
      localStorage.removeItem("token");
      localStorage.removeItem("unique_name");
      navigate(ROUTERS.PUBLIC.HOME, { replace: true });
      window.location.reload();
      toast.success("Đăng Xuất Thành Công");
    } catch (error) {
      console.error("Đăng xuất thất bại:", error);
      toast.error("Đăng xuất không thành công");
    }
  };
  const [menus, setMenus] = useState([
    {
      name: "Trang Chủ",
      path: "",
    },
    {
      name: "Thăm Khám",
      path:NHANVIENROUTER.NHANVIEN.TTTHAMKHAM,
    },  
    {
      name: "Tin Tức",
      path: "",
    },
  ]);

  return (
    <>
      <div className="header_top">
        <div className="container">
          <div className="row">
            <div className="col-9 header_top_left">
              <ul>
                <li>
                  <AiOutlineMail />
                  quanlytiemchung@gmail.com
                </li>
                <li>
                  <Link to="">Tìm Trung Tâm</Link>
                </li>
            
                <li>
                  <Link to="">HotLine : 0929381*********</Link>
                </li>
              </ul>
            </div>
            <div className="col-3 header_top_right">
              <ul>
                <li>
                  <Link to="">
                    <AiOutlineFacebook />
                  </Link>
                </li>
                <li>
                  <Link to="">
                    <AiOutlineInstagram />
                  </Link>
                </li>
                <li>
                  <Link to="">
                    <AiOutlineLinkedin />
                  </Link>
                </li>
                <li>
                  <Link to="">
                    <AiOutlineGlobal />
                  </Link>
                </li>
                {unique_name ? (
                    <li>{unique_name}</li>
                  ) : (
                    <li>
                      <Link to="Login">
                      <span>Đăng Nhập</span>
                      </Link>
                    </li>
                  )}
                  {unique_name && (
                    <li>
                      <Link to="/doimatkhau">
                        <span>Đổi Mật khẩu</span>
                      </Link>
                    </li>
                  )}
                <li>
                <span className="logout-button" onClick={handleLogout}>
                  Đăng Xuất
                </span>
              </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="header-top1">
        <div className="container">
          <div className="row">
            <div className="col-xl-2">
              <div className="header_tieude">
                <img src={logo} width={150} alt="Logo" />
              </div>
            </div>
            <div className="col-xl-10 ">
              <nav className="header_menu">
                <ul>
                  {menus?.map((menu, menukey) => (
                    <li key={menukey} className={menukey === 0 ? "active" : ""}>
                      <Link to={menu?.path}>{menu?.name}</Link>
                      {menu.child && (
                        <ul className="header_menu_dropdown">
                          {menu.child.map((childItem, childKey) => (
                            <li key={`${menukey}-${childKey}`}>
                              <Link to={childItem.path}>{childItem.name}</Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
     
    </>
  );
};

export default memo(HeaderNhanVien);