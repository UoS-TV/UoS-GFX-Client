import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// import DynamicForm from "./DynamicForm.js";
import RundownColumn from "./RundownColumn.js";
import CustomColumn from "./CustomColumn.js";

function MainSection() {
  return (
    <Container>
      <Row>
        <Col sm={6}>
          <RundownColumn />
        </Col>
        <Col sm={6}>
          {/* <DynamicForm /> */}
          <CustomColumn />
        </Col>
      </Row>
    </Container>
  );
}

export default MainSection;
