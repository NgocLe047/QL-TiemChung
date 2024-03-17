import { Modal, Button } from "react-bootstrap";
import { memo, useEffect, useState } from "react";
import { getALLLoaiVaccine ,themloaivaccine } from "serviceAPI/userService";
import { event } from "jquery";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const ModalAddLoaiVaccine = (props) => {
  const { show , handleClose } = props;
  const [idLoaiVaccie, setidLoaiVaccie] = useState("");
  const [idtenLoai, setidtenLoai] = useState("");
  
  const handleSave =async () => {
    try {
        const res = await themloaivaccine(idLoaiVaccie,idtenLoai);
        console.log("Kiểm tra", res);
        if (res) {
            setidLoaiVaccie(idLoaiVaccie);
            setidtenLoai(idtenLoai);
            toast.success("Thành Công");
        } else {
            toast.error('Lỗi');
        }
    } catch (error) {
        console.log(error);
    }
  } 
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title><h4>THÊM LOẠI VACCINE</h4></Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="body-add-new">
            <div class="mb-3">
                    <label class="form-label">Id</label>
                    <input
                     type="text" 
                     class="form-control"
                     value={idLoaiVaccie}
                     onChange={(event) => setidLoaiVaccie(event.target.value)}
                     />
                </div>
                <div class="mb-3">
                    <label class="form-label">Tên Loại</label>
                    <input 
                    type="text" 
                    class="form-control" 
                    value={idtenLoai}
                    onChange={(event) => setidtenLoai(event.target.value)}

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

export default ModalAddLoaiVaccine;