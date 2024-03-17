import React, { memo } from "react";
import { Link } from "react-router-dom";
import { AiOutlineFacebook, AiOutlineInstagram, AiOutlineLinkedin } from "react-icons/ai";

import "./style.scss";

import "bootstrap/dist/css/bootstrap.min.css"; // Đường dẫn CSS của Bootstrap
import "bootstrap/dist/js/bootstrap.min.js"; // Đường dẫn JavaScript của Bootstrap
import "jquery/dist/jquery.min.js"; // Đường dẫn JavaScript của jQuery
const Footer = () => {
    return (
      <section id="footer">
        <div className="container">
          <div className="row text-center text-xs-center text-sm-left text-md-left">
            <div className="col-xs-12 col-sm-4 col-md-4">
              <h5> Liên Hệ</h5>
              <ul className="list-unstyled quick-links">
                <li><a href=""><i className="fa fa-angle-double-right"></i>Home</a></li>
                <li><a href=""><i className="fa fa-angle-double-right"></i>About</a></li>
                <li><a href=""><i className="fa fa-angle-double-right"></i>FAQ</a></li>
                <li><a href=""><i className="fa fa-angle-double-right"></i>Get Started</a></li>
                <li><a href=""><i className="fa fa-angle-double-right"></i>Videos</a></li>
              </ul>
            </div>
            <div className="col-xs-12 col-sm-4 col-md-4">
              <h5>Hỗ Trợ</h5>
              <ul className="list-unstyled quick-links">
                <li><a href=""><i className="fa fa-angle-double-right"></i>Home</a></li>
                <li><a href=""><i className="fa fa-angle-double-right"></i>About</a></li>
                <li><a href=""><i className="fa fa-angle-double-right"></i>FAQ</a></li>
                <li><a href=""><i className="fa fa-angle-double-right"></i>Get Started</a></li>
                <li><a href=""><i className="fa fa-angle-double-right"></i>Videos</a></li>
              </ul>
            </div>
            <div className="col-xs-12 col-sm-4 col-md-4">
              <h5>Tin Tức</h5>
              <ul className="list-unstyled quick-links">
                <li><a href=""><i className="fa fa-angle-double-right"></i>Home</a></li>
                <li><a href=""><i className="fa fa-angle-double-right"></i>About</a></li>
                <li><a href=""><i className="fa fa-angle-double-right"></i>FAQ</a></li>
                <li><a href=""><i className="fa fa-angle-double-right"></i>Get Started</a></li>
                <li><a href="" title="Design and developed by"><i className="fa fa-angle-double-right"></i>Imprint</a></li>
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-5">
              <ul className="list-unstyled list-inline social text-center">
                <li className="list-inline-item"><a href=""><i className="fa fa-facebook"></i></a></li>
                <li className="list-inline-item"><a href=""><i className="fa fa-twitter"></i></a></li>
                <li className="list-inline-item"><a href=""><i className="fa fa-instagram"></i></a></li>
                <li className="list-inline-item"><a href=""><i className="fa fa-google-plus"></i></a></li>
                <li className="list-inline-item"><a href="" target="_blank"><i className="fa fa-envelope"></i></a></li>
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-2 text-center text-white">
              <p><u><a href="">National Transaction Corporation</a></u> is a Registered MSP/ISO of Elavon, Inc. Georgia [a wholly owned subsidiary of U.S. Bancorp, Minneapolis, MN]</p>
              <p className="h6">© All right Reversed.<a className="text-green ml-2" href="" target="_blank">Sunlimetech</a></p>
              <p className="h6">© All right Reversed.<a className="text-green ml-2" href="" target="_blank">Sunlimetech</a></p>

            </div>
          </div>
        </div>
      </section>
    );
  };
  
  export default memo(Footer);