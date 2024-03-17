import axios from "./axios";


//Đăng Xuất
const logoutAPI = () => {
    return axios.post("api/Authentication/logout");
  };

//Đăng Ký
const registerKhachHang = (id,tenKhachHang,passWord,sdt,cmnd) => {
  return axios.post("/api/KhachHang/create-khach-hang",{id,tenKhachHang,passWord,sdt,cmnd});
}

//Đổi Mật Khẩu
const changePassword = (currentPassword,newPassword,confirmNewPassword) => {
  return axios.post("/api/Authentication/change-password",{currentPassword,newPassword,confirmNewPassword});
}

//Đăng Nhập
const loginAPI = (username,password) => {
  return axios.post("/api/Authentication/login", {username,password});
}



//Thêm Vaccine
const themVaccine = (id,tenVaccine,nhaSanXuat,soLuongTon,ngaySX,ngayHetHan,maLoaiVaccine,giaTien) => {
  return axios.post ("/api/Vaccine/create-vaccine", {id,tenVaccine,nhaSanXuat,soLuongTon,ngaySX,ngayHetHan,maLoaiVaccine,giaTien})
}

//Lấy Tất cả Loai Vaccine 
const getALLLoaiVaccine = () => {
  return axios.get("/api/LoaiVaccine/get-all-loai-vaccine");
}

//Xoa Loại Vaccine
const xoaLoaiVaccine = () => {
  return axios.delete("/api/LoaiVaccine/delete-loai-vaccine");
}

//Thêm Loại Vacci 
const themloaivaccine = (id,tenLoai) => {
  return axios.post("/api/LoaiVaccine/create-loai-vaccine", {id,tenLoai});
}

//Lấy Tất cả  Vaccine 

const getAllVaccine = () =>
{
  return axios.get("/api/Vaccine/get-all-vaccine");
}

//Nhà Cung Cấp
const getALLnhaCungCap = () => {
  return axios.get("/api/NhaCungCap/get-all-nha-cung-cap");
}

//Phiếu Xuất
const XUATVaccine = (id,ngayTao) => {
  return axios.post("/api/XuatVaccine/create-xuat-vaccine", {id,ngayTao });
}
const getALLXuatVaccine = () => {
  return axios.get("/api/XuatVaccine/get-all-xuat-vaccine");
}

//Chi Tiết Phiếu Xuất

const CTXuatVaccine = (NgayTao,SoLuong,MaVaccine,MaXuatVaccine) => {
  return axios.post("/api/CTXuatVaccine/create-ct-xuat-vaccine",{NgayTao,SoLuong,MaVaccine,MaXuatVaccine});
}

const getChiTietPhieuXuat = () => {
  return axios.get("/api/CTXuatVaccine/get-all-ct-xuat-vaccine");
}

//THỐNG KÊ THEO PHIẾU NHẬP

const thongkephieunhap = () => {
  return axios.get("/api/CTNhapVaccine/get-ct-nhap-vaccine-report");
}

// Phiếu nhập
const NHAPVaccine = (id,ngayTao,maNhaCungCap) => {
  return axios.post("/api/NhapVaccine/create-nhap-vaccine", {id,ngayTao,maNhaCungCap});
}

const getALLNhapVaccine = () => {
  return axios.get("/api/NhapVaccine/get-all-nhap-vaccine");
}


//Chi tiết phiếu nhập
const getChiTietPhieuNhap = () =>{
  return axios.get("/api/CTNhapVaccine/get-all-ct-nhap-vaccine")
}

  const CTNhapVaccine = (ngayTao,soLuong,maVaccine,maNhapVaccine)=>
  {
    return axios.post("/api/CTNhapVaccine/create-ct-nhap-vaccine",{ngayTao,soLuong,maVaccine,maNhapVaccine});
  }

//Loại tiêm chủng
const getLoaiTCById =(idLoaiTC) =>{
  return axios.get("/api/LoaiTiemChung/get-loai-tiem-chung-by-id",{idLoaiTC});
}

//Gói tiêm theo mã loại
const getALLGoiTiemChungByIdLoaiTC = (maLoaiTiemChung) => {
  return axios.get("/api/GoiTiemChung/get-all-ma-loai-tiem-chung-by-id", {
    params: { id: maLoaiTiemChung }
  });
};

//Lấy list Vaccine theo ID
const getALLVaccineById = (id) => {
  return axios.get("/api/Vaccine/get-vaccine-by-id",{
    params: { id: id }
  });
};

//Gói tiêm chủng
const createGoiTiemChung = (id,moTa,giamGia,maLoaiTiemChung)=>{
  return axios.post("/api/GoiTiemChung/create-goi-tiem-chung",{id,moTa,giamGia,maLoaiTiemChung});
}

//Chi tiết gói tiêm chủng
const createCTGoiTiemChung = (maGoiTiemChung,maVaccine,soLuong) =>{
  return axios.post("/api/CTGoiTiemChung/create-ct-goi-tiem-chung",{maGoiTiemChung,maVaccine,soLuong});
}

//Lấy danh sách chi tiết Goi Tiem Chung theo mã gói tiêm 
const getALLCTGoiTiemChungByMaGoiTiem = (keyId) => {
  return axios.get("/api/CTGoiTiemChung/get-chi-tiet-tiem-chung-by-ma-goi-tiem", {
    params: { keyId: keyId }
  });
};
//Lấy Thông Tin Gói Tiêm Chủng
const getALLGoiTiemChung = () => {
  return axios.get("/api/GoiTiemChung/get-all-goi-tiem-chung");
}
//Tạo thông tin tiêm chủng của khách hàng
const createThongTinTiemChungKhachHang = (ngayDangKy,lanTiem,diaDiemTiem,trangThai,maGoiTiemChung) =>{
  return axios.post("/api/ThongTinTiemChung/create-thong-tin-tiem-chung-khach-hang",{ngayDangKy,lanTiem,diaDiemTiem,trangThai,maGoiTiemChung});
}

const createThongTinTiemChungHoGiaDinh =(ngayDangKy,lanTiem,diaDiemTiem,trangThai,cmnd,tenNguoiDK,maGoiTiemChung,maHoGiaDinh) =>{
  return axios.post("/api/ThongTinTiemChung/create-thong-tin-tiem-chung-gia-dinh",{ngayDangKy,lanTiem,diaDiemTiem,trangThai,cmnd,tenNguoiDK,maGoiTiemChung,maHoGiaDinh});
}

const createHoGiaDinh =(id,tenChuHo) =>{
return axios.post("/api/HoGiaDinh/create-ho-gia-dinh",{id,tenChuHo});
}

//Lay Thong Tin Tiem Chung Khach Hang
const getTTthamKham  = () => {
  return axios.get("/api/ThongTinTiemChung/get-all-thong-tin-tiem-chung");
}

// GET ALL THONG TIN THAM KHAM CUA KHACH HANG
const getTTthamKhamByKhachHang = () => {
  return axios.get(`/api/ThongTinTiemChung/get-all-thong-tin-tiem-chung-khach-hang`);
}
// GET ALL HO GIA DINH
const getTTHoGiaDinh = () => {
  return axios.get(`/api/ThongTinTiemChung/get-all-thong-tin-tiem-chung-gia-dinh`);

}
// GET ALL THONG TIN TIEM CHUNG
const getALLTHONGTINTIEMCHUNG = () => {
  return axios.get(`/api/ThongTinTiemChung/get-all-thong-tin-tiem-chung`);
}

//Lấy thông tin tiêm chủng hộ gia đình
const getThongTinTiemChungGiaDinh = (maHoGiaDinh) =>{
  return axios.get("/api/ThongTinTiemChung/get-all-thong-tin-tiem-chung-gia-dinh",{
    params: { maHoGiaDinh: maHoGiaDinh }
  })
}
export {loginAPI,logoutAPI,changePassword,registerKhachHang,getALLTHONGTINTIEMCHUNG,
  getALLNhapVaccine,CTXuatVaccine,thongkephieunhap,themVaccine,getTTHoGiaDinh,getThongTinTiemChungGiaDinh,
  getChiTietPhieuNhap,XUATVaccine,getALLXuatVaccine,getTTthamKhamByKhachHang,
  getChiTietPhieuXuat,themloaivaccine, getALLLoaiVaccine,xoaLoaiVaccine,
  getALLVaccineById,getALLnhaCungCap,NHAPVaccine,getAllVaccine,CTNhapVaccine,
  getLoaiTCById, getALLGoiTiemChungByIdLoaiTC,createGoiTiemChung,createCTGoiTiemChung,
  getALLCTGoiTiemChungByMaGoiTiem,getALLGoiTiemChung,createThongTinTiemChungKhachHang,createThongTinTiemChungHoGiaDinh,
  createHoGiaDinh,getTTthamKham};