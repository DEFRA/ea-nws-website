import Header from "../gov-uk-components/Header";
import Footer from "../gov-uk-components/Footer";
import Button from "../gov-uk-components/Button";
import Table from "../gov-uk-components/Table";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function HomePage() {
  const [location, setLocation] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    fetchLocation();
  }, []);

  const fetchLocation = async () => {
    try {
      const response = await axios.get("/home");
      const { lat, lng } = response.data;
      setLocation({ lat, lng });
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  useEffect(() => {
    if (location.lat !== 0 && location.lng !== 0) {
      initMap();
    }
  }, [location]);

  const initMap = () => {
    const map = new window.google.maps.Map(document.getElementById("map"), {
      zoom: 12,
      center: location,
    });

    new window.google.maps.Marker({
      position: location,
      map: map,
      title: "User Location",
    });
  };

  return (
    <>
      <Header />
      <div class="govuk-width-container">
        <br />
        <h1 class="govuk-heading-l">Home</h1>
        <br />
        <Button
          text={"Add new location"}
          className={"govuk-button govuk-button--secondary"}
        />
        &nbsp;&nbsp;&nbsp;
        <Button
          text={"Unsubscribe from flood alerts"}
          className={"govuk-button govuk-button--secondary"}
        />
        &nbsp;&nbsp;&nbsp;
        <Button
          text={"Your email addresses and number"}
          className={"govuk-button govuk-button--secondary"}
        />
        &nbsp;&nbsp;&nbsp;
        <Table />
        <p class="govuk-body">Showing 1 of 1</p>
        <div id="map" style={{ height: "400px", width: "100%" }}></div>
        <br />
      </div>
      <Footer />
    </>
  );
}
