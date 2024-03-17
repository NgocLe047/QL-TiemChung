import { memo, useEffect, useState ,useRef } from "react";
import axios from 'axios';
import { Table } from "react-bootstrap";
import "./style.scss";
import { CTXuatVaccine, XUATVaccine, getALLnhaCungCap,getAllVaccine,getALLXuatVaccine,getChiTietPhieuXuat,thongkephieuxuat} from "serviceAPI/userService";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Chart } from 'chart.js';


const XuatVaccine = () => {

   //THỐNG KÊ 
   const [startDate, setStartDate] = useState('');
   const [endDate, setEndDate] = useState('');
   const [thongKeResults, setThongKeResults] = useState([]);
   const [showResults, setShowResults] = useState(false);
   const [vaccineStats, setVaccineStats] = useState([]);

     //BIỂU ĐỒ
     const chartRef = useRef(null);
    //XUAT VACCINE 
    const [idXuatVaccine, setidXuatVaccine] = useState("");
    const [idNgayTao, setIdNgayTao] = useState("");

    //VACCINE
    const [listVaccine, setListVaccine] = useState([]);
    const [soLuongNhap, setSoLuongNhap] = useState(0);
    const [selectedVaccine, setSelectedVaccine] = useState("");
 

      //GET ALL CHI TIET PHIEU XUAT

      const [listchitiepphieuxuat,setListchitiepphieuxuat] = useState([]);


    
 

    //GET ALL XUAT VACCINE
    const [listgetALLXuatvaccine,setlistgetALLXuatvaccine] = useState([]);

    useEffect(() => {
        getXuatVaccine();getVaccine();chitietphieuxuat()
        if (showResults && chartRef.current) {
          const chartData = {
            labels: vaccineStats.map(([maVaccine]) => maVaccine),
            datasets: [
              {
                label: 'Số Lượng',
                data: vaccineStats.map(([, soLuong]) => soLuong),
                backgroundColor: 'rgba(12, 138, 138, 1)',
                borderColor: 'rgba(12, 138, 138, 1)',
                borderWidth: 1, 
              },
            ],
          };
    
          const chartOptions = {
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          };
    
          const ctx = chartRef.current.getContext('2d');
          new Chart(ctx, {
            type: 'bar',  // Loại biểu đồ cột
            data: chartData,
            options: chartOptions,
          });
        }
      }, [showResults, vaccineStats]);


     //GET ALL XUAT VACCINE
     const getXuatVaccine = async () => {
        try {
            const res = await getALLXuatVaccine();
            if (res) {
                setlistgetALLXuatvaccine(res);
            }
        } catch (error) {
            console.log(error);
        }
      }
      //
      const chitietphieuxuat = async () => {
        try {
          const res = await getChiTietPhieuXuat();
          if (res) {
            setListchitiepphieuxuat(res);
          }
      } catch (error) {
          console.log(error);
      }
      }
      const handleThongKe = () => {
        const stats = {};
      
        // Filter the list of "ChiTietPhieuNhap" based on the start and end dates
        const filteredList = listchitiepphieuxuat.filter(
          (item) => item.ngayTao >= startDate && item.ngayTao <= endDate
        );
      
        filteredList.forEach((item) => {
          const { maVaccine, soLuong } = item;
          if (maVaccine in stats) {
            stats[maVaccine] += soLuong;
          } else {
            stats[maVaccine] = soLuong;
          }
        });
      
        const statsArray = Object.entries(stats);
        setVaccineStats(statsArray);
        setShowResults(true);
      };
      ///
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
      const handleSelectVaccine = (event) => {
        setSelectedVaccine(event.target.value);
      };

      const handleCTXUATVaccine = async () => 
    {
        try {
            const res = await CTXuatVaccine( idNgayTao, soLuongNhap,selectedVaccine,idXuatVaccine);
            console.log("Kiểm tra", res);
            if (res) {
                setidXuatVaccine(idXuatVaccine);
                setIdNgayTao(idNgayTao);
                setSoLuongNhap(soLuongNhap);
                setSelectedVaccine(selectedVaccine);
                toast.success("Thành Công");
            } else {
                toast.error('Lỗi');
            }
        } catch (error) {
            console.log(error);
        }
    };

    
    const handleXuatVaccine = async () => {
        try {
            const res = await XUATVaccine(idXuatVaccine, idNgayTao);
            console.log("Kiểm tra", res);
            if (res) {
                setidXuatVaccine(idXuatVaccine);
                setIdNgayTao(idNgayTao);
                toast.success("Thành Công");
            } else {
                toast.error('Lỗi');
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
		        <section className="h-100 gradient-form" style={{ backgroundColor: '#eee' }}>
         <h4>TẠO PHIẾU XUẤT</h4>

        <div className="container py-5 h-100">

          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3 text-black">
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">
                      <div className="text-center">
                      </div>
                      <form className="taophieunhap">
                        <div className="form-outline mb-4">
                        <h2>Mã Phiếu Xuất</h2>
                          <input
                            type="text"
                            className="form-control"                            
                            value={idXuatVaccine}
                            onChange={(event) => setidXuatVaccine(event.target.value)}
                        />
                        </div>
                        <div className="form-outlineE mb-4">
                          <h2>Ngày Tạo</h2>
                          <input
                            type="date"
                            className="form-control"                            
                            value={idNgayTao}
                            onChange={(event) => setIdNgayTao(event.target.value)}
                        />
                        </div>
                        <div className="d-flex align-items-center justify-content-center pb-4">
                        <button type="button" className="btn btn-outline-danger" onClick={handleXuatVaccine}>Tạo phiếu Xuất</button>
                    </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-6  ">

                    <div className="NHAPPPP  mx-md-8">
                    <Table striped bordered hover>
                            <thead>
                                <tr>
                                <th>Mã Phiếu Xuất</th>
                                <th>Ngày Tạo</th>
                                </tr>
                            </thead>
                         <tbody>
                            {listgetALLXuatvaccine.map((lists, index) => (
                                <tr key={index}>
                                <td>{lists.id}</td>
                                <td>{lists.ngayTao}</td>

                                </tr>
                            ))}
                            
                            </tbody>
                 </Table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
            {/* ASDSADADASDA */}


            <div className="container py-5 h-100">
        <h4>XUẤT VACCINE</h4>

                <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-xl-10">
                    <div className="card rounded-3 text-black">
                    <div className="row g-0">
                        <div className="col-lg-6">
                        <div className="card-body p-md-5 mx-md-4">
                            <div className="text-center">
                            </div>
                            <form className="taophieunhap">
                            <div className="form-outline mb-4">
                            <h2>Nhập Vaccine</h2>
                            <select value={selectedVaccine} onChange={handleSelectVaccine}>
                                <option value="">Tên Vaccine</option>
                                {listVaccine.map((vaccine) => (
                                <option key={vaccine.id} value={vaccine.id}>{vaccine.tenVaccine}</option>
                                ))}
                            </select>
                    <p>Mã Vaccine: {selectedVaccine}</p>
                            </div>
                            <div className="FORM-outline mb-4">
                                <h2>Số Lượng</h2>
                                <input
                                            type="text"
                                            className=""
                                            value={soLuongNhap}
                                            onChange={(event) => setSoLuongNhap(event.target.value)}
                                />
                            </div>  
                            <div className="d-flex align-items-center justify-content-center pb-4">
                            <button type="button" className="btn btn-outline-danger" onClick={handleCTXUATVaccine}>XUÁT vaccine</button>
                        </div>
                            </form>
                        </div>
                        </div>
                        <div className="col-lg-6  ">

                        <div className=" CHITIETXUATVACCIN  mx-md-8">
                        <Table striped bordered hover>
                                <thead>
                                    <tr>
                                    <th>Ngày Tạo</th>
                                    <th>Số Lượng</th>
                                    <th>Mã Vaccine</th>
                                    <th>Mã Phiếu Xuất Vaccine</th>
                                    </tr>
                                </thead>
                            <tbody>
                                {listchitiepphieuxuat.map((lists, index) => (
                                    <tr key={index}>
                                    <td>{lists.ngayTao}</td>
                                    <td>{lists.soLuong}</td>
                                    <td>{lists.maVaccine}</td>
                                    <td>{lists.maXuatVaccine}</td>

                                    </tr>
                                ))}
                                
                                </tbody>
                        </Table>
                        </div>
                    </div>
                    </div>
                    </div>
                </div>
                </div>
                </div>
        
                                    {/* THỐNG KÊ */}
                        <div className="container">
                        {/* <form className="thongke">
                        <div className="form-outline mb-4">
                          <h2>Ngày Bắt Đầu</h2>
                          <input
                            type="date"
                            className="form-control"
                            value={startDate}
                            onChange={(event) => setStartDate(event.target.value)}
                          />
                        </div>
                        <div className="form-outline mb-4">
                          <h2>Ngày Kết Thúc</h2>
                          <input
                            type="date"
                            className="form-control"
                            value={endDate}
                            onChange={(event) => setEndDate(event.target.value)}
                          />
                        </div>
                        <div className="d-flex align-items-center justify-content-center pb-4">
                          <button type="button" className="btn btn-outline-danger" onClick={handleThongKe}>Thống kê</button>
                        </div>
                      </form> */}
                      <form className="thongke">
                            <div className="ngaybatdau">
                                      <h2>Ngày Bắt Đầu</h2>
                                    <input
                                      type="date"
                                      // className="form-control"
                                      value={startDate}
                                      onChange={(event) => setStartDate(event.target.value)}
                                    />
                            </div>
                              <div className="ngaykethuc">
                                    <h2>Ngày Kết Thúc</h2>
                                <input
                                  type="date"
                                  // className="form-control"
                                  value={endDate}
                                  onChange={(event) => setEndDate(event.target.value)}
                                />
                          </div>
                          <div className="d-flex align-items-center justify-content-center pb-4">
                          <button type="button" className="thongkee btn btn-outline-danger" onClick={handleThongKe}>Thống kê</button>
                        </div>
                          </form>
                                
                      <div className="THONGKE">
                          {showResults && (
                            <div className="THONGKEKETQUA mx-md-8">
                              {/* Thêm thẻ canvas để vẽ biểu đồ */}
                              <canvas ref={chartRef}></canvas>
                            </div>
                          )}
                        </div>
                          </div>     



                        
     </section>
    
       
        </>
      
        
    );
};
export default memo(XuatVaccine);