import { memo, useEffect, useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import "../../bootstrap/css/bootstrap.min.css";
import { getAllVaccine } from "serviceAPI/userService";
import ModalAddVaccine from "./ModalThemVaccine";
const Vaccine = () => {
    const [listVaccinet ,setListVaccine] = useState([])
    const [isShowModalVaccine , setisShowModalVaccine] =useState(false);

            useEffect(() => {
                GETVACCINE();
                
            },[])

            
  const handleClose = () => {
    setisShowModalVaccine(false);
  }

  const GETVACCINE = async () => {
    let res = await getAllVaccine();
    if(res) {
      setListVaccine(res);
    }
  }


  return (   
  <>
      <div className="container">
  <table className="tablespalce">
    <thead>
      <tr>
        
      </tr>
    </thead>
    <tbody>
     
    </tbody>
  </table>
  <Table striped bordered hover>
      <thead>
        <tr>
        <th className="styles.idColumn" >ID</th>
        <th>Tên Vaccine</th>
        <th>Nhà Sản Xuất</th>
        <th>Số Lượng Tồn</th>
        <th>Ngày Sản Xuất</th>
        <th>Ngày Hết Hạn</th>
        <th>Giá Tiền</th>

        </tr>
      </thead>
      <tbody>
      {listVaccinet.map((list, index) => (
        <tr key={index}>
          <td>{list.id}</td>
          <td>{list.tenVaccine}</td>
          <td>{list.nhaSanXuat}</td>
          <td>{list.soLuongTon}</td>
          <td>{list.ngaySX}</td>
          <td>{list.ngayHetHan}</td>
          <td>{list.giaTien}</td>

        </tr>
      ))}
      
      </tbody>
    </Table>
    <div className="my-3 themloaivaccine">
        <button className="btn btn-success"onClick={()=>setisShowModalVaccine(true)}>Thêm  Vaccine</button>
      </div>
        <ModalAddVaccine
        
        show = {isShowModalVaccine}
        handleClose={handleClose}
        />
</div>
  </>
  )
};
export default memo(Vaccine);