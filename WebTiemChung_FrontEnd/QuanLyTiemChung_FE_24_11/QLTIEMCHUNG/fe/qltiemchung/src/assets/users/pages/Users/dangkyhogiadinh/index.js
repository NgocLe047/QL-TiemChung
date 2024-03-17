import { memo, useEffect, useState } from "react";
import axios from "axios";
import { Button, Table } from "react-bootstrap";
import { getALLGoiTiemChungByIdLoaiTC,getALLCTGoiTiemChungByMaGoiTiem,getALLVaccineById,createThongTinTiemChungKhachHang,createThongTinTiemChungHoGiaDinh } from "serviceAPI/userService";
import "./style.scss";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { list } from "@chakra-ui/react";
import { ROUTERS,USERSROUTER } from "utils/router";
import { useNavigate } from "react-router-dom";

const ButtonListExample = () => {
  


  
  const navigate = useNavigate();
  const [activeList, setActiveList] = useState(null);
  const [loaiTC1Name, setLoaiTC1Name] = useState("");
  const [loaiTC2Name, setLoaiTC2Name] = useState("");
  const [listVaccineByGoiTiem, setListVaccineByGoiTiem] = useState([]);



  const[tenNguoiDK, setTenNguoiDK] = useState("");
  const [maHoGiaDinh,setMaHoGiaDinh] = useState("");
 
  const [diaDiemTiem,setDiaDiemTiem] = useState("");

  const [cmndError, setCmndError] = useState(false);
  const [lanTiemError, setLanTiemError] = useState("");


  const [listGoiTiem, setListGoiTiem] = useState([]);
  const [selectedGoiTiem, setSelectedGoiTiem] = useState(null);
  
  const [count, setCount] = useState(0);
  const [numTextBoxes, setNumTextBoxes] = useState(0);

  const [names, setNames] = useState([]); // Initialize names as an empty array
  const [cmnds, setCmnds] = useState([]); // Initialize cmnds as an empty array
  const [lanTiems, setLanTiems] = useState([]); // Initialize lanTiems as an empty array
  const[heightDK,setHeightDK] = useState(0);
  
  const [thanhPho, setThanhPho] = useState("");
  const [quanHuyen, setQuanHuyen] = useState("");

const thanhPhoOptions = [
  { value: "HoChiMinh", label: "Thành phố Hồ Chí Minh" },
  { value: "HaNoi", label: "Thành phố Hà Nội" },
];

const quanHuyenOptions = {
  HoChiMinh: [
    { value: "Quận 1", label: "Quận 1" },
    { value: "Quận 2", label: "Quận 2" },
    { value: "Quận 3", label: "Quận 3" },
    { value: "Quận 4", label: "Quận 4" },
    { value: "Quận 5", label: "Quận 5" },
    { value: "Quận 6", label: "Quận 6" },
    { value: "Quận 7", label: "Quận 7" },
    { value: "Quận 8", label: "Quận 8" },
    { value: "Quận 9", label: "Quận 9" },
    { value: "Quận 10", label: "Quận 10" },
    { value: "Quận 11", label: "Quận 11" },
    { value: "Quận 12", label: "Quận 12" },


  ],
  HaNoi: [
    { value: "Quận Ba Đình", label: "Quận Ba Đình" },
    { value: "Quận Hoàn ", label: "Quận Hoàn Kiếm" },
    { value: "Quận Hai Bà Trưng", label: "Quận Hai Bà Trưng" },
  ],
};



  useEffect(() => {
    const fetchData = async () => {
      const updatedList = await Promise.all(
        listGoiTiem.map(async (goiTiem) => {
          try {
            const response = await getALLCTGoiTiemChungByMaGoiTiem(goiTiem.id);
            const vaccineNames = await Promise.all(
              response.map(async (ctGoiTiem) => {
                const vaccineResponse = await getALLVaccineById(ctGoiTiem.maVaccine);
                return vaccineResponse.tenVaccine;
              })
            );
    
            // Kiểm tra giá trị trước khi thêm vào state
            if (goiTiem.moTa && vaccineNames.length > 0) {
              return {
                id: goiTiem.id,
                moTa: goiTiem.moTa,
                vaccineNames: vaccineNames.join(", "),
                tongTien:goiTiem.tongTien,
              };
            } else {
              return null;
            }
          } catch (error) {
            console.error("Error fetching vaccine names:", error);
            toast.error("Lỗi");
            return null;
          }
        })
      );
    
      // Lọc ra các phần tử không null từ updatedList
      const filteredList = updatedList.filter(Boolean);
    
      // Cập nhật state sau khi Promise.all đã hoàn thành
      setListVaccineByGoiTiem(filteredList);
    };
    
  
    if (activeList === "LoaiTC2" && listGoiTiem.length > 0) {
      fetchData();
    }
  }, [listGoiTiem, activeList]);
  
  // const handleCmndChange = (e) => {
  //   const value = e.target.value;
  //   if (!/^\d*$/.test(value)) {
  //     setCmndError("Chứng minh nhân dân chỉ được nhập số");
  //   } else if (value.length > 12) {
  //     setCmndError("Chứng minh nhân dân không được quá 12 số");
  //   } else {
  //     setCmnd(value);
  //     setCmndError("");
  //   }
  // };
  // const handleLanTiemChange = (e) => {
  //   const value = e.target.value;
  //   if (!/^\d*$/.test(value)) { // Kiểm tra xem chuỗi có phải là số
  //     setLanTiemError("Lần tiêm chỉ được nhập số");
  //   } else {
  //     setLanTiem(value);
  //     setLanTiemError("");
  //   }
  // };

  //Xử lí nhập số lượng người đăng ký để hiển thị các input tương ứng
  const handleCountChange = (e) => {
    const countValue = parseInt(e.target.value, 10); // Parse the count value to an integer
    setCount(countValue);

    // Initialize names, cmnds, and lanTiems arrays with empty strings based on count
    const initialNames = Array(countValue).fill("");
    const initialCmnds = Array(countValue).fill("");
    const initialLanTiems = Array(countValue).fill("");

    setNames(initialNames);
    setCmnds(initialCmnds);
    setLanTiems(initialLanTiems);
  };

  const handleSubmit = () => {
    setNumTextBoxes(count);
    const newHeight = numTextBoxes *275;
    setHeightDK(newHeight);
  };
  
  
  const handleButtonClick = async (idLoaiTC) => {
    setActiveList(() => idLoaiTC);
    const test =  await getALLVaccineById("VC1")
    console.log(test.tenVaccine);
    if (idLoaiTC === "LoaiTC1") {
      try {
        const response = await getALLGoiTiemChungByIdLoaiTC(idLoaiTC);
        if (response) {
          setListGoiTiem(response);
        }
      } catch (error) {
        console.error("Error fetching Goi Tiem data:", error);
        toast.error("Lỗi");
      }

    } else if (idLoaiTC === "LoaiTC2") {
      try {
        const response2 = await getALLGoiTiemChungByIdLoaiTC(idLoaiTC);
        if (response2) {
          setListGoiTiem(response2);
          console.log(response2)
        }
        const goiTiemPromises = listGoiTiem.map(async (goiTiem) => {
          const response = await getALLCTGoiTiemChungByMaGoiTiem(goiTiem.id);
          return { goiTiem, vaccineList: response || [] };
        });
  
        const goiTiemResults = await Promise.all(goiTiemPromises);
  
        // Hiển thị danh sách vaccine
        setListVaccineByGoiTiem(goiTiemResults.map((result) => result.vaccineList).flat());
        console.log("listVaccineByGoiTiem:", listVaccineByGoiTiem);
      } catch (error) {
        console.error("Error fetching Vaccine data:", error);
        toast.error("Lỗi");
      }
    }
  };

  

  const TodayDate = () => {
    // Lấy ngày hôm nay
    const today = new Date();
  
    // Lấy các thành phần ngày, tháng, năm
    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0
    const year = today.getFullYear();
  
    // Định dạng thành chuỗi "YYYY-MM-DD"
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };
  
  
  const handleCreateThongTinTiemChung = async (names, cmnds, lanTiems) => {
    try {
      // if (!tenNguoiDK || !diaDiemTiem || !selectedGoiTiem || !maHoGiaDinh) {
      //   toast.error("Vui lòng điền đầy đủ thông tin và chọn gói tiêm.");
      //   return;
      // }
  
      // Check CMND length for each person
      // for (let i = 0; i < names.length; i++) {
      //   if (cmnds[i].length !== 12) {
      //     toast.error(`CMND người thứ ${i + 1} phải có đúng 12 chữ số.`);
      //     return;
      //   }
      // }
  
      const trangThai = "Chưa tiêm";
      const ngayDangKy = TodayDate();
      console.log("Đăng ký tiêm với dữ liệu:", names[0], cmnds[0], lanTiems[0]);
      if (!names || !cmnds || !lanTiems) {
        toast.error("Dữ liệu đầu vào không hợp lệ.");
        return;
      }
      // Loop through the arrays and call createThongTinTiemChungHoGiaDinh
      for (let i = 0; i < names.length; i++) {
        const res = await createThongTinTiemChungHoGiaDinh(
          ngayDangKy,
          lanTiems[i],
          diaDiemTiem,
          trangThai,
          cmnds[i],
          names[i],
          selectedGoiTiem,
          maHoGiaDinh
        );
        if(res)
        {
          console.log(res);
          toast.success("Thành Công");
        }
        console.log(`Kiểm tra ${i + 1}:`, res);
        if (!res) {
          toast.error('Lỗi',res);
          return;
        }
      }
  
      
      // navigate(USERSROUTER.USERS.HOME);
    } catch (error) {
      console.log(error);
    }
  };
  
  
  const handleGoiTiemChange = (event) => {
    setSelectedGoiTiem(event.target.value);
  };
  

  const handleTextBoxesUpdate = (updatedNames, updatedCmnds, updatedLanTiems) => {
    setNames(updatedNames);
    setCmnds(updatedCmnds);
    setLanTiems(updatedLanTiems);
  };
  return (
    <section className="h-100 gradient-form" style={{ backgroundColor: '#eee' }}>
      <h4>ĐĂNG KÝ TIÊM HỘ GIA ĐÌNH</h4>
      <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10 ml-5">
              <div className="card rounded-3 text-black"
              style={{width:"1400px"}}>
                <div className="row g-0"
                >
                 
                    <div className="card-body p-md-5 mx-md-4">
                 
                      <form >
                        <div className="form-outline ">
        <div class="row">
          <div class="col-5">
          <div class="row">
            
          <div class="col-6">
          <h2>Mã hộ gia đình</h2>
                <input
        type="text"
        className="form-control"
     
        value={maHoGiaDinh}
        onChange={(e) => setMaHoGiaDinh(e.target.value)}
      />
          </div>
          <div class="col-6">
          <h2>Số  người đăng ký tiêm </h2>
          <input
          className="form-control"
        type="number"
        value={count}
        onChange={handleCountChange}
        placeholder="Nhập số lượng"
      />
      <button type="button" className="btn btn-outline-success mt-3" onClick={handleSubmit}>Xác nhận</button>
          </div>
        </div>
        <div class="row"
        style ={{marginTop:"20px"}}>
        <div style={{ height: `${heightDK}px`, 
                      overflowY: "auto" }}>
  <TextBoxes
    numTextBoxes={numTextBoxes}
    names={names}
    cmnds={cmnds}
    lanTiems={lanTiems}
    onSubmit={handleTextBoxesUpdate}
  />
</div>
          
        </div>
          </div>
          <div class="col-7">
          
         

          <h2>Địa điểm tiêm</h2>
          <select
      className="form-control"
      value={thanhPho}
      onChange={(e) => {
        setThanhPho(e.target.value);
        setQuanHuyen(""); // Reset quận/huyện khi thành phố thay đổi
      }}
    >
      <option value="">Chọn thành phố</option>
      {thanhPhoOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>

    {thanhPho && (
      <select
        className="form-control"
        value={diaDiemTiem}
        onChange={(e) => setDiaDiemTiem(e.target.value)}
      >
        <option value="">Chọn quận</option>
        {quanHuyenOptions[thanhPho].map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    )}
          <h2>Ngày đăng ký tiêm: {TodayDate()}</h2>
          
          <hr></hr>
          <div>
  

      <div>
      <h2>Loại vắc xin muốn đăng ký </h2>
    <button type="button" className="btn btn-outline-danger mr-5" onClick={() => handleButtonClick("LoaiTC1")}>
  {loaiTC1Name || "Vaccine lẻ"}
</button>
      <button type="button" className="btn btn-outline-danger  " onClick={() => handleButtonClick("LoaiTC2")}>
        {loaiTC2Name || "Vaccine gói"}
      </button>

      {/* Render text boxes if LoaiTC1 is active */}

      <h2>Chọn vắc xin</h2>
      <div className="vaccine-container">
      
  {activeList === "LoaiTC1" && listGoiTiem.map((goiTiem) => (
    <div key={goiTiem.id} className="vaccine-option">
      
      <input
        type="radio"
        id={`goiTiem_${goiTiem.id}`}
        name="selectedGoiTiem"
        value={goiTiem.id}
        checked={selectedGoiTiem === goiTiem.id}
        onChange={handleGoiTiemChange}
      />
      <label htmlFor={`goiTiem_${goiTiem.id}`}>
        <span>{`${goiTiem.moTa} `}</span>
        <span className="vaccine-price">{`${goiTiem.tongTien.toLocaleString()}đ`}</span>
      </label>
    </div>
  ))}
</div>

<div className="vaccine-container">
  {activeList === "LoaiTC2" && listVaccineByGoiTiem.length > 0 && (
    <>
      {listVaccineByGoiTiem.map((item) => (
        <div key={item.id} className="vaccine-option">
          {item.moTa && item.vaccineNames && (
            <>
              <input
                type="radio"
                id={`goiTiem_${item.id}`}
                name="selectedGoiTiem"
                value={item.id}
                checked={selectedGoiTiem === item.id}
                onChange={handleGoiTiemChange}
              />
              <label htmlFor={`goiTiem_${item.id}`} className="vaccine-label">
                <div className="vaccine-content">
                  <span className="vaccine-title">{`${item.moTa} `}</span>
                  <span className="vaccine-price">{`${item.tongTien.toLocaleString()}đ`}</span>
                  <hr></hr>
                  <span >{` (${item.vaccineNames})`}</span>
                </div>
              </label>
            </>
          )}
        </div>
      ))}
    </>
  )}
</div>

      
    </div>
    </div>
    
<button type="button" className="btn btn-outline-success mt-5" onClick={() => handleCreateThongTinTiemChung(names, cmnds, lanTiems)}>Đăng ký tiêm</button>

          </div>
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

  function TextBoxes({ numTextBoxes, names, cmnds, lanTiems, onSubmit }) {
    const [formData, setFormData] = useState([]);

    useEffect(() => {
      setFormData(Array(numTextBoxes).fill(""));
    }, [numTextBoxes]);

    const handleInputChange = (e, index) => {
      const { name, value } = e.target;
      let updatedNames = [...names];
      let updatedCmnds = [...cmnds];
      let updatedLanTiems = [...lanTiems];
    
      if (name === "name") {
        updatedNames[index] = value;
      } else if (name === "cmnd") {
        updatedCmnds[index] = value;
      } else if (name === "lanTiem") {
        updatedLanTiems[index] = value;
      }
    
      onSubmit(updatedNames, updatedCmnds, updatedLanTiems);
    };

    return (
      <div style={{ height: "275px" }}>
        {Array.from({ length: numTextBoxes }, (_, index) => (
          <div key={index}>
            <div className="row ">
              <div className="col-12">
                <h2>Họ tên người tiêm {index + 1}</h2>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  value={names[index]}
                  onChange={(e) => handleInputChange(e, index)}
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col-6">
                <h2>CMND người tiêm {index + 1}</h2>
                <input
                  className="form-control"
                  type="text"
                  name="cmnd"
                  value={cmnds[index]}
                  onChange={(e) => handleInputChange(e, index)}
                />
              </div>
              <div className="col-6">
                <h2>Lần tiêm người tiêm {index + 1}</h2>
                <input
                  className="form-control"
                  type="text"
                  name="lanTiem"
                  value={lanTiems[index]}
                  onChange={(e) => handleInputChange(e, index)}
                />
              </div>
              <hr
                style={{
                  border: "solid",
                  width: "615px",
                  marginTop: "10px",
                }}
              ></hr>
            </div>
          </div>
        ))}
      </div>
    );
  }



export default ButtonListExample;