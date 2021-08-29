import React from "react";
import { Form, Col, Row, Button, Container, Alert } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { darkTheme, lightTheme } from "./constants";

function SwingCalculator(props) {
    const [formData, setFormData] = React.useState({});
    const [result, setResult] = React.useState({});
    const [alert, setAlert] = React.useState(null);

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: Number(event.target.value),
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (formData.entry < formData.stopLoss) {
            setAlert({
                type: "danger",
                message: "Stop Loss must be greater than Entry",
            });
            return;
        }
        const diff = formData.entry - formData.stopLoss;
        setResult({
            quantity: formData.riskAmount / diff,
            target: formData.entry + diff * 2,
        });
        setAlert(null);
    };
    const changeTheme = () => {
        props.setTheme({
            ...(props.theme.name === "dark" ? lightTheme : darkTheme),
        });
    };

    return (
        <Container className="mt-5">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2>Swing Trading ESQT Calculator</h2>
                <Button  onClick={changeTheme} style={{ float: "right" }}>
                    {" "}
                    <Icon.SunFill
                        style={{ color: props.theme.sunColor }}
                    />{" "}
                </Button>
            </div>
            <hr />
            <h3>Required Fields</h3>
            {alert && <Alert variant={alert.type}>{alert.message}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col}>
                        <Form.Label>Entry</Form.Label>
                        <Form.Control
                            onChange={handleChange}
                            name="entry"
                            type="number"
                            placeholder="Entry"
                            required
                        />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Stop Loss</Form.Label>
                        <Form.Control
                            onChange={handleChange}
                            name="stopLoss"
                            type="number"
                            placeholder="Stop Loss"
                            required
                        />
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3">
                    <Form.Label>Risk Amount</Form.Label>
                    <Form.Control
                        onChange={handleChange}
                        name="riskAmount"
                        type="number"
                        placeholder="Risk Amount"
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            <hr />
            <h3>Result</h3>
            <Row className="mb-3">
                <Form.Group as={Col}>
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control defaultValue={result.quantity} disabled />
                </Form.Group>

                <Form.Group as={Col}>
                    <Form.Label>Target</Form.Label>
                    <Form.Control defaultValue={result.target} disabled />
                </Form.Group>
            </Row>
        </Container>
    );
}

export default SwingCalculator;
