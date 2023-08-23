'use client'
import {useState, useEffect, useRef} from 'react';
import { CldImage } from 'next-cloudinary';
import { useSelector } from 'react-redux';
import { ownerRoutes } from "@/constants/API_Routes";
import { Button, Typography, Modal, Form, Divider, Popconfirm } from 'antd';
import { AddNewItem } from '@/container/addNewItem';
import style from './page.module.css';

export default ({params}) => {
  const { Title } = Typography;
  const user = useSelector(state => state.loggedInUser.value);
  const [categoryName, setCategoryName] = useState('');
  const [items, setItems] = useState([]);
  const [menuIndex, setMenuIndex] = useState(null);
  const [newItems, setNewItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalWidth, setModalWidth] = useState(0);
  const childRef = useRef();
  const [form] = Form.useForm();
  const [editCardAnimation, setEditCardAnimation] = useState(false);

  useEffect(() => {
    if(document.body.scrollWidth > 991){
      setModalWidth(1100);
    }
  }, []);

  useEffect(() => {
    if(Object.hasOwn(user, '_id')){
      const category = params.slug.split('%20').join(' ');
      let menu = {};
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

  const showModal = () => setIsModalOpen(true);
  const hideModal = () => setIsModalOpen(false);
  
  const getItems = (newAddedItems) => setNewItems(newAddedItems);

  const renderItems = () => {
    return items.map(el => (
      <div className={style.card} key={el.img} onMouseOver={() => {setEditCardAnimation(true)}} onMouseLeave={() => {setEditCardAnimation(false)}}>
        <div className={style.imgDiv}>
          <CldImage src={el.img} width="350" height="336" crop="fill" className={style.itemImg} alt={el.item} />
        </div>
        <Title level={5} style={{textAlign: 'center'}}>{el.item}</Title>
        <Title level={5} style={{textAlign: 'center'}}>Rs.{el.price}</Title>
        <p style={{marginBottom: '3px', marginLeft: '2px', marginRight: '2px'}}><Button type="primary" block>Edit</Button></p>
        <Popconfirm
          placement="topRight"
          title='Are you sure delete this item ?'
          // onConfirm={confirm}
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

  const addNewItems = () => {
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
  };

  return(
    <>
      <Title level={1}>{categoryName}</Title>
      <Button onClick={showModal}>Add New Item</Button>
      <div className={style.flex}>
        {renderItems()}
      </div>
      <Modal open={isModalOpen} onCancel={hideModal} okButtonProps={{ style: { display: 'none' } }} width={modalWidth}>
        <Form form={form} onFinish={addNewItems}>
           <AddNewItem ref={childRef} getItems={getItems} />
           <Divider />
           <Button htmlType='submit'>Add Items</Button>
        </Form>
      </Modal>
    </>
  );
}