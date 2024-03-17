import { memo, useEffect } from "react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "./style.scss";
import { Button, Table } from "react-bootstrap";
import { getTTthamKhamByKhachHang } from "serviceAPI/userService";

const XemLichKham = () =>
 {

   const [listTTthamKhamByKhachHang ,setlistTTthamKhamByKhachHang] = useState([])


  useEffect(() => {
    gethamkhakhachhang();
  },[])

  const gethamkhakhachhang = async () => {
    try {
      let res = await getTTthamKhamByKhachHang();
      if (res) {
        setlistTTthamKhamByKhachHang(res);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
      // Handle the error gracefully, e.g., display an error message to the user
    }
  };

  return (   
    <>
        <div className="container">
        <h2>Lịch Tiêm</h2>
       <Table striped bordered hover>
        <thead>
          <tr>
          <th>Họ Tên</th>
          <th>Ngày Đăng Ký</th>
          <th>Ngày Tiêm</th>
          <th>Lần Tiêm</th>
          <th>Giờ Tiêm</th>
          <th>Địa Điểm Tiêm</th>            
          </tr>
        </thead>
        <tbody>
        {listTTthamKhamByKhachHang.map((list, index) => (
          <tr key={index}>
              <td>{list.tenNguoiDK}</td>
             <td>{list.ngayDangKy}</td>
             <td>{list.ngayTiem}</td>
             <td>{list.lanTiem}</td>
             <td>{list.gioTiem}</td>
             <td>{list.diaDiemTiem}</td>

          </tr>
        ))}
        </tbody>
      </Table>
      
        
     
       
    
  
  </div>
    </>
    )
};

export default XemLichKham;