import SimpleButton from "../../UI/SimpleButton";
import MyDialog from "../../UI/MyDialog";
import UserForm from "./UserForm";
import React, { useState } from "react"



const UserInfo: React.FC = () => {

    const [openModal, setOpenModal] = useState<boolean>(false);

    const closeModal = () => {
        setOpenModal(false);
    };

    return(
        <div className="user-info">
            <SimpleButton  
                fn={() => {}}
                text="Log In" 
                variant="contained" 
                size="small"
                color="info"
                />
            <SimpleButton  
                fn={() => setOpenModal(true)}
                text="Register" 
                variant="contained" 
                size="small"
                color="info"
            />
            <MyDialog open={openModal} handleClose={closeModal}>
                <UserForm></UserForm>
            </MyDialog>
        </div>
    )
};

export default UserInfo;