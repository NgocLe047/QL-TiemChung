import { Profiler, memo } from "react";

import HeaderAdmin from "../headerAdmin";
import FooterAdmin from "../footerAdmin";

const MasterLayoutAdmin = ({children,...props}) => { 

    return (

        <div {...props}>
            <HeaderAdmin /> 
            {children}   
            <FooterAdmin />
        </div>

    );
};
export default memo(MasterLayoutAdmin);