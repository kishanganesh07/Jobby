import { Link } from "react-router-dom"
const PageNotFound=()=>{
    return(
        <div className="min-h-screen bg-black flex flex-col items-center pt-30 ">
            <img src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png" className="h-[350px] w-[300px] pb-10"/>
            <div>
                <h1 className="text-white pb-5 text-[15px] font-bold">Page Not Found</h1>
                <Link to="/">
                 <button className="cursor-pointer bg-[#337ab7] h-[50px] w-[120px] text-[14px]  rounded-lg ">Go To Home</button>
                 </Link>
            </div>
           
        </div>
    )
}
export default PageNotFound