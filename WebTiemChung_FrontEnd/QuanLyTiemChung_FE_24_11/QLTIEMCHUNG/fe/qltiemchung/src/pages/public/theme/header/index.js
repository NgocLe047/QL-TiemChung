// Header.jsx
import { memo, useState } from "react";
import { AiOutlineFacebook, AiOutlineGlobal, AiOutlineInstagram, AiOutlineLinkedin, AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { Link, NavLink, Route, useNavigate } from "react-router-dom";
import { ROUTERS } from "utils/router";
import logo from "../../../img/logo.png";
import Login from "../../../public/Login";
import Register from "../../../public/Register";
import { useLocation } from "react-router-dom";
import "./style.scss";
import { toast } from "react-toastify";
import { logoutAPI } from "serviceAPI/userService";
import doimatkhau from "assets/users/pages/Users/doimatkhau";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const username = location?.state?.username;
  const handleLogout = async () => {
    try {
      await logoutAPI();
      localStorage.removeItem("data");
      navigate("/", { replace: true });
      toast.success("Đăng Xuất Thành Công");
    } catch (error) {
      console.error("Đăng xuất thất bại:", error);
      toast.error("Đăng xuất không thành công");
    }
  };
  const [menus, setMenus] = useState([
    {
      name: "Trang Chủ",
      path: ROUTERS.PUBLIC.HOME,
    },
    {
      name: "Giới Thiệu",
      path: ROUTERS.PUBLIC.PROFILE,
    },
    {
      name: "Gói Tiêm",
      path: "",
      isShowSubmenu: false,
      child: [
        {
          name: "Gói Vaccine cho trẻ em",
          path: "",
        },
        {
          name: "Những điều cần biết trước khi tiêm",
          path: "",
        },
      
      ],
    },
    {
      name: "Đăng Ký Tiêm",
      path: ROUTERS.PUBLIC.HOME,
    },
    {
      name: "Tin Tức",
      path: ROUTERS.PUBLIC.HOME,
    },
  ]);

  return (
    <>
      <div className="header_top">
        <div className="container">
          <div className="row">
            <div className="col-8 header_top_left">
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
            <div className="col-4 header_top_right">
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
                  {username ? (
                    <li>{username}</li>
                  ) : (
                    <li>
                      <Link to="Login">
                      <span>Đăng Nhập</span>
                      </Link>
                    </li>
                  )}

                  {username && (
                    <li>
                      <Link to="/doimatkhau">
                        <span>Đổi Mật khẩu</span>
                      </Link>
                    </li>
                  )}
              
              <li>
                {/* <span className="logout-button" onClick={handleLogout}>
                  Đăng Xuất
                </span> */}
              </li>
                <li>
                  <Link to="/Register">
                  <span>Đăng Ký</span>

                  </Link>
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

export default memo(Header);