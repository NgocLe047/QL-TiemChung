import { Profiler, memo } from "react";
import HeaderNhanVien from "../headerNhanVien";
import FooterNhanVien from "../footerNhanVien";

const MasterLayoutNhanVien = ({children,...props}) => { 

    return (

        <div {...props}>
            <HeaderNhanVien /> 
            {children}   
            <FooterNhanVien />
        </div>

    );
};
export default memo(MasterLayoutNhanVien);