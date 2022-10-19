import { PlusOutlined, LoadingOutlined,EyeOutlined } from '@ant-design/icons';
import { Delete, PreviewOutlined } from '@mui/icons-material';
import { Button, Modal, Upload } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import axios, { Axios } from 'axios';
import React, { useState } from 'react';
import * as Antd from 'antd'
const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });

interface ISelectImage {
  imageUrl: string | undefined,
  setUrl: Function,
}
const ImageUpload = (props: ISelectImage) => {

  const { imageUrl, setUrl } = { ...props }
  const handleCancel = () => setUrl(null);
  const [loading, setLoading] = useState(false)

  const [previewVisible, setPreviewVisible] = useState(false)
  const handleChange = (files: any) => {
    setLoading(true)
    console.log(files[0])
    const formData = new FormData();
    formData.append('file', files[0])
    formData.append('upload_preset', "dorrjlrc")
    axios.post('http://api.cloudinary.com/v1_1/dbcjky0pz/image/upload', formData).then((res) => {
      setUrl(res.data.secure_url)
      setLoading(false)
    })

  }

  const UploadBtn = () => (
    <div style={{ width: '100%' ,height:'100%', border: '1px dotted black', display: "flex", padding: 50, justifyContent: "center" }}>
      {loading ? <Antd.Spin spinning={true}></Antd.Spin>: <PlusOutlined />}
    </div>
  );
  return (
    <>

      {imageUrl ?
        <div style={{ width: '100%', height: '100%' }}>
          {/* <img alt="example" style={{ width: '100%', height: '100%' }} src={imageUrl} onClick={() => setPreviewVisible(true)} /> */}
          <Antd.Image
            width={'100%'}
            src={imageUrl}
            preview={
              {
               
                mask:<>
                <Button type={'text'} icon={<EyeOutlined style={{ color: "white"}} />} onClick={()=>setPreviewVisible(true)}></Button>
                <Button type={'text'} icon={<Delete color='error' />} onClick={handleCancel}> </Button>
                </>

              }
            }
          />
         
        </div>

        :
        <div style={{ width: '100%', height: '100%' }}>
          <label htmlFor='photo'><UploadBtn /></label>
          <input hidden id="photo" type={'file'} onChange={(e) => { handleChange(e.target.files) }}>
          </input>

        </div>

      }
    </>
  );
};

export default ImageUpload;