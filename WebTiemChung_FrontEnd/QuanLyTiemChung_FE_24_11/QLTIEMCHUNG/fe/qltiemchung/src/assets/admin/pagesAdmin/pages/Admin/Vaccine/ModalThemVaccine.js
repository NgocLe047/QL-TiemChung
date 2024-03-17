import { Modal, Button } from "react-bootstrap";
import { memo, useEffect, useState } from "react";
import { themloaivaccine ,getALLLoaiVaccine,themVaccine, } from "serviceAPI/userService";
import { event } from "jquery";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const ModalAddVaccine = (props) => {
  const { show , handleClose } = props;

  const [idVaccine ,setidVaccine ] = useState ("");
  const [tenVaccine , settenVaccine] = useState ("");
  const [nhaSanXuat , setnhaSanXuat] = useState ("");
  const [soLuongton, setsoLuongton] = useState(0);
  const [ngaySanXuat, setngaySanXuat] = useState("");
  const [ngayHetHan, setngayHetHan] = useState("");;
  const [giaTien,setGiaTien] = useState(0);
  const [loaiVaccine , setLoaiVaccine] = useState([]);
  const [selectedLoaiVaccine, setSelectedLoaiVaccine] = useState("");



  useEffect(() => {
    getVaccine();
  },[])
  
  const handleSelectLoaiVaccine = (event) => {
    setSelectedLoaiVaccine(event.target.value);
  };
  const handleSave =async () => {
    try {
        const res = await themVaccine(idVaccine,tenVaccine,nhaSanXuat,soLuongton,ngaySanXuat,ngayHetHan,selectedLoaiVaccine,giaTien);
        console.log("Kiểm tra", res);
        if (res) {
            setidVaccine(idVaccine);
            settenVaccine(tenVaccine);
            setnhaSanXuat(nhaSanXuat);
            setsoLuongton(soLuongton);
            setngaySanXuat(ngaySanXuat);
            setngayHetHan(ngayHetHan);
            setSelectedLoaiVaccine(selectedLoaiVaccine);
            setGiaTien(giaTien);
            toast.success("Thành Công");
        } else {
            toast.error('Lỗi');
        }
    } catch (error) {
        console.log(error);
    }
  } 


  const getVaccine = async () => {
    let res = await getALLLoaiVaccine();
    if(res) {
        setLoaiVaccine(res);
    }
  }
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><h4>THÊM  VACCINE</h4></Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="body-add-new">
            <div className="mb-3">
                    <label class="form-label">Id</label>
                    <input
                     type="text" 
                     class="form-control"
                     value={idVaccine}
                     onChange={(event) => setidVaccine(event.target.value)}
                     />
                </div>
                <div className="mb-3">
                    <label class="form-label">Tên Vaccine</label>
                    <input 
                    type="text" 
                    class="form-control" 
                    value={tenVaccine}
                    onChange={(event) => settenVaccine(event.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label class="form-label">Nhà Sản Xuất</label>
                    <input 
                    type="text" 
                    class="form-control" 
                    value={nhaSanXuat}
                    onChange={(event) => setnhaSanXuat(event.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label class="form-label">Số Lượng</label>
                    <input
                     type="text"
                    className=""
                    value={soLuongton}
                    onChange={(event) => setsoLuongton(event.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label class="form-label">Ngày Sản Xuất</label>
                    <input
                     type="date"
                    className=""
                    value={ngaySanXuat}
                    onChange={(event) => setngaySanXuat(event.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label class="form-label">Ngày Hết Hạn</label>
                    <input
                     type="date"
                    className=""
                    value={ngayHetHan}
                    onChange={(event) => setngayHetHan(event.target.value)}
                    />
                </div>

                <div className="">
                <select value={selectedLoaiVaccine} onChange={handleSelectLoaiVaccine}>
                <option value="">Loại Vaccine</option>
                {loaiVaccine.map((ncc) => (
                  <option key={ncc.id} value={ncc.id}>
                    {ncc.tenLoai}
                  </option>
                ))}
              </select>
                        <p>Loại Vaccine: {selectedLoaiVaccine}</p>
                      
                </div>
                <div className="mb-3">
                    <label class="form-label">Giá tiền</label>
                    <input
                     type="text"
                    className=""
                    value={giaTien}
                    onChange={(event) => setGiaTien(event.target.value)}
                    />
                </div>


                {/* <button type="submit" class=" themloai btn btn-success">Thêm</button> */}
            </div>        
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Thoát
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Thêm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAddVaccine;