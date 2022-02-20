import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import tinycolor from "tinycolor2";
import { BsFillCheckCircleFill } from "react-icons/bs";
import "./palette.css";
import ReactToPdf from "react-to-pdf";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const Palette = () => {
  const colors = useSelector((state) => state.colorReducer.colors);
  const navigate = useNavigate();
  const [index, setIndex] = useState(1000);

  useEffect(() => {
    if (colors.length === 0) {
      navigate("/");
    }
  });

  var timeout = setTimeout;

  const onClick = (i) => {
    setIndex(i);
    navigator.clipboard.writeText(colors[i]);
  };

  const print = () => {
    var doc = document.querySelector(".colorsContainer");
    html2canvas(doc, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
      });
      pdf.addImage(imgData, "PNG", 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
      pdf.save("download.pdf");
    });
  };

  return (
    <div className="paletteMainContainer p-3" id="paletteMainContainer">
      <div className="row m-0 pb-3 title" dir="rtl">
        <div className="col-12 col-md-6 px-0 text-center text-md-end d-flex align-items-center justify-content-center justify-content-md-start">
          <h1>Palette Generator</h1>
        </div>
        <div className="col-12 col-md-6 mt-3 mt-md-0 d-flex align-items-center justify-content-center justify-content-md-end px-0">
          <button className="btn actionBtn ms-3" onClick={print}>
            Export as pdf
          </button>
          <button className="btn actionBtn" onClick={() => navigate("/")}>
            Back
          </button>
        </div>
      </div>
      <div className="colorsContainer d-flex flex-column flex-lg-row align-items-center justify-content-center">
        {colors.map((v, i) => {
          return (
            <div key={i} className={`colorContainer`} style={{ backgroundColor: v }} onClick={() => onClick(i)}>
              {index !== i && <span style={{ color: tinycolor(v).isLight() ? "#343434" : "white" }}>{v}</span>}
              {index === i && (
                <div className="copyContainer" style={{ color: tinycolor(v).isLight() ? "#343434" : "white" }}>
                  <BsFillCheckCircleFill className="me-2" />
                  <span>Copied</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
