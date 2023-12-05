import { useReducer, useEffect } from "react";
import { Input, Button } from '../index';

const initialState = [];

const statesReducer = (state=initialState, {type, payload}) => {
  switch(type){
    case 'NEW_STATE':
    return [...state, ]; 
  }
}

const pickField = (component, componentProps) => {
  switch(component){
    case 'Input':
      return <Input label={componentProps.label} key={Math.random().toString(36).slice(2)} inputProps={componentProps.props} />;
    case 'Button':
      return <Button text={componentProps.text} buttonProps={componentProps.props} />;
  }
}

export const Form = ({fomrItems=[]}) => {
  const [states, dispatch] = useReducer(statesReducer, initialState);

  const setStates = (state) => (e) => {
    console.log(state, e?.target?.value || '');
  };

  const testArrayObj = [
    {
      name: 'name',
      component: 'Input',
      componentProps: {
        label: 'Name',
        props: {
          type: 'number',
          placeholder: 'Enter your name',
          onChange: setStates('name'),
        }
      }
    },
    {
      name: 'fName',
      component: 'Input',
      componentProps: {
        label: 'Father Name',
        props: {
          placeholder: 'Enter father name',
          onChange: setStates('fName'),
        }
      }
    }
  ];

  useEffect(() => {
    testArrayObj.forEach(el => {
      if(el?.componentProps?.props?.type === 'number'){
        setStates(el.name)(0);
      }
      else setStates(el.name)('');
    })
  }, []);

  const renderFields = () =>{
    const ary = testArrayObj.map(el => pickField(el.component, el.componentProps));
    return ary;
  };

  return (
    <form>
      {renderFields()}
    </form>
  );
};

// Form.defaultProps = {
//   props: 'returned Prop'
// };

// export {Form};