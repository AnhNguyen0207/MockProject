import {PlusOutlined, UploadOutlined,ArrowLeftOutlined} from "@ant-design/icons";
import React, {useState} from "react";
import {Modal, Space, Upload, UploadProps,message} from "antd";
import ToastCustom from "../features/toast/Toast";
import axios from "axios";
import Button from '../UI/Button';

type Props = {
    reload: () => void
}
const ImportExcel = ({reload} :Props) =>{
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [inputKey,setInputKey] = useState(1);

    const changeInputKey = () =>{
        setInputKey(curr => curr +1)
    }

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        changeInputKey()
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        changeInputKey()
    };
    const [file,setFile] = useState<any>('')

    const handleFile= (e: any)=> {
        let file = e.target.files[0]
        setFile(file)
    }

    const handleUpload = () =>{
        let formData = new FormData();
        formData.append('file', file);
        formData.append('name', file.name);
        axios({
            url :'http://localhost:8080/api/suppliers/upload',
            method :'POST',
            data : formData
        }).then((res)=>{
            ToastCustom.fire({
                icon: 'success',
                title: 'Upload file thành công'
            }).then()
            reload()
        }).catch(ex =>{
            ToastCustom.fire({
                icon: 'error',
                title: "Upload file thất bại",
            }).then()
        })

    }

    return(
        <div>
            <Button onClick={showModal} style={{width: "120px", fontSize: '14px'}} type="primary">
                <Space>
                    <UploadOutlined />
                    Nhập excel
                </Space>
            </Button>

            <Modal
                title="Nhập dữ liệu nhà cung cấp"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                   <div style={{display:"flex",gap:10}}>
                       <Button  key="back" onClick={handleCancel}>
                           Thoát
                       </Button>
                       <div>
                           <Button type='primary'  key="back" onClick={handleUpload}>
                               Nhập File
                           </Button>
                       </div>
                   </div>
                ]}
            >
                <p>Chú ý:</p>
                <p>- Mã nhà cung cấp phải là duy nhất đối với các nhà cung cấp </p>
                <p>- SĐT nhà cung cấp phải là duy nhất đối với các nhà cung cấp </p>
                <p>- Email nhà cung cấp phải là duy nhất đối với các nhà cung cấp </p>
                <input key={inputKey} type="file" onChange={handleFile}/>
            </Modal>
        </div>
    )
}
export default ImportExcel