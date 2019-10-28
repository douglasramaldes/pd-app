import React, { Component } from "react";
import styled from "styled-components";
import ViewContainer from "./views/view_container";
import Header from "./components/header";
import PopupContainer from "./popups";

const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
`;

export default class MusicJS extends Component {
  render() {
    return (
      <Container>
        <Header />
        <ViewContainer />
        <PopupContainer />
      </Container>
    );
  }
}
