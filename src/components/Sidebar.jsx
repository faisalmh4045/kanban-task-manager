import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import appwriteDbService from "../appwrite/database";
import { Button } from "react-bootstrap";
import { closeSidebar } from "../redux/sidebarSlice";
import { PiAlignTopLight } from "react-icons/pi";
import { GoHome } from "react-icons/go";
import { BsListTask } from "react-icons/bs";
import { TbProgress } from "react-icons/tb";
import { GrRedo } from "react-icons/gr";
import { MdOutlineTaskAlt } from "react-icons/md";
import { BiUser } from "react-icons/bi";
import { NavItem, SignOutButton } from "../components";

const Sidebar = () => {
    const { name, email, prefs } = useSelector(
        (state) => state.auth.userSession
    );
    const isopen = useSelector((state) => state.sidebar.isOpen);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [previewUrl, setPreviewUrl] = useState("");

    useEffect(() => {
        if (prefs.avatar) {
            const avatarUrl = appwriteDbService.getAvatarPreview(prefs.avatar);
            if (avatarUrl) {
                setPreviewUrl(avatarUrl);
            }
        } else {
            setPreviewUrl("/default-avatar.png");
        }
    }, [prefs.avatar]);

    const iconSize = 22;

    const navItems = [
        {
            name: "Boards",
            path: "/board",
            icon: <PiAlignTopLight size={iconSize} />,
        },
        {
            name: "All Tasks",
            path: "/all-tasks",
            icon: <GoHome size={iconSize} />,
        },
        {
            name: "Todos",
            path: "/todos",
            icon: <BsListTask size={iconSize} />,
        },
        {
            name: "Doing",
            path: "/doing",
            icon: <TbProgress size={iconSize} />,
        },
        {
            name: "Need Review",
            path: "/review",
            icon: <GrRedo size={iconSize} />,
        },
        {
            name: "Completed",
            path: "/completed",
            icon: <MdOutlineTaskAlt size={iconSize} />,
        },
    ];

    return (
        <>
            <section
                className={`${
                    isopen ? "sidebar-expand" : "sidebar-collapse"
                } sidebar d-flex flex-column justify-content-between 
                position-fixed top-0 start-0 bg-white z-3 p-3 overflow-auto border-end`}
            >
                <div>
                    <div className="d-flex align-items-center p-2 rounded mb-5">
                        <div className="w-25 ratio ratio-1x1">
                            <img
                                className="p-1 rounded-circle"
                                src={previewUrl}
                                alt="profile picture"
                            />
                        </div>
                        <div>
                            <span className="ms-2 fs-5">{name}</span>
                            <br />
                            <small className="ms-2 text-body-secondary">
                                {email}
                            </small>
                        </div>
                    </div>

                    <ul className="list-unstyled">
                        {navItems.map((item, id) => (
                            <NavItem key={id} item={item} />
                        ))}
                    </ul>
                </div>

                <div>
                    <div className="ms-3 mb-2">
                        <Button
                            className="d-flex align-items-center profile-action-btn"
                            variant="secondary"
                            size="sm"
                            onClick={() => navigate("/profile")}
                        >
                            <BiUser size={17} />
                            <span className="ms-1">Manage Profile</span>
                        </Button>
                    </div>

                    <div className="ms-3 mb-3">
                        <SignOutButton />
                    </div>
                </div>
            </section>
            <div
                className={`z-3 ${isopen ? "sidebar-close-overlay" : ""}`}
                onClick={() => dispatch(closeSidebar())}
            ></div>
        </>
    );
};

export default Sidebar;
