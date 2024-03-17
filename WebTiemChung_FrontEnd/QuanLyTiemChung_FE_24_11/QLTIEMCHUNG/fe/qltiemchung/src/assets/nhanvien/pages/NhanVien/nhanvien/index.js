import { memo } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Đường dẫn CSS của Bootstrap
import "bootstrap/dist/js/bootstrap.min.js"; // Đường dẫn JavaScript của Bootstrap
import "jquery/dist/jquery.min.js"; // Đường dẫn JavaScript của jQuery


import "../../bootstrap/css/bootstrap.min.css";

const NhanVien = () => {
    return (
        <>
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous"></link>
		 <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
          <div className="container">
			<h1>ProFile NhanVien</h1>
		  </div>
        
       
        </>
      
        
    );
};
export default memo(NhanVien);