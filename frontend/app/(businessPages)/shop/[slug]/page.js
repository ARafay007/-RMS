'use client'
import {useState, useEffect, useRef} from 'react';
import { CldImage } from 'next-cloudinary';
import { useSelector, useDispatch } from 'react-redux';
import { ownerRoutes, API_status } from "@/constants";
import { Button, Typography, Modal, Form, Divider, Popconfirm, Row, Col, Input, Upload, message } from 'antd';
import { AddNewItem } from '@/container/addNewItem';
import { updateMenu, setStatus } from '@/redux/states/loggedInUser';
import { deleteItem as removeItem, editItem } from '@/redux/actions/owner';
import { Spinner } from '@/components/spinner';
import style from './page.module.css';

export default ({params}) => {
  const { Title } = Typography;
  const user = useSelector(state => state.loggedInUser.value);
  const status = useSelector(state => state.loggedInUser.status);
  const [categoryName, setCategoryName] = useState('');
  const [items, setItems] = useState([]);
  const [menuIndex, setMenuIndex] = useState(null);
  const [newItems, setNewItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalWidth, setModalWidth] = useState(0);
  const [modalContent, setModalContent] = useState(false);
  const [oldImgUrl, setOldImgUrl] = useState();
  const [newImg, setNewImg] = useState();
  const [itemIndex, setItemIndex] = useState();
  const [isLoading, setIsLoading] = useState();
  const dispatch = useDispatch();
  const childRef = useRef();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if(document.body.scrollWidth > 991){
      setModalWidth(1100);
    }
  }, []);

  useEffect(() => {
    if(Object.hasOwn(user, '_id')){
      const category = params.slug.split('%20').join(' ');
      for(let i=0; i<user.menu.length; i++){
        if(user.menu[i].category === category){
            setItems(user.menu[i].items);
            setCategoryName(category);
            setMenuIndex(i);
            break;
         }
      }
    }
  }, [user]);

  const showModal = (isModalContentTypeEdit, item = '', index) => {
    setIsModalOpen(true);
    setModalContent(isModalContentTypeEdit);

    // when user edit any item then 
    if(item){
      setItemIndex(index);
      setOldImgUrl(item.img);
      form.setFieldsValue({
        item: item.item,
        price: item.price,
      });
    }
  };

  const hideModal = () => setIsModalOpen(false);
  
  const getItems = (newAddedItems) => setNewItems(newAddedItems);

  const deleteItem = async (index, item) => {
    dispatch(setStatus(API_status.LOADING));
    const inactiveItem = {...item};
    inactiveItem.isActive = false;
    const body = {
      item: inactiveItem,
      menuIndex,
      itemIndex: index
    }

    removeItem(dispatch, body);
  };

  const addNewItems = () => {
    // setIsLoading(true);
    const apiRoute = 'addMoreItems';

    const body = {
      indexNum: menuIndex,
      items: newItems.map(el => ({
        item: el.itemName,
        price: el.price,
        img: el.img,
        isActive: true,
      }))
    }

    childRef.current.onHandleSubmit(apiRoute, body, form);
    // setIsLoading(false);
  };

  const onSubmitEditItems = async (values) => {
    dispatch(setStatus(API_status.LOADING));
    let img = '';

    if(newImg?.size / (1024**2).toFixed(2) > 5){
      messageApi.open({
        type: 'error',
        content: 'File size can not be above 5 MB'
      });
      return;
    }
    
    if(newImg){
      const formData = new FormData();
      formData.append('file', newImg);
      formData.append('upload_preset', 'ekriiut7');
      formData.append('cloud_name', 'doqn4ut3j');

      const cloudinaryImg = await fetch(`https://api.cloudinary.com/v1_1/doqn4ut3j/upload`, {
        method: 'POST',
        body: formData,
      });      

      if(cloudinaryImg.status >= 400){
        messageApi.open({
          type: 'error',
          content: 'Unable to edit item'
        });
        // setIsLoading(false);
        return;
      }; 

      const data = await cloudinaryImg.json();

      img = data.public_id;
    }

    const body = {
      item: {
        item: values.item,
        price: values.price,
        img: img || oldImgUrl,
        isActive: true
      },
      menuIndex,
      itemIndex
    };

    editItem(dispatch, body);

    form.resetFields();
    setNewImg('');
    setOldImgUrl('');
    setIsModalOpen(false);
  };

  const renderModalContent = () => {
    if(modalContent){
      return (
        <Form form={form} onFinish={addNewItems}>
           <AddNewItem ref={childRef} getItems={getItems} />
           <Divider />
           <Row gutter={16}>
             <Col span={6} offset={20}>
              <Button htmlType='submit'>Add Items</Button>
             </Col>
           </Row>
        </Form>
      );
    }
    else{
      return (
        <Form form={form} onFinish={onSubmitEditItems}>
          <div className={style.items}>
            <Form.Item label='Item' name={`item`} rules={[{required: true, message: 'This field can not be empty'}]}>
              <Input placeholder='Item name' />
            </Form.Item>
            <Form.Item label='Price' name={`price`} rules={[{required: true, message: 'This field can not be empty'}]}>
              <Input type='number' placeholder='Price' />
            </Form.Item>
            <Upload
              accept=".jpg,.png,.jpeg"
              listType="picture"
              maxCount={1}
              howUploadList={false}
              customRequest={async ({ file, onSuccess }) => {    
                setTimeout(() => {
                  onSuccess("ok");
                }, 0);
              }}
              beforeUpload={(file) => setNewImg(file)}
              onRemove={() => setNewImg('')}
            >
              <Button>Upload Dish Image</Button>
            </Upload>
          </div>
          <Row gutter={16}>
             <Col span={6}>
              <Button htmlType='submit'>Edit Items</Button>
             </Col>
           </Row>
        </Form>
      );
    }
  };

  const renderItems = () => {
    return items.map((el, index) => (
      <div className={style.card} key={el.img}>
        <div className={style.imgDiv}>
          <CldImage src={el.img} width="350" height="336" crop="fill" className={style.itemImg} alt={el.item} />
        </div>
        <Title level={5} style={{textAlign: 'center'}}>{el.item}</Title>
        <Title level={5} style={{textAlign: 'center'}}>Rs.{el.price}</Title>
        <p style={{marginBottom: '3px', marginLeft: '2px', marginRight: '2px'}}>
          <Button type="primary" block onClick={() => showModal(false, el, index)}>Edit</Button>
        </p>
        <Popconfirm
          placement="topRight"
          title='Are you sure delete this item ?'
          onConfirm={() => deleteItem(index, el)}
          okText="Yes"
          cancelText="No"
        >
          <p style={{marginLeft: '2px', marginRight: '2px'}}>
            <Button type="primary" danger block style={{backgroundColor: 'rgb(47,47,47)'}}>Delete</Button>
          </p>
        </Popconfirm>
      </div>
    ));
  };

  return(
    <>
     {contextHolder}
      <Title level={1}>{categoryName}</Title>
      <Button onClick={() => showModal(true)}>Add New Item</Button>
      <div className={style.flex}>
        {renderItems()}
      </div>
      <Modal title={modalContent ? 'Add Item' : 'Edit Item'} open={isModalOpen} onCancel={hideModal} okButtonProps={{ style: { display: 'none' } }} width={modalWidth}>
        {renderModalContent()}
      </Modal>
      {/* {isLoading && <Spinner />} */}
      {status === 'loading' && <Spinner />}
    </>
  );
}