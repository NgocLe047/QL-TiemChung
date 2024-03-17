import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import tiemchung3 from "../../img/tiemchung3.jpeg";
import Logo from "../../img/logo.png";
import { registerKhachHang } from "serviceAPI/userService";

const Register = () => {
  const [username, setUsername] = useState("");
  const [tenKhachHang, setTenKhachHang] = useState("");
  const [password, setPassword] = useState("");
  const [sdt, setSdt] = useState("");
  const [cmnd, setCmnd] = useState("");

  const handleRegister = async () => {
    try {
      const response = await registerKhachHang(username, tenKhachHang, password, sdt, cmnd);
      // Kiểm tra response và xử lý tương ứng
      if (response.data.success) {
        toast.success("Đăng ký tài khoản thành công");
        // Tiến hành xử lý sau khi đăng ký thành công (ví dụ: chuyển hướng trang)
      } else {
        toast.success("Đăng ký tài khoản thành công");

      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <section className="h-100 gradient-form" style={{ backgroundColor: '#eee' }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">
                      <div className="text-center"> 
                        <h4 className=" mt-1 mb-5 pb-1">Đăng Ký Tài Khoản</h4>
                      </div>
                      <form>
                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="form2Example11">Username</label>
                          <input
                            type="email"
                            id="form2Example11"
                            className="form-control"
                            placeholder="Số Điện Thoại Hoặc Email"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                          />
                        </div>
                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="form2Example22">Tên Khách Hàng</label>
                          <input
                            type="tenkhachhang"
                            id="form2Example22"
                            className="form-control"
                            value={tenKhachHang}
                            onChange={(e) => setTenKhachHang(e.target.value)}
                          />
                        </div>
                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="form2Example22">Password</label>
                          <input
                            type="password"
                            id="form2Example22"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="form2Example22">Số Điện Thoại</label>
                          <input
                            type="sdt"
                            id="form2Example22"
                            className="form-control"
                            value={sdt}
                            onChange={(e) => setSdt(e.target.value)}
                          />
                        </div>
                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="form2Example22">Chứng Minh Nhân Dân</label>
                          <input
                            type="cmnd"
                            id="form2Example22"
                            className="form-control"
                            value={cmnd}
                            onChange={(e) => setCmnd(e.target.value)}
                          />
                        </div>
                        <div className="text-center pt-1 mb-5 pb-1">
                          <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="button" onClick={handleRegister}>Đăng Ký</button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                      <h5 ><img class="anhtiemchung3" src={Logo} width={150}  alt="anhtiemchung3" /></h5> 
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

export default Register;



