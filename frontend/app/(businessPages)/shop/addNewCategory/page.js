'use client'
import {useState, useRef} from 'react';
import { Typography, Row, Col, Form, Button } from "antd";
import { useDispatch } from "react-redux";
import { InputField } from "@/components/input";
import { AddNewItem } from '@/container/addNewItem';

export default function(){
  const {Title} = Typography;
  const [form] = Form.useForm();
  const [items, setItems] = useState([]);
  const dispatch = useDispatch();
  const childRef = useRef();

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

  const getItems = (items) => setItems(items);

  const onHandleSubmit = (values) => {
    const apiRoute = 'addMenu';

    const body = {
      category: values.category,
      items: items.map(el => ({
        item: el.itemName,
        price: el.price,
        img: el.img,
        isActive: true,
      }))
    };

    childRef.current.onHandleSubmit(apiRoute, body, form);
  };

  return (
    <>
      {/* {contextHolder} */}
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
        {<AddNewItem ref={childRef} getItems={getItems} />}
      </Form>
    </>
  );
}