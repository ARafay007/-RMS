import { Input, Form } from 'antd';

export const InputField = ({inputFieldProps}) => {

  return (
    inputFieldProps.map(({formItemProps, inputProps}, index) => {
      return(
        <Form.Item key={formItemProps.name + index} {...formItemProps}>
          <Input {...inputProps} />
        </Form.Item>
      )
    })
  );
}