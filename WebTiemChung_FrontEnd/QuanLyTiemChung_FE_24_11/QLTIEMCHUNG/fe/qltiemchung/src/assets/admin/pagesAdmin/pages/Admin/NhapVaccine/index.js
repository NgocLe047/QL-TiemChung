import { memo, useEffect, useState ,useRef  } from "react";
import axios from 'axios';
import { Table } from "react-bootstrap";
import "./style.scss";
import { CTNhapVaccine, NHAPVaccine, getALLnhaCungCap,getAllVaccine,getALLNhapVaccine,getChiTietPhieuNhap,thongkephieunhap} from "serviceAPI/userService";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Chart } from 'chart.js';


const NhapVaccine = () => {

    //THỐNG KÊ 
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [thongKeResults, setThongKeResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [vaccineStats, setVaccineStats] = useState([]);


    //NHAP VACCINE 
    const [idNhapVaccine, setIdNhapVaccine] = useState("");
    const [idNgayTao, setIdNgayTao] = useState("");
    //BIỂU ĐỒ
    const chartRef = useRef(null);

    //NHÀ CUNG CẤP 
    const [selectedNhaCungCap, setSelectedNhaCungCap] = useState("");

    //GET ALL NHAP VACCINE
    const [listgetALLnhapvaccine,setlistgetALLnhapvaccine] = useState([]);

    // GET CHI TIET PHIEU NHAP
    const [listchitiepphieunhap,setListchitiepphieunhap] = useState([]);
    //
    const [listNhaCungCap, setListNhaCungCap] = useState([]);

    const [listVaccine, setListVaccine] = useState([]);

    const [selectedVaccine, setSelectedVaccine] = useState("");

    
    // const [idMaPhieuNhap, setIdMaPhieuNhap] = useState("");
    const [soLuongNhap, setSoLuongNhap] = useState(0);
  

    useEffect(() => {
        getNhaCungCap();
        getVaccine();
        getNhapVaccine();
        getChiTietPhieuNhapVaccine();

        if (showResults && chartRef.current) {
          const chartData = {
            labels: vaccineStats.map(([maVaccine]) => maVaccine),
            datasets: [
              {
                label: 'Số Lượng',
                data: vaccineStats.map(([, soLuong]) => soLuong),
                backgroundColor: 'rgba(224, 197, 138, 1)',
                borderColor: 'rgba(224, 197, 138, 1)',
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

    //
   const handleThongKe = () => {
  const stats = {};

  // Filter the list of "ChiTietPhieuNhap" based on the start and end dates
  const filteredList = listchitiepphieunhap.filter(
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
    //GET CHI TIET PHIEU NHAP VACCINE
    const getChiTietPhieuNhapVaccine = async () => {
        try {
            const res = await getChiTietPhieuNhap();
            if (res) {
                setListchitiepphieunhap(res);
            }
        } catch (error) {
            console.log(error);
        }
    }
    //GET ALL NHAP VACCINE
    const getNhapVaccine = async () => {
        try {
            const res = await getALLNhapVaccine();
            if (res) {
                setlistgetALLnhapvaccine(res);
            }
        } catch (error) {
            console.log(error);
        }
      }
      //
    const getNhaCungCap = async () => {
        try {
            const res = await getALLnhaCungCap();
            if (res) {
                setListNhaCungCap(res);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleSelectNCC = (event) => {
        setSelectedNhaCungCap(event.target.value);
    };
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
    const handleNhapVaccine = async () => {
        try {
            const res = await NHAPVaccine(idNhapVaccine, idNgayTao, selectedNhaCungCap);
            console.log("Kiểm tra", res);
            if (res) {
                setIdNhapVaccine(idNhapVaccine);
                setIdNgayTao(idNgayTao);
                setSelectedNhaCungCap(selectedNhaCungCap);
                toast.success("Thành Công");
            } else {
                toast.error('Lỗi');
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleCTNhapVaccine = async () => 
    {
        try {
            const res = await CTNhapVaccine( idNgayTao, soLuongNhap,selectedVaccine,idNhapVaccine);
            console.log("Kiểm tra", res);
            if (res) {
                setIdNhapVaccine(idNhapVaccine);
                setIdNgayTao(idNgayTao);
                setSoLuongNhap(soLuongNhap);
                setSelectedVaccine(idNhapVaccine);
                toast.success("Thành Công");
            } else {
                toast.error('Lỗi');
            }
        } catch (error) {
            console.log(error);
        }
    };
    //
    

    return (
        <>
          <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
          <script src="https://cdn.jsdelivr.net/npm/chart.js@3.5.1/dist/chart.min.js"></script>
         <section className="h-100 gradient-form" style={{ backgroundColor: '#eee' }}>
         <h4>TẠO PHIẾU NHẬP</h4>

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
                        <h2>Mã Phiếu Nhập</h2>
                          <input
                            type="text"
                            className="form-control"                            
                            value={idNhapVaccine}
                            onChange={(event) => setIdNhapVaccine(event.target.value)}
                        />
                        </div>
                        <div className="form-outlinee mb-4">
                          <h2>Ngày Tạo</h2>
                          <input
                            type="date"
                            className="form-control"                            
                            value={idNgayTao}
                            onChange={(event) => setIdNgayTao(event.target.value)}
                        />
                        </div>
                        <div className="form-outlineee mb-4">
                          <h2>Nhà Cung Cấp</h2>
                        <div className="">
                        <select value={selectedNhaCungCap} onChange={handleSelectNCC}>
                            <option value=""
                            > Nhà Cung Cấp</option>
                            {listNhaCungCap.map((ncc) => (
                                <option key={ncc.id} value={ncc.id}>{ncc.tenNCC}</option>
                            ))}
                        </select>
                        <p>Mã Nhà Cung Cấp: {selectedNhaCungCap}</p>
                        </div>
                         
                        </div>
                    
                        <div className="d-flex align-items-center justify-content-center pb-4">
                        <button type="button" className="btn btn-outline-danger" onClick={handleNhapVaccine}>Tạo phiếu nhập</button>
                    </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-6  ">

                    <div className="NHAPPPP  mx-md-8">
                    <Table striped bordered hover>
                            <thead>
                                <tr>
                                <th>Mã Phiếu Nhập</th>
                                <th>Ngày Tạo</th>
                                <th>Mã Nhà Cung Cấp</th>
                                </tr>
                            </thead>
                         <tbody>
                            {listgetALLnhapvaccine.map((lists, index) => (
                                <tr key={index}>
                                <td>{lists.id}</td>
                                <td>{lists.ngayTao}</td>
                                <td>{lists.maNhaCungCap}</td>

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
        {/* sda */}

        <div className="container py-5 h-100">
        <h4>NHẬP VACCINE</h4>

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
                            <div className="form-outline mb-4">
                                <h2>Số Lượng</h2>
                                <input
                                            type="text"
                                            className=""
                                            value={soLuongNhap}
                                            onChange={(event) => setSoLuongNhap(event.target.value)}
                                />
                            </div>  
                            <div className="d-flex align-items-center justify-content-center pb-4">
                            <button type="button" className="btn btn-outline-danger" onClick={handleCTNhapVaccine}>Nhập vaccine</button>
                        </div>
                            </form>
                        </div>
                        </div>
                        <div className="col-lg-6  ">

                        <div className=" CHITIETNHAPVACCINE  mx-md-8">
                        <Table striped bordered hover>
                                <thead>
                                    <tr>
                                    <th>Ngày Tạo</th>
                                    <th>Số Lượng</th>
                                    <th>Mã Vaccine</th>
                                    <th>Mã Phiếu Nhập Vaccine</th>
                                    </tr>
                                </thead>
                            <tbody>
                                {listchitiepphieunhap.map((lists, index) => (
                                    <tr key={index}>
                                    <td>{lists.ngayTao}</td>
                                    <td>{lists.soLuong}</td>
                                    <td>{lists.maVaccine}</td>
                                    <td>{lists.maNhapVaccine}</td>

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

export default memo(NhapVaccine);