import React, { useEffect, useState } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { Gem, ChevronLeft } from "react-bootstrap-icons";
import { useHistory } from "react-router";
import Parse from "parse";
import "./EditMascot.css";
import { getMascotImage } from "../Utils";


export default function EditMascot(){
    const history = useHistory();
    const [mascots, setMascots] = useState([]);
    const [owned_mascot_ids, setOwnedMascotIds] = useState([]);
    const [active_mascot_id, setActiveMascotId] = useState("");
    const [total_points, setTotalPoints] = useState(0);

    const handleGoBack = () => {
      history.push("/frontpage");
    }; 

    const fetchMascots = async () => {
        const Mascots = new Parse.Object.extend("Mascot");
        const query = new Parse.Query(Mascots);
        const result = await query.find();
        setMascots(result);
    };

    useEffect(() => {
        fetchMascots();
    }, []);

    
    const fetchStudent = async () => {
        const user = Parse.User.current();
        if (user) {
            var owned = user.get("owned_mascot_ids");
            var active = user.get("active_mascot_id");
            var points = user.get("total_points");
            setOwnedMascotIds(owned);
            setActiveMascotId(active);
            setTotalPoints(points);
            console.log(user.id);
        }else{
            alert("Failed to retrieve the user.");
        }
    }

    useEffect(() => {
        fetchStudent();
    }, []);

    
    

    const buyMascot = (mascotId, mascotPrice, points) => {
        if(points >= mascotPrice){
            const user = Parse.User.current();
            if (user) {
                user.add("owned_mascot_ids", mascotId);
                points -= mascotPrice;
                var owned = user.get("owned_mascot_ids");
                setOwnedMascotIds(owned);
                setTotalPoints(points);
                console.log(points + mascotId);
                user.set("total_points", points);
                user.save();
                console.log("added" + mascotId)
            }
        }else{
            alert("You don't have enough points to buy this mascot.");
        }
    }

    const pickMascot = (mascotId) => {
        const user = Parse.User.current();
        if(user){
            user.set("active_mascot_id", mascotId);
            user.save();
            setActiveMascotId(mascotId);
        }
    }

    return(
        <Container className="mascot-container">
            <div className="point-container">
                <Gem color="#F2B84B" size={50}/>
                <div className="point-circle">
                    <p className="top-point-text text-center">{total_points}</p>
                </div>
            </div>
            <Row>
                {mascots.map((mascot) => (
                    <Col key={mascot.id}> 
                        <Card className="mascot-card" style={{ width: '16rem' }}>
                        <Card.Img variant="top" src={getMascotImage(mascots.indexOf(mascot))} />
                            <Card.Body className="text-center">
                                <Card.Title className="mascot-name">{mascot.attributes.name}</Card.Title>
                                <Card.Text className="point-text">
                                <Gem color="#F2B84B"/> {mascot.attributes.required_points} points
                                </Card.Text>
                                {owned_mascot_ids.includes(mascot.id)
                                    ?[(active_mascot_id === mascot.id
                                        ?<div key={mascot.id} className="active-mascot-btn">Active mascot</div>
                                        :<Button key={mascot.id} className="pick-mascot-btn" variant="primary" onClick={() => pickMascot(mascot.id)}>Pick mascot </Button>
                                    )]
                                    :<Button key={mascot.id} className="buy-mascot-btn" variant="primary" onClick={() => buyMascot(mascot.id, mascot.attributes.required_points, total_points)}>Buy mascot <Gem/></Button>
                                }
                            </Card.Body>
                        </Card>
                    </Col> 
                ))}   
            </Row>
            <div className="go-back-btn-container">
                <Button className="go-back-btn" onClick={handleGoBack}>Go back <ChevronLeft/></Button>
            </div>
        </Container>
    );
}