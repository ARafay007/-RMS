'use client'
import { useReducer, useState } from "react";
import { Typography, Row, Col, Form, Upload, Button, Input, InputNumber, message, Alert } from "antd";
import { InputField } from "@/components/input";
import { Btn } from "@/components/button";
import styles from './page.module.css';
import { ownerRoutes } from "@/constants/API_Routes";

const initialItem = [
  {
    key:1,
    itemName: '',
    price: 0,
    img: '',
    fileSizeError: '',
  }
]

const reducer = (state, {type, value}) => {
  switch(type){
    case 'ADD':
      return [...state, value];
    case 'SET_ITEM':
      return state.map(el => {
        if(el.key === value.id){
          el[value.key] = value.value
          return el;
        }
        return el;
      });
    case 'DELETE':
      return state.filter(el => el.key !== value);
  }
};

export default function(){
  const {Title} = Typography;
  const [items, dispatch] = useReducer(reducer, initialItem);
  let [itemCount, setItemCount] = useState(2);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const categoryFieldProps = [
    {
      formItemProps: {
        label: 'Category',
        name: 'category',
        rules: [{required: true, message: 'Category is required.'}]
      },
      inputProps: {
        placeholder: 'Category'
      }
    }
  ];

  const addItems = () => {
    setItemCount(itemCount+1);
    dispatch({
      type: 'ADD', 
      value: {
        key: itemCount,
        itemName: '',
        price: 0,
        img: '',
      }
    });
  };

  const setItemNamePriceAndImg = (id, objKey, event, file) => {
    if(file && (file.size / (1024**2).toFixed(2)) > 5){
      dispatch({
        type: 'SET_ITEM',
        value: {
          id,
          key: 'fileSizeError',
          value: 'File size is above 5 MB'
        }
      });
      return;
    }
    else if(file && (file.size / (1024**2).toFixed(2)) < 5){
      dispatch({
        type: 'SET_ITEM',
        value: {
          id,
          key: 'fileSizeError',
          value: '',
        }
      });
    }


    dispatch({
      type: 'SET_ITEM',
      value: {
        id,
        key: objKey,
        value: event ? event.target.value : file
      }
    });
  }

  const removeItem = (id) => {
    if(items.length > 1){
      dispatch({
        type: 'DELETE',
        value: id
      });
    }
  }

  const onHandleSubmit = async (values) => {
    // THis loop will check and return from the function if any dish item has missing img or any img is above 5MB
    for(let i = 0; i < items.length; i++){
      if(items[i].fileSizeError){
        messageApi.open({
          type: 'error',
          content: 'File size can not be above 5 MB'
        });
        return;
      }
      else if(!items[i].img){
        messageApi.open({
          type: 'error',
          content: 'Images are required'
        });
        return;
      }
    }

    // This loop will upload imgs one by one to the cloudinary and the
    for(let i=0; i<items.length; i++){
      const uploadImgData = new FormData();
      uploadImgData.append('file', items[i].img);
      uploadImgData.append('upload_preset', 'ekriiut7');
      uploadImgData.append('cloud_name', 'doqn4ut3j');

      const resp = await fetch('https://api.cloudinary.com/v1_1/doqn4ut3j/upload', {
        method: 'POST',
        body: uploadImgData,
      });
      const data = await resp.json();
      items[i].img = data.public_id;
    }

    const token = JSON.parse(localStorage.getItem('token'));
    const ownerId = JSON.parse(localStorage.getItem('user')).id;

    const body = {
      category: values.category,
      items: items.map(el => ({
        item: el.itemName,
        price: el.price,
        img: el.img,
        isActive: true,
      }))
    };

    const resp = await fetch(`${ownerRoutes}/addMenu/${ownerId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'Application/json',
        'authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body),
    });

    const data = await resp.json();
    console.log(data);
  }

  const addNewItemBtnProps = {
    children: 'Add New Item',
    onClick: addItems
  };

  const renderBoxes = () => {
    return items.map(el => (
        <div className={styles.items} key={`div${el.key}`}>
          <Form.Item label='Item' name={`item${el.key}`} rules={[{required: true, message: 'This field can not be empty'}]}>
            <Input placeholder='Item name' onChange={(e) => setItemNamePriceAndImg(el.key, 'itemName', e)} />
          </Form.Item>
          <Form.Item label='Price' name={`price${el.key}`} rules={[{required: true, message: 'This field can not be empty'}]}>
            <Input type='number' placeholder='Price' onChange={(e) => setItemNamePriceAndImg(el.key, 'price', e)} />
          </Form.Item>
          <Upload
            listType="picture"
            maxCount={1}
            howUploadList={false}
            customRequest={async ({ file, onSuccess }) => {    
              setTimeout(() => {
                 onSuccess("ok");
              }, 0);
            }}
            beforeUpload={(file) => setItemNamePriceAndImg(el.key,'img', '', file)}
          >
            <Button>Upload Dish Image</Button>
          </Upload>
          {el.fileSizeError && <Alert message={`${el.fileSizeError}`} type='error' />}
          <Button type='primary' danger='danger' onClick={()=>removeItem(el.key)}>Remove Item</Button>
        </div>
      )
    );
  }

  return (
    <>
      {contextHolder}
      <Title level={2}>Add New Categoy</Title>
      <Form form={form} onFinish={onHandleSubmit} >
        <Row>
          <Col span={6}>
            <InputField inputFieldProps={categoryFieldProps} />
          </Col>
          <Col span={6}>
            <Button htmlType="submit">Add Category</Button>
          </Col>
        </Row>
        <div className={styles.addNewCategory_flexbox}>
          {renderBoxes()}
          {
            items.length !== 5 &&
            <div className={styles.items} key='addNewBtn'>
              <Btn buttonProps={addNewItemBtnProps} />
            </div>
          }
          </div>
      </Form>
    </>
  );
}