import { memo, useEffect, useState } from "react";
import axios from "axios";
import { Button, Table } from "react-bootstrap";
import { getLoaiTCById,getAllVaccine,getALLCTLoaiTCByMaLoaiTCId
  ,createGoiTiemChung,createCTGoiTiemChung,getALLGoiTiemChung,getGoiTiemChungById
 } from "serviceAPI/userService";
import "./style.scss";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Form from 'react-bootstrap/Form';


const GoiTiemChung = () => {
  const [selectedVaccine, setSelectedVaccine] = useState("");
  const [activeList, setActiveList] = useState(null);
  const [loaiTC1Name, setLoaiTC1Name] = useState("");
  const [loaiTC2Name, setLoaiTC2Name] = useState("");
  const [id, setIdGoiTC] = useState("");
  const [moTa, setMoTa] = useState("");
  const [giamGia, setGiamGia] = useState("");
  const [soLuong, setSoLuong] = useState("");
  const [listVaccine, setListVaccine] = useState([]);
  const [listgetALLCTLoaiTCByIdLoaiTC,setlistgetALLCTLTCByIdLoaiTC] = useState([]);
  const[idVaccine, setidVaccine] = useState("");

  useEffect(() => {

    getVaccine();
    getALLCTLoaiTCByIdLoaiTC();
  }, []);
  const getALLCTLoaiTCByIdLoaiTC = async () => {
    try {
        const res = await getALLGoiTiemChung();
        if (res) {
            setlistgetALLCTLTCByIdLoaiTC(res);
        }
    } catch (error) {
        console.log(error);
    }
};
 
  const handleButtonClick = (idLoaiTC) => {
    setActiveList(idLoaiTC);
  };
  const handleSelectVaccine = (event) => {
    setSelectedVaccine(event.target.value);
};
///  

const handleSelectVaccineGoi = (event) => {
  const vaccineId = event.target.value;
  if (selectedVaccine.includes(vaccineId)) {
    setSelectedVaccine(selectedVaccine.filter(id => id !== vaccineId));
  } else {
    setSelectedVaccine([...selectedVaccine, vaccineId]);
  }

};

////
  const getVaccine = async () => {
    try {
        const res = await getAllVaccine();
        if (res) {
          setListVaccine(res);
        }
    } catch (error) {
        console.log(error);
    }
};

const handleCreateGoiTiemChung1 = async () => {
  try {
    const maLoaiTiemChung = "LoaiTC1";

    const res = await createGoiTiemChung(id, moTa, giamGia, maLoaiTiemChung);
    console.log("Kiểm tra", res);
    if (res) {
      setIdGoiTC(id);
      setMoTa(moTa);
      setGiamGia(giamGia);
      setLoaiTC1Name(loaiTC1Name);
      toast.success("Thành Công");
    } else {
      toast.error('Lỗi');
    }
  } catch (error) {
    console.log(error);
  }
};

const handleCreateCTGoiTiemChung = async () => {
  const maVaccine = selectedVaccine;
  try {
      const res = await createCTGoiTiemChung(id,maVaccine,soLuong);
      console.log("Kiểm tra", res);
      if (res) {
          setIdGoiTC(id);        
          setidVaccine({maVaccine});
          setSoLuong(soLuong);
          toast.success("Thành Công");
      } else {
          toast.error('Lỗi');
      }
  } catch (error) {
      console.log(error);
  }
};
const handleCreateGoiTiemChung2 = async () => {
  try {
    const maLoaiTiemChung = "LoaiTC2";

    const res = await createGoiTiemChung(id, moTa, giamGia, maLoaiTiemChung);
    console.log("Kiểm tra", res);
    if (res) {
      setIdGoiTC(id);
      setMoTa(moTa);
      setGiamGia(giamGia);
      setLoaiTC2Name(loaiTC2Name); // Assuming you have a state variable named 'loaiTC2Name'
      toast.success("Thành Công");
    } else {
      toast.error('Lỗi');
    }
  } catch (error) {
    console.log(error);
  }
};
const handleCreateCTGoiTiemChung2 = async () => {
  const maVaccine = selectedVaccine;
  try {
    const promises = maVaccine.map(async (vaccineId) => {
      const res = await createCTGoiTiemChung(id, vaccineId, soLuong);
      return res;
    });

    const results = await Promise.all(promises);

    console.log("Kiểm tra", results);

    if (results.every((result) => result)) {
      setIdGoiTC(id);
      setidVaccine(maVaccine);
      setSoLuong(soLuong);
      toast.success("Thành Công");
    } else {
      toast.error("Lỗi");
    }
  } catch (error) {
    console.log(error);
  }
};
const handleSave2 = async () => {
    try {
        // Gọi hàm handleCreateGoiTiemChung và đợi nó hoàn thành
        await handleCreateGoiTiemChung2();
    
        // Gọi hàm handleCreateCTGoiTiemChung sau khi handleCreateGoiTiemChung hoàn thành
        await handleCreateCTGoiTiemChung2();
      } catch (error) {
        console.error("Error during save:", error);
      }
};

const handleSave1 = async () => {
  try {
    await handleCreateGoiTiemChung1();
    await handleCreateCTGoiTiemChung();
  } catch (error) {
    console.error("Error during save:", error);
  }
};
  return (
    <section className="h-100 gradient-form" style={{ backgroundColor: '#eee' }}>
      <h4>TẠO VACCINE GÓI HOẶC LẺ</h4>
      <div className="container">
            <div className="row"></div>
      </div>
      <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                 
                    <div className="card-body p-md-5 mx-md-4">
                 
                      <form className="taophieunhap">
                        <div className="form-outline mb-4">
    <div>
      <button type="button" className="btn btn-outline-danger mr-5" onClick={() => handleButtonClick("LoaiTC1")}>
        {loaiTC1Name || "Vaccine lẻ"}
      </button>
      <button type="button" className="btn btn-outline-danger  " onClick={() => handleButtonClick("LoaiTC2")}>
        {loaiTC2Name || "Vaccine gói"}
      </button>

      {/* Render text boxes if LoaiTC1 is active */}
      {activeList === "LoaiTC1" && (
        <div class="row">
          <div className="col-lg-6  ">
          <h2>ID gói tiêm chủng</h2>
          <input
            type="text"
            className="form-control"  
            value={id}
            onChange={(e) => setIdGoiTC(e.target.value)}
          />
          <h2>Mô tả</h2>
          <input
            type="text"
            className="form-control"  
            value={moTa}
            onChange={(e) => setMoTa(e.target.value)}
          />
          <h2>Giảm giá</h2>
          <input
            type="text"
            className="form-control"  
            value={giamGia}
            onChange={(e) => setGiamGia(e.target.value)}
          />
          <h2>Vaccine</h2>
          <select
          style={{
            fontSize: '18px', // Cỡ chữ
            padding: '10px', // Khoảng cách nội dung từ mép combobox
            width: '400px' // Độ rộng của combobox
            // Các thuộc tính CSS khác có thể được thêm vào tùy thuộc vào yêu cầu của bạn
          }}
            value={selectedVaccine} onChange={handleSelectVaccine}>
                            <option value=""
                            > Vaccine</option>
                            {listVaccine.map((vc) => (
                                <option key={vc.id} value={vc.id}>{vc.tenVaccine}</option>
                            ))}
                        </select>
          
                        <h2>Số lượng</h2>
          <input
            type="text"
            className="form-control"  
            value={soLuong}
            onChange={(e) => setSoLuong(e.target.value)}
          />
          <hr></hr>
          <button type="button" className="btn btn-outline-success" onClick={handleSave1}>Tạo vaccine</button>
            </div>
            <div className="col-lg-6  ">

<div className="NHAPPPP  mx-md-8">
<Table striped bordered hover>
        <thead>
            <tr>
                <th>Mã Gói</th>
                <th>Tổng tiền</th>
            </tr>
        </thead>
     <tbody>
        {listgetALLCTLoaiTCByIdLoaiTC.map((lists, index) => (
            <tr key={index}>
            <td>{lists.id}</td>
            <td>{lists.tongTien}</td>

            </tr>
        ))}
        
        </tbody>
</Table>
</div>
</div>
        </div>
      
      )}
      {activeList === "LoaiTC2" && (
        <div>
          <h2>Id</h2>
          <input
            type="text"
            className="form-control"  
            value={id}
            onChange={(e) => setIdGoiTC(e.target.value)}
            style={{ width: '200px' }}
          />
          <h2>Vaccine</h2>
          {listVaccine.map((vc) => (
      <label key={vc.id}>
        <input
          type="checkbox"
          value={vc.id}
          checked={selectedVaccine.includes(vc.id)}
          onChange={handleSelectVaccineGoi}
        />
        {vc.tenVaccine}
      </label>
    ))}
                        <h2>Số lượng</h2>
          <input
            type="text"
            className="form-control"  
            value={soLuong}
            onChange={(e) => setSoLuong(e.target.value)}
          />
          <hr></hr>
          <h2>Mô tả</h2>
          <input
            type="text"
            className="form-control"  
            value={moTa}
            onChange={(e) => setMoTa(e.target.value)}
          />
          <h2>Giảm giá</h2>
          <input
            type="text"
            className="form-control"  
            value={giamGia}
            onChange={(e) => setGiamGia(e.target.value)}
          />
          <hr></hr>
          <button type="button" className="btn btn-outline-success" onClick={handleSave2}>Tạo Vaccin  gói </button>
        </div>
      )}
    </div>
    </div>
   </form>
    </div>
    
    
    </div>
    </div>
    </div>
    </div>
    </section>
  );
};

export default GoiTiemChung;

