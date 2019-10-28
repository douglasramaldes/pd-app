import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { pushView } from "../actions";
import { Button } from "../../toolbox";

const Container = styled.div`
  margin-top: 48px;
`;

const ButtonContainer = styled.div``;

class LibraryView extends Component {
  changeView = name => {
    this.props.pushView({
      name,
      props: {}
    });
  };

  render() {
    return (
      <Container>
        <ButtonContainer>
          <Button
            label="Discos"
            theme="red"
            chevron
            onClick={() => this.changeView("Discos")}
          />
          <Button
            label="Coleções"
            theme="red"
            chevron
            onClick={() => this.changeView("Coleções")}
          />
        </ButtonContainer>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    viewState: state.viewState
  };
};

const mapDispatchToProps = dispatch => {
  return {
    pushView: view => dispatch(pushView(view))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LibraryView);
