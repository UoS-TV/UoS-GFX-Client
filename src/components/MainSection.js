import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import Button from "react-bootstrap/Button";
// import ButtonGroup from "react-bootstrap/ButtonGroup";

// import ItemTemplate from "./ItemTemplate";
import DynamicForm from "./DynamicForm.js";
import RundownColumn from "./RundownColumn.js";

function MainSection() {
  return (
    <Container>
      <Row>
        <Col sm={6}>
          <RundownColumn />
          {/* <div>
      <ItemTemplate/>
      </div>
<div className="d-flex justify-content-between">
      <ButtonGroup className="">
          <Button variant="outline-success">Add Template Item</Button>
          <Button variant="outline-success">Add Scorebug Item</Button>
        </ButtonGroup>
      </div> */}
        </Col>
        <Col sm={6}>
        <DynamicForm />
        </Col>
      </Row>
    </Container>
  );
}

export default MainSection;
