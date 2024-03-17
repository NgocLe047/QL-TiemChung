import { Profiler, memo } from "react";
import Footer from "../footer";
import Header from "../header";
import HomePage from "../../homePage";

const MasterLayout = ({children,...props}) => { 

    return (

        <div {...props}>
            <Header /> 
            {children}   
            <Footer />
        </div>

    );
};
export default memo(MasterLayout);