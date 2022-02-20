import React from "react";
import { Alert, Button, Col, FormControl, InputGroup, Row } from "react-bootstrap";
import { BsFillXCircleFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { colorsSlice } from "../../redux/colors/colorsSlice";
import tinycolor from "tinycolor2";
import "./home.css";
import { ReactComponent as Image1 } from "../../assets/images/image1.svg";

export const Home = (props) => {
  const colors = useSelector((state) => state.colorReducer.colors);
  const inputValue = useSelector((state) => state.colorReducer.inputValue);
  const errorMessage = useSelector((state) => state.colorReducer.errorMessage);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const enter = (e) => {
    if (e.key === "Enter") {
      dispatch(colorsSlice.actions.setErrorMessage({ message: "" }));
      var value = e.target.value;
      if (value.length === 6) {
        if (/^[0-9a-f]+$/.test(value)) {
          if (!colors.includes("#" + value)) {
            dispatch(colorsSlice.actions.addColors({ color: `#${value}` }));
            dispatch(colorsSlice.actions.clearInput());
          } else {
            dispatch(colorsSlice.actions.setErrorMessage({ message: "Duplicate hex color" }));
          }
        } else {
          dispatch(colorsSlice.actions.setErrorMessage({ message: "Incorrect hex color" }));
        }
      } else {
        dispatch(colorsSlice.actions.setErrorMessage({ message: "Hex color must have 6 character" }));
      }
    }
  };

  const onChange = (v) => {
    dispatch(colorsSlice.actions.addInput({ inputValue: v }));
  };

  const removeColor = (v) => {
    dispatch(colorsSlice.actions.removeColor({ color: v }));
  };

  const onClick = () => {
    if (colors.length !== 0) {
      navigate("/palette");
    } else {
      dispatch(colorsSlice.actions.setErrorMessage({ message: "No color added" }));
    }
  };

  return (
    <div className="mainContainer">
      <div className="contentContainer">
        <h1 className="mb-4">
          Palette Generator
        </h1>
        <InputGroup>
          <InputGroup.Text>#</InputGroup.Text>
          <FormControl
            value={inputValue}
            placeholder="Hex Color"
            maxLength={6}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => enter(e)}
          />
        </InputGroup>
        <div className="colorsContainer">
          <Row className="g-3 mt-2">
            {colors.map((v, i) => {
              return (
                <Col key={i} xs={6} md={3}>
                  <Button style={{ backgroundColor: v, color: tinycolor(v).isLight() ? "#343434" : "white" }} onClick={() => removeColor(v)}>
                    {v}
                    <BsFillXCircleFill className="ms-2" />
                  </Button>
                </Col>
              );
            })}
          </Row>
        </div>
        <Button className="customBtn mt-4" style={{ marginBottom: errorMessage.length === 0 ? 20 : 0 }} onClick={onClick}>
          Generate
        </Button>
        {errorMessage.length !== 0 && (
          <Alert className="customAlert mt-3" variant="danger">
            <span>{errorMessage}</span>
            <BsFillXCircleFill style={{ cursor: "pointer" }} onClick={() => dispatch(colorsSlice.actions.setErrorMessage({ message: "" }))} />
          </Alert>
        )}
      </div>
    </div>
  );
};
