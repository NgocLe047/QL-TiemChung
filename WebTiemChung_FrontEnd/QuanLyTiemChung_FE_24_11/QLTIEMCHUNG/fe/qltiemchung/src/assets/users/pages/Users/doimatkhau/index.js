import React, { useState } from "react";
import { toast } from "react-toastify";
import "./style.scss";
import {changePassword} from "serviceAPI/userService"
const ChangePassword = () =>
 {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("")
  const handleChangePassword = async () => {
    if ( !currentPassword || !newPassword || !confirmNewPassword) {
      toast.error("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    try {
      const response = await changePassword(currentPassword, newPassword,confirmNewPassword);

      if (response && response.data && response.data.success) {
        toast.success("Mật khẩu đã được thay đổi thành công.");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      } else {
        toast.error("Không thành công khi thay đổi mật khẩu.");
      }
    } catch (error) {
      console.error("Lỗi khi thay đổi mật khẩu:", error);
      toast.error("Lỗi khi thay đổi mật khẩu.");
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
                      <form className="form-password">
                        <h4>Đổi Mật Khẩu</h4>
                        <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example11">Mật Khẩu Hiện Tại</label>
                          <input
                            type="password"
                            className="form-control"

                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                          />
                        </div>

                        <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example22">Mật Khẩu Mới</label>
                          <input
                            type="password"
                            className="form-control"

                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                          />
                        </div>

                        
                        <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="form2Example22">Xác Nhận Mật Khẩu Mới</label>
                          <input
                            type="password"
                            className="form-control"

                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                          />
                        </div>

                
                        <div className="d-flex align-items-center justify-content-center pb-4">
                        <button onClick={handleChangePassword}>Thay đổi Mật Khẩu</button>
                        </div>

                      </form>
                  </div>

 

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

export default ChangePassword;