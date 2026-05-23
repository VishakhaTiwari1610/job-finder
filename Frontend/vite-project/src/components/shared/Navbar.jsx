import React from "react"
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./button";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "\./popover"
import {
    Avatar, AvatarFallback, AvatarImage,
} from "./avatar"
import { User, LogOut } from "lucide-react"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const LogoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    return (
        <div className="bg-white">
            <div className="flex items-center justify-between mx-auto max-w-7xl h-16">

                {/* Logo */}
                <h1 className="text-2xl font-bold">
                    Job<span className="text-[#F83002]">Portal</span>
                </h1>
                {/* Right Section */}
                <div className="flex items-center gap-12">
                    <ul className="flex font-medium items-center gap-5">
                        {
                            user && user.role == 'recruiter' ? (
                                <>
                                    <li><Link to="/admin/companies">Companies</Link></li>
                                    <li><Link to="/admin/jobs">Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/jobs">Jobs</Link></li>
                                    <li><Link to="/browse">Browse</Link></li>
                                </>
                            )
                        }


                    </ul>
                    {
                        !user ? (
                            <div className="flex items-center  gap-3">
                                <Link to="/login"><Button variant="outline"> Login </Button></Link>
                                <Link to="./signup">
                                    <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]"> Signup </Button></Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className="cursor-pointer">
                                        <AvatarImage
                                            src={user?.profile?.profilePhoto}
                                            alt="@shadcn"
                                        />

                                    </Avatar>
                                </PopoverTrigger>

                                <PopoverContent className=''>
                                    <div className="flex gap-4 space-y-2">
                                        <Avatar className="cursor-pointer">
                                            <AvatarImage
                                                src={user?.profile?.profilePhoto}
                                                alt="@shadcn"
                                            />
                                        </Avatar>
                                        <div>
                                            <h4 className='font-medium'>{user?.fullname}</h4>
                                            <p className="text-sm text-muted-foreground">{user?.profile?.bio}</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col my-2  gap-3 text-gray-600'>
                                        {
                                            user && user.role == 'student' && (
                                                <div className='flex w-fit item-center gap-2 cursor-pointer'>
                                                    <User />  <Button variant="link"
                                                        className="p-0 h-auto border-none shadow-none focus-visible:ring-0"><Link to="/profile">View Profile</Link></Button>
                                                </div>
                                            )
                                        }

                                        <div className='flex w-fit item-center gap-2 cursor-pointer'>
                                            <LogOut />
                                            <Button
                                                onClick={LogoutHandler} variant="link"
                                                className="p-0 h-auto border-none shadow-none focus-visible:ring-0">Logout</Button>
                                        </div>


                                    </div>
                                </PopoverContent>
                            </Popover>
                        )
                    }


                </div>
            </div>
        </div>
    )
}

export default Navbar