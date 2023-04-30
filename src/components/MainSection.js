import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import RundownColumn from "./RundownColumn.js";
import CustomColumn from "./CustomColumn.js";

function MainSection() {
  return (
    <Container>
      
      <Row>
        {/* <Col sm={6}>
          <h4>Rundown Creator Integration</h4>
          <RundownColumn />
        </Col>
        <Col sm={6}> */}
          {/* <h4>Custom GFX Rundown</h4> */}
          <CustomColumn />
        {/* </Col> */}
      </Row>
    </Container>
  );
}

export default MainSection;
