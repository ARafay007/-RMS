import { Col, Divider, Input, Row, Card } from "../components";

export const AddDish = () => {
  

  return (
    <>
      <Divider text='Add New Category' />
      <form>
        <Row>
          <Col>
            <Input label='Category' required={true} inputProps={{placeholder: 'Enter category'}} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <Input inputProps={{placeholder: 'Item name'}} />
            </Card>
          </Col>
        </Row>
      </form>
    </>
  );
};