import { useReducer, useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { useDispatch } from "react-redux";
import { Form, Upload, Button, Input, Alert, message } from "antd";
import { ownerRoutes } from "@/constants/API_Routes";
import { updateMenu } from "@/redux/states/loggedInUser";
import styles from './addNewItem.module.css';

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
    case 'RESET_STATE':
      return state = [
        {
          key:1,
          itemName: '',
          price: 0,
          img: '',
          fileSizeError: '',
        }
      ]
  }
};

// forwardRef and useImperativeHandle are used to call child component function from parent component
export const AddNewItem = forwardRef(({getItems}, ref) => {
  const [items, dispatchReducer] = useReducer(reducer, initialItem);
  let [itemCount, setItemCount] = useState(2);
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch();

  useEffect(() => {getItems(items)}, [items]);

  const addItems = () => {
    setItemCount(itemCount+1);
    dispatchReducer({
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
    if(typeof file !== 'string' && file && (file.size / (1024**2).toFixed(2)) > 5){
      dispatchReducer({
        type: 'SET_ITEM',
        value: {
          id,
          key: 'fileSizeError',
          value: 'File size is above 5 MB'
        }
      });
      return;
    }
    else if(typeof file !== 'string' && file && (file.size / (1024**2).toFixed(2)) < 5){
      dispatchReducer({
        type: 'SET_ITEM',
        value: {
          id,
          key: 'fileSizeError',
          value: '',
        }
      });
    }
    // this else if condition is for when user remove image
    else if(file === 'removeImg'){
      dispatchReducer({
        type: 'SET_ITEM',
        value: {
          id,
          key: 'img',
          value: '',
        }
      });
      return;
    }


    dispatchReducer({
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
      dispatchReducer({
        type: 'DELETE',
        value: id
      });
    }
  }

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
            onRemove={() => setItemNamePriceAndImg(el.key, 'img', '',  'removeImg')}
          >
            <Button>Upload Dish Image</Button>
          </Upload>
          {el.fileSizeError && <Alert message={`${el.fileSizeError}`} type='error' />}
          <Button type='primary' danger='danger' onClick={()=>removeItem(el.key)}>Remove Item</Button>
        </div>
      )
    );
  };

  useImperativeHandle(ref, () => ({
    async onHandleSubmit(apiRoute, body, form){

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
  
      // This loop will upload imgs one by one to the cloudinary
      for(let i=0; i<body.items.length; i++){
        const uploadImgData = new FormData();
        uploadImgData.append('file', body.items[i].img);
        uploadImgData.append('upload_preset', 'ekriiut7');
        uploadImgData.append('cloud_name', 'doqn4ut3j');
  
        const resp = await fetch('https://api.cloudinary.com/v1_1/doqn4ut3j/upload', {
          method: 'POST',
          body: uploadImgData,
        });
        const data = await resp.json();
        console.log(data);
        body.items[i].img = data.public_id;
      }

      const token = JSON.parse(localStorage.getItem('token'));
      const ownerId = JSON.parse(localStorage.getItem('user')).id;

      const resp = await fetch(`${ownerRoutes}/${apiRoute}/${ownerId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'Application/json',
          'authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body),
      });
  
      if(resp.status === 400){
        messageApi.open({
          type: 'error',
          content: 'Something went wrong'
        });
        return;
      }
  
      const {data} = await resp.json();
      dispatch(updateMenu(data.menu));
      form.resetFields();
      dispatchReducer({type: 'RESET_STATE'});
    }
  }));

  return(
    <div className={styles.addNewCategory_flexbox}>
      {contextHolder}
      {renderBoxes()}
      {
        items.length !== 5 &&
        <div className={styles.items} key='addNewBtn'>
          <Button onClick={addItems}>Add New Item</Button>
        </div>
      }
      </div>
  );
});