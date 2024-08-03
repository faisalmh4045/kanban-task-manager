import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar, Topbar, TaskModal } from "./index";
import appwriteDbService from "../appwrite/database";
import { useDispatch, useSelector } from "react-redux";
import { setTodos } from "../redux/todoSlice";
import { closeModal } from "../redux/modalSlice";

const Layout = () => {
    const isopen = useSelector((state) => state.sidebar.isOpen);
    const { userId } = useSelector((state) => state.auth.userSession);
    const isModalOpen = useSelector((state) => state.modal.isOpen);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchAllTodos = async () => {
            try {
                const todos = await appwriteDbService.getTodos(userId);
                dispatch(setTodos(todos.documents));
            } catch (error) {
                console.error("Layout :: Error fetching data:", error);
            }
        };

        fetchAllTodos();
    }, [dispatch, userId]);

    return (
        <>
            <Sidebar />
            <main
                className={`${
                    isopen ? "expanded-sidebar" : ""
                } main-container position-absolute top-0 end-0 min-vh-100 pt-2`}
            >
                <Topbar />
                <TaskModal
                    show={isModalOpen}
                    onHide={() => dispatch(closeModal())}
                />
                <Outlet />
            </main>
        </>
    );
};

export default Layout;
