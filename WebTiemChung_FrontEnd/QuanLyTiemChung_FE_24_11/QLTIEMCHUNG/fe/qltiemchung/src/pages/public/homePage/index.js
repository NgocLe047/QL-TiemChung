import { memo } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Đường dẫn CSS của Bootstrap
import "bootstrap/dist/js/bootstrap.min.js"; // Đường dẫn JavaScript của Bootstrap
import "jquery/dist/jquery.min.js"; // Đường dẫn JavaScript của jQuery
import "./style.scss";
import anhtiemchung1 from "../../img/anhtiemchung1.jpg";
import anhtiemchung2 from "../../img/anhtiemchung2.jpg";
import anhtiemchung3 from "../../img/anhtiemchung3.jpg";

import viemganB from "../../img/viemganB.jpg";
import uonvan from "../../img/uonvan.jpg";
import hoga from "../../img/hoga.jpg";


import "../../bootstrap/css/bootstrap.min.css";

const HomePage = () => {
    return (
        <>
		<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous"></link>
		 <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
          <div className="product-section">

			<div className="container">
				<h1>Tại sao mẹ nên đăng ký dịch vụ tiêm chủng trọn gói cho bé</h1>
				<p>Thực hiện viêc tiêm vaccine cho bé đầy đủ và đúng lịch là biện pháp quan trọng để giúp con yêu có thể tạo ra sức đề kháng chống lại các bệnh truyền nhiễm nguy hiểm. Tuy nhiên thực tế lại có rất nhiều gia đình quên mất lịch trình tiêm chủng của bé, hoặc là do một vài lí do mà số lượng vaccine không đủ khiến bé bị nhỡ mất lịch tiêm. Điều này có thể làm lỡ mất “thời điểm vàng” để bé miễn dịch với nhiều loại bệnh.</p>
				<div className="row anh-header">
					<div className="col-3">
					<a className="product-item" href="cart.html">
								<img className="anhtiemchung1" src={anhtiemchung1}  width={300}  alt="anhtiemchung1" />
						</a>
					</div>
					<div className="col-3">
					<a className="product-item" href="cart.html">
								<img className="anhtiemchung1" src={anhtiemchung2}  width={300}  alt="anhtiemchung1" />
						</a>
					</div>
					<div class="col-3">
					<a class="product-item" href="cart.html">
								<img className="anhtiemchung1" src={anhtiemchung3}  width={300}  alt="anhtiemchung1" />
						</a>
					</div>
					<div class="col-3">
					<a class="product-item" href="cart.html">
								<img className="anhtiemchung1" src={anhtiemchung1}  width={300}  alt="anhtiemchung1" />
						</a>
					</div>
					
				
					

				</div>
			</div>
		</div>
      
        <div className="popular-product">
				<div className="container">
					<h1>Một số loại vaccine tiêu biểu</h1>
					<div className="row middle">

						<div className="col-4 ">
								<div className="pt-4">
									<h3>Vaccine Viêm Gan B</h3>
									<p>Viêm gan B là một bệnh viêm gan do virus viêm gan B (HBV) gây ra. Vaccine Viêm Gan B được sử dụng để bảo vệ cơ thể khỏi nhiễm virus HBV và phòng ngừa viêm gan B. Viêm gan B có thể gây ra viêm gan cấp tính hoặc viêm gan mãn tính, và trong một số trường hợp nghiêm trọng, nó có thể dẫn đến xơ gan hoặc ung thư gan. Vaccine Viêm Gan B thường được đưa cho trẻ em và người lớn để tạo ra miễn dịch chống lại virus HBV</p>
									<a className="product-item" href="#">
										<img className="anhtiemchung1" src={viemganB}  width={300}  alt="anhtiemchung1" />
									</a>

								</div>
						</div>
						<div className="col-4">
								<div className="pt-4">
									<h3>Vaccin Ho Gà</h3>
									<p>Vaccin ho gà (hay còn được gọi là vaccin Bordetella pertussis) là một loại vaccin được sử dụng để phòng ngừa bệnh ho gà, một bệnh lây nhiễm do vi khuẩn Bordetella pertussis gây ra. Bệnh ho gà thường gây ra các cơn ho dữ dội và kéo dài, đặc biệt nguy hiểm đối với trẻ nhỏ và người già. Vaccin ho gà thường được đưa cho trẻ em trong kế hoạch tiêm chủng cơ bản và cũng có thể được khuyến nghị cho người lớn để tăng cường miễn dịch chống lại vi khuẩn gây bệnh</p>
									<a className="product-item" href="#">
								<img className="anhtiemchung1" src={uonvan}  width={300}  alt="anhtiemchung1" />
						</a>
								</div>
						</div>
						<div className="col-4">
								<div className="pt-4">
									<h3>Vaccine Uốn Ván</h3>
									<p>Vaccine uốn ván (hay còn được gọi là vaccin uốn ván) là một loại vaccin được sử dụng để phòng ngừa bệnh uốn ván, một bệnh truyền nhiễm do virus uốn ván gây ra. Bệnh uốn ván tác động đến hệ thần kinh và có thể gây ra các triệu chứng như co giật, cơ bắp co cứng, và thậm chí gây tử vong. Vaccin uốn ván thường được đưa cho trẻ em trong kế hoạch tiêm chủng cơ bản để phòng ngừa bệnh uốn ván và tạo ra miễn dịch chống lại virus uốn ván.</p>
									<a className="product-item" href="#	">
								<img className="anhtiemchung1" src={hoga}  width={300}  alt="anhtiemchung1" />
						</a>
								</div>
						</div>
						
					</div>
				</div>
			
		</div>
        
       
        </>
      
        
    );
};
export default memo(HomePage);