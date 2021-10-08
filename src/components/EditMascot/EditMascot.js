import React from "react";
import {Card, Button, Container, Row, Col} from "react-bootstrap";
import { Gem, ChevronLeft } from "react-bootstrap-icons";
import { useHistory } from "react-router";
import "./EditMascot.css";
import Mascot1 from "../../images/Mascots/mascot1.png";
import Mascot2 from "../../images/Mascots/mascot3.png";
import Mascot3 from "../../images/Mascots/mascot4.png";
import Mascot4 from "../../images/Mascots/mascot5.png";

export default function EditMascot(){

    const history = useHistory();

    const handleGoBack = () => {
      history.push("/frontpage");
    };

    return(
        <Container className="mascot-container">
            <div className="point-container">
                <Gem color="#F2B84B" size={50}/><div className="point-circle" rounded><p className="top-point-text text-center">50</p></div>
            </div>
            <Row>
                <Col>
                    <Card className="mascot-card" border="warning" style={{ width: '16rem' }}>
                    <Card.Img variant="top" src={Mascot1} />
                        <Card.Body className="text-center">
                            <Card.Title className="mascot-name">Emma</Card.Title>
                            <Card.Text>
                            <p className="point-text"><Gem color="#F2B84B"/> Owned</p>
                            </Card.Text>
                            <Button className="buy-mascot-btn owned" variant="primary">Buy mascot <Gem/></Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className="mascot-card" style={{ width: '16rem' }}>
                    <Card.Img variant="top" src={Mascot2} />
                        <Card.Body className="text-center">
                            <Card.Title className="mascot-name">Laura</Card.Title>
                            <Card.Text>
                            <p className="point-text"><Gem color="#F2B84B"/> 100 points</p>
                            </Card.Text>
                            <Button className="buy-mascot-btn" variant="primary">Buy mascot <Gem/></Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className="mascot-card" style={{ width: '16rem' }}>
                    <Card.Img variant="top" src={Mascot3} />
                        <Card.Body className="text-center">
                            <Card.Title className="mascot-name">Jules</Card.Title>
                            <Card.Text>
                            <p className="point-text"><Gem color="#F2B84B"/> 200 points</p>
                            </Card.Text>
                            <Button className="buy-mascot-btn" variant="primary">Buy mascot <Gem/></Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card className="mascot-card" style={{ width: '16rem' }}>
                    <Card.Img variant="top" src={Mascot4} />
                        <Card.Body className="text-center">
                            <Card.Title className="mascot-name">Mark</Card.Title>
                            <Card.Text>
                            <p className="point-text"><Gem color="#F2B84B"/> 200 points</p>
                            </Card.Text>
                            <Button className="buy-mascot-btn"variant="primary">Buy mascot <Gem/></Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <div className="go-back-btn-container">
                <Button className="go-back-btn" onClick={handleGoBack}>Go back <ChevronLeft/></Button>
            </div>
        </Container>
    );

}