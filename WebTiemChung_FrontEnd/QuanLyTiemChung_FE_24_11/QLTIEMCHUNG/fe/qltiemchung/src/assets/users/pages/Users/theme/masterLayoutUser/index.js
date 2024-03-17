import { Profiler, memo } from "react";
import FooterUser from "../footerUser";
import HeaderUser from "../headerUser";
import HomePage from "../../homePageUsers";

const MasterLayoutUsers = ({children,...props}) => { 

    return (

        <div {...props}>
            <HeaderUser /> 
            {children}   
            <FooterUser />
        </div>

    );
};
export default memo(MasterLayoutUsers);