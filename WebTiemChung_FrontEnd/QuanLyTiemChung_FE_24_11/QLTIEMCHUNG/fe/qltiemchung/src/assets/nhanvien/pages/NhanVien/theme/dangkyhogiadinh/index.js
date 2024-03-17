import { memo, useEffect, useState } from "react";
import { Button, Table, Modal, Container } from "react-bootstrap";
import { getTTthamKham,getThongTinTiemChungGiaDinh } from "serviceAPI/userService";
import { toast } from "react-toastify";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { error } from "jquery";

const TTThamkham = () => {

  const [listttThamKham, setlistttThamKham] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [ngayTiem,setNgayTiem] = useState("");
  const [gioTiem,setgioTiem] = useState("");
  const [trangThai,setTrangthai] = useState("");
  const [htTruockhitiem,sethtTruockhitiem] = useState("");
  const [htSauKhitiem,sethtSauKhitiem] = useState("");

  const [editId,seteditId] = useState("");
  const [editNgayTiem,seteditNgayTiem] = useState("");
  const [editGioTiem,seteditGioTiem] = useState("");
  const [editTrangthai,seteditTrangthai] = useState("");
  const [edithtTruockhitiem,setedithtTruockhitiem] = useState("");
  const [edithtSauKhitiem,setedithtSauKhitiemm] = useState("");

  const [searchMaHoGiaDinh, setSearchMaHoGiaDinh] = useState(""); 
  const [familyTTCList, setFamilyTTCList] = useState([]);


  useEffect(() => {
    getttThamKham();
  }, []);

  const getttThamKham = async () => {
    try {
      const res = await getTTthamKham();
      setlistttThamKham(res);
    } catch (error) {
      console.error(error);
    }
  };

  const handEdit = (id) => {
      handleShow();
      axios.get(`https://localhost:44307/api/ThongTinTiemChung/get-thong-tin-tiem-chung-by-id/${id}`)
      .then((result) => {
        seteditNgayTiem(result.data.ngayTiem);
        seteditGioTiem(result.data.gioTiem);
        seteditTrangthai(result.data.trangThai);
        setedithtTruockhitiem(result.data.htTruockhitiem);
        setedithtSauKhitiemm(result.data.htSauKhitiem);
        seteditId(id);
      })
      .catch((error) => {
        console.log(error);
      })

  }
  const handleUpdate = () => {
      const url = `https://localhost:44307/api/ThongTinTiemChung/update-thong-tin-tiem-chung-nhan-vien/${editId}`;
      const gioTiem = new Date().toISOString().substr(0, 10) + 'T' + editGioTiem + ':00';
      const data = {
        "ngayTiem":editNgayTiem,
        "gioTiem":gioTiem,
        "trangThai":editTrangthai,
        "htTruocTiem":edithtTruockhitiem,
        "htSauTiem":edithtSauKhitiem
      }
      axios.put(url,data)
      .then((result) => {
        getTTthamKham();
        toast.success("Ghi Nhận Thành Công")
      }).catch((error) =>{
        toast.error(error);
      })
  }
 
  const handleSave = () => {

  }

  const handeDelete = (id) => {
      if(window.confirm("Are you sure") == true ) {
          axios.delete(`https://localhost:44307/api/ThongTinTiemChung/delete-thong-tin-tiem-chung/${id}`)
          .then((result) => {
            if(result.status === 400)
            {
              toast.success("Success");
            }
          })
          .catch((error) => {
            toast.error(error);
          })
      }
  }
  const handleSearch = async () => {
    try {
      const response = await getThongTinTiemChungGiaDinh(searchMaHoGiaDinh);
      if (response) {
        setFamilyTTCList(response); // Assuming the response has the data in this format
        toast.success("Thông tin đã được tải lên.");
      } else {
        toast.error("Không tìm thấy thông tin.");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra khi tìm kiếm thông tin.");
      console.error(error);
    }
  };
 

  return (
    <>
      <div className="container">
        <h2>DANH SÁCH THÔNG TIN TIÊM CHỦNG HỘ GIA ĐÌNH</h2>
        <div className="search-container">
          <input
            type="text"
            className="form-control"
            placeholder="Mã hộ gia đình"
            value={searchMaHoGiaDinh}
            onChange={(e) => setSearchMaHoGiaDinh(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleSearch}>Tìm kiếm</button>
        </div>
        <Container>
          <Row>
              <Col>
                <input type="date"className="form-control"placeholder="Ngày Tiêm"
                  value={ngayTiem} onChange={(e) => setNgayTiem(e.target.value)}
                />
              </Col>
              <Col>
                <input type="time"className="form-control"placeholder="Giờ Tiêm"
                value={gioTiem} onChange={(e) => setgioTiem(e.target.value)}
                />
              </Col>
              <Col>
              <input type="text"className="form-control"placeholder="Trạng Thái"
                value={trangThai} onChange={(e) => setTrangthai(e.target.value)}
                />              
                </Col>
              <Col>
              <input type="text"className="form-control"placeholder="Hiện Trạng Trước Khi Tiêm"
                value={htTruockhitiem} onChange={(e) => sethtTruockhitiem(e.target.value)}
                />   
              </Col>
              <Col>
              <input type="text"className="form-control"placeholder="Hiện Trạng Sau Khi Tiêm"
                value={htSauKhitiem} onChange={(e) => sethtSauKhitiem(e.target.value)}
                />   
              </Col>
              <Col>
                  <button className="btn btn-primary" onClick={() => handleSave()}>Submit</button>
              </Col>
          </Row>
        </Container>
        {familyTTCList.length > 0 && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Ngày Đăng Ký</th>
              <th>Ngày Tiêm</th>
              <th>Lần Tiêm</th>
              <th>Giờ Tiêm</th>
              <th>Địa Điểm Tiêm</th>
              <th>Trạng Thái</th>
              <th>HTT Khi Tiêm</th>
              <th>HTS Khi Tiêm</th>
            </tr>
          </thead>

          <tbody>
            {familyTTCList.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.ngayDangKy}</td>
                <td>{item.ngayTiem}</td>
                <td>{item.lanTiem}</td>
                <td>{item.gioTiem}</td>
                <td>{item.diaDiemTiem}</td>
                <td>{item.trangThai}</td>
                <td>{item.htTruocTiem}</td>
                <td>{item.htSauTiem}</td>
                <td>
                    <button className="btn btn-primary"onClick={()=> handEdit(item.id)}>Ghi Nhận</button>
                </td>
                <td>
                    <button className="btn btn-primary"onClick={()=> handeDelete(item.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
           )}
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
       
                <input type="date"className="form-control"placeholder="Ngày Tiêm"
                  value={editNgayTiem} onChange={(e) => seteditNgayTiem(e.target.value)}
                />
                <input type="time"className="form-control"placeholder="Giờ Tiêm"
                value={editGioTiem} onChange={(e) => seteditGioTiem(e.target.value)}
                />
              <input type="text"className="form-control"placeholder="Trạng Thái"
                value={editTrangthai} onChange={(e) => seteditTrangthai(e.target.value)}
                />              
              <input type="text"className="form-control"placeholder="Hiện Trạng Trước Khi Tiêm"
                value={edithtTruockhitiem} onChange={(e) => setedithtTruockhitiem(e.target.value)}
                />   
              
              <input type="text"className="form-control"placeholder="Hiện Trạng Sau Khi Tiêm"
                value={edithtSauKhitiem} onChange={(e) => setedithtSauKhitiemm(e.target.value)}
                />   
           

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
     
    </>
  );
};

export default memo(TTThamkham);