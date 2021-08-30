import React from "react";
import { Form, Col, Row, Button, Container } from "react-bootstrap";
import * as Icon from "react-bootstrap-icons";
import { darkTheme, lightTheme } from "./constants";
import { getStorage, setStorage } from "./storage";

const initState = {
    entry: 0,
    stopLoss: 0,
    riskAmount: 0,
    quantity: 0,
    target: 0,
};

function SwingCalculator(props) {
    const [data, setData] = React.useState(
        getStorage("lastUsedData") || initState
    );

    const handleChange = (event) => {
        if (!Number(event.target.value)) return;
        const formData = {
            ...data,
            [event.target.name]: Number(event.target.value),
        };

        const diff = formData.entry - formData.stopLoss;
        formData.quantity = Number((formData.riskAmount / diff).toFixed(2));
        formData.target = Number((formData.entry + diff * 2).toFixed(2));
        setStorage("lastUsedData", formData);
        setData(formData);
    };
    const changeTheme = () => {
        const isDarkTheme = props.theme.name === "dark";
        props.setTheme({
            ...(isDarkTheme ? lightTheme : darkTheme),
        });
        setStorage("theme", isDarkTheme ? "light" : "dark");
    };

    const getStopLossPercentage = () => {
        if (!Number(data.entry) || !Number(data.stopLoss)) return 0;
        const stopLossPercentage = (
            ((data.entry - data.stopLoss) / data.entry) *
            100
        ).toFixed(2);

        return stopLossPercentage;
    };

    const getTargetPercentage = () => {
        if (!Number(data.entry) || !Number(data.target)) return 0;

        const targetPercentage = (
            ((data.target - data.entry) / data.entry) *
            100
        ).toFixed(2);
        return targetPercentage;
    };

    return (
        <Container className="mt-5">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2>Swing Trading ESQT Calculator</h2>
                <Button onClick={changeTheme} style={{ float: "right" }}>
                    {" "}
                    <Icon.SunFill
                        style={{ color: props.theme.sunColor }}
                    />{" "}
                </Button>
            </div>
            <hr />
            <h3>Required Fields</h3>

            <Row className="mb-3">
                <Form.Group as={Col}>
                    <Form.Label>Entry</Form.Label>
                    <Form.Control
                        onChange={handleChange}
                        name="entry"
                        type="number"
                        placeholder="Entry"
                        step="0.01"
                        required
                        defaultValue={data.entry}
                    />
                </Form.Group>

                <Form.Group as={Col}>
                    <Form.Label>
                        Stop Loss ({getStopLossPercentage()}%{" "}
                        <Icon.CaretDownFill style={{ color: "red" }} />)
                    </Form.Label>
                    <Form.Control
                        onChange={handleChange}
                        name="stopLoss"
                        type="number"
                        placeholder="Stop Loss"
                        step="0.01"
                        required
                        defaultValue={data.stopLoss}
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
                    step="0.01"
                    required
                    defaultValue={data.riskAmount}
                />
            </Form.Group>

            <hr />
            <h3>Result</h3>
            <Row className="mb-3">
                <Form.Group as={Col}>
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control
                        value={data.quantity || 0}
                        onChange={() => {}}
                    />
                </Form.Group>

                <Form.Group as={Col}>
                    <Form.Label>
                        Target ({getTargetPercentage()}%{" "}
                        <Icon.CaretUpFill style={{ color: "green" }} />)
                    </Form.Label>
                    <Form.Control
                        value={data.target || 0}
                        onChange={() => {}}
                    />
                </Form.Group>
            </Row>
        </Container>
    );
}

export default SwingCalculator;
