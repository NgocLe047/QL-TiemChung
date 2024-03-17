import { memo, useEffect, useState } from "react";
import axios from "axios";
import { Button, Table } from "react-bootstrap";
import { getALLLoaiVaccine ,themloaivaccine ,xoaLoaiVaccine } from "serviceAPI/userService";
import "./style.scss";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ModalThemLoaiVaccine from "./ModalThemLoaiVaccine";

const LoaiVaccine = () => {
  
  const [listVaccinet ,setListVaccine] = useState([])
  
  const [isShowModalAddLoaiVaccine , setisShowModalAddLoaiVaccine] =useState(false);


  const handleClose = () => {
    setisShowModalAddLoaiVaccine(false);
  }

 
  useEffect(() => {
    getVaccine();
  },[])

  const getVaccine = async () => {
    let res = await getALLLoaiVaccine();
    if(res) {
      setListVaccine(res);
    }
  }
  
  return (   
  <>
      <div className="container">
      <h2>DANH SÁCH LOẠI VACCINE</h2>
     <Table striped bordered hover>
      <thead>
        <tr>
        <th className="styles.idColumn" >ID</th>
        <th>Tên Loại</th>
          
        </tr>
      </thead>
      <tbody>
      {listVaccinet.map((list, index) => (
        <tr key={index}>
          <td>{list.id}</td>
          <td>{list.tenLoai}</td>
         
        </tr>
      ))}
      </tbody>
    </Table>
      <div className="my-3 themloaivaccine">
        <button className="btn btn-success"onClick={()=>setisShowModalAddLoaiVaccine(true)}>Thêm Loại Vaccine</button>
      </div>
      
      <ModalThemLoaiVaccine
        show = {isShowModalAddLoaiVaccine}
        handleClose={handleClose}
      />
     
  

</div>
  </>
  )
};

export default memo(LoaiVaccine);