import { memo, useEffect, useState } from "react";
import tiemchung3 from "../../img/tiemchung3.jpeg";
import Logo from "../../img/logo.png";
import "./style.scss";
import { loginAPI } from "../../../serviceAPI/userService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { USERSROUTER, ROUTERS, NHANVIENROUTER, ADMINROUTER } from "utils/router";
import RouterCustom from "router";
import jwtDecode from 'jwt-decode';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!username || !password) {
      toast.error("Lỗi");
      return;
    }

    try {
      const res = await loginAPI(username, password);
      console.log(">>> Kiểm tra", res);

      if (res && res.data) {

         localStorage.setItem('data', JSON.stringify(res.data));
        // const role = res.role;
        // const usname = res.username;
        // localStorage.setItem("role", role);
        // localStorage.setItem("username", usname);
        const token = res.data;
        const decodedToken = jwtDecode(token);
  
        // const usname = decodedToken.username;
        const unique_name = decodedToken.unique_name
        const role = decodedToken.role;

        // Lưu role và username vào localStorage
        localStorage.setItem("unique_name", unique_name);
        localStorage.setItem("role", role);
  
        toast.success(`Đăng nhập thành công. Xin chào ${role}`);
    

        // Chuyển hướng tùy thuộc vào vai trò
        if (role === "KhachHang") {
          navigate(USERSROUTER.USERS.HOME);
        } else if (role === "NhanVien") {
          navigate(NHANVIENROUTER.NHANVIEN.HOME);
        } else if (role === "QuanLy") {
          navigate(ADMINROUTER.ADMIN.HOME);
        } else {
          navigate("/");
          toast.success("Fail chuyển user!");
        }

        window.location.reload();
        return RouterCustom();
      } else {
        toast.error("Lỗi đăng nhập");
      }
    } catch (error) {
      console.error("Lỗi đăng nhập", error);
      toast.error("Lỗi đăng nhập");
    }
  };

  return (
    <>
    
      <section className="h-100 gradient-form" style={{ backgroundColor: '#eee' }}>
                              <h4>Chào Mừng Bạn Đã Đến Đăng Ký Tiêm Chủng</h4>

        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">
                      <form>

                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="form2Example11">Username</label>
                          <input
                            type="email"
                            id="form2Example11"
                            className="form-control"
                            placeholder="Số Điện Thoại Hoặc Email"
                            value={username}
                            onChange={(event) => setUsername(event.target.value)}
                          />
                        </div>

                        <div className="form-outlinee mb-4">
                          <label className="form-label" htmlFor="form2Example22">Password</label>
                          <input
                            type="password"
                            id="form2Example22"
                            className="form-control"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                          />
                        </div>

                        <div className="text-center pt-1 mb-5 pb-1">
                          <button
                            className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                            type="button"
                            onClick={handleLogin}
                          >
                            Login
                          </button>
                          <a className="text-muted" href="#!">Quên Mật Khẩu?</a>
                        </div>

                        <div className="d-flex align-items-center justify-content-center pb-4">
                          <p className="mb-0 me-2">Không Có Tài Khoản?</p>
                          <button type="button" className="btn btn-outline-danger">Đăng Ký Tài Khoản</button>
                        </div>

                      </form>

                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                      <h5><img className="anhtiemchung3" src={Logo} width={150} alt="anhtiemchung3" /></h5>
                      <h3 className="mb-4">Tiêm Chủng</h3>
                      <p className="small mb-0">Tiêm chủng là một quá trình y tế quan trọng và hiệu quả để bảo vệ cơ thể khỏi các bệnh truyền nhiễm. Nó là một phương pháp tiêm một liều vắc-xin vào cơ thể để kích thích hệ miễn dịch tạo ra sự kháng thể chống lại các tác nhân gây bệnh như vi khuẩn, virus, hoặc tác nhân gây bệnh khác.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>
    </>
  );
};

export default memo(Login);