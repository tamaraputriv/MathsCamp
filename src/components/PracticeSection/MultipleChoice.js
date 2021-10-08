import React from "react";
import { Container, Row, Form, Col, Button } from "react-bootstrap";

export default function MultipleChoice() {
  return (
    <Container fluid>
      <Row>
        <Col>
          <Form>
            <fieldset>
              <Form.Group as={Row} className="mb-3">
                <Col sm={10}>
                  {["option"].map((option) => (
                    <div key={`${option}`} className="mb-3">
                      <Form.Check
                        type="radio"
                        label={`${option}`}
                        name="formHorizontalRadios"
                        id="option1"
                      />
                      <Form.Check
                        type="radio"
                        label={`${option}`}
                        name="formHorizontalRadios"
                        id="option2"
                      />
                      <Form.Check
                        type="radio"
                        label={`${option}`}
                        name="formHorizontalRadios"
                        id="option3"
                      />
                      <Form.Check
                        type="radio"
                        label={`${option}`}
                        name="formHorizontalRadios"
                        id="option4"
                      />
                    </div>
                  ))}
                </Col>
              </Form.Group>
            </fieldset>
            <Form.Group as={Row} className="mb-3">
              <Col sm={{ span: 10, offset: 2 }}>
                <Button type="submit">Submit</Button>
              </Col>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
