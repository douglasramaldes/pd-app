import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { constants, FileInput } from "../../toolbox";
import { fetchCollections, createCollection } from "../../api/actions";
import { pushView, popPopup } from "../../views/actions";
import Header from "../components/header";

const { color, animation } = constants;
const { slideInFromBottom, slideOutToBottom } = animation;

const Container = styled.div`
  z-index: ${props => 100 + props.index};
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  animation: ${props => (props.closing ? slideOutToBottom : slideInFromBottom)}
    0.3s ease-in-out;
`;

const Button = styled.h3`
  margin: 0;
  color: ${color.red[4]};
  font-weight: ${props => props.bold && "bold"};
  cursor: pointer;
  user-select: none;
`;

const Title = styled.h3`
  margin: 0;
`;

const Section = styled.div`
  display: flex;
  padding: 0 16px;
`;

const TitleInput = styled.textarea`
  margin-left: 16px;
  -webkit-appearance: none;
  font-size: 24px;
  border: none;
  outline: none;
  flex: 1;
  resize: none;
  caret-color: ${color.red[4]};
  font-family: "SF Pro Display";
`;

const DescriptionInput = styled.textarea`
  margin: 16px 0 16px 16px;
  -webkit-appearance: none;
  font-size: 24px;
  border: none;
  outline: none;
  flex: 1;
  resize: none;
  caret-color: ${color.red[4]};
  border-top: 1px solid ${color.gray[3]};
  border-bottom: 1px solid ${color.gray[3]};
  font-family: "SF Pro Display";
`;

const mapStateToProps = state => {
  return {
    viewState: state.viewState,
    apiState: state.apiState
  };
};

const mapDispatchToProps = dispatch => {
  return {
    pushView: view => dispatch(pushView(view)),
    popPopup: () => dispatch(popPopup()),
    fetchCollections: () => dispatch(fetchCollections()),
    createCollection: (collection, collections) =>
      dispatch(createCollection(collection, collections))
  };
};

class CollectionCreator extends Component {
  state = {
    artwork: /* Base64 encoded string */ null,
    name: "",
    description: "",
    tracks: []
  };

  handleImageUpload = artwork => {
    this.setState({ artwork });
  };

  createCollection = () => {
    const description = document.getElementById("collection-description").value;
    const name = document.getElementById("collection-name").value;
    const { artwork, tracks } = this.state;

    if (!name || !description || !artwork) {
      alert("Make sure to add a name, description and cover!");
      return;
    }

    const collection = {
      name,
      description,
      artwork,
      tracks
    };

    this.props.createCollection(
      collection,
      this.props.apiState.data.collections
    );
    this.props.popPopup();
  };

  render() {
    const { index, closing } = this.props;

    return (
      <Container index={index} closing={closing}>
        <Header
          left={<Button onClick={this.props.popPopup}>Cancelar</Button>}
          center={<Title>Nova Coleção</Title>}
          right={
            <Button bold onClick={this.createCollection}>
              Salvar
            </Button>
          }
        />
        <Section>
          <FileInput
            img={"images/photo_add.png"}
            onUpload={this.handleImageUpload}
          />
          <TitleInput id="collection-name" placeholder="Nome da Coleção" />
        </Section>
        <Section>
          <DescriptionInput
            id="collection-description"
            placeholder="Descrição"
          />
        </Section>
      </Container>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionCreator);
