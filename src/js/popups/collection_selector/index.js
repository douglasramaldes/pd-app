import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { constants, CollectionButton } from "../../toolbox";
import { fetchCollections } from "../../api/actions";
import { popPopup, pushPopup } from "../../views/actions";
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

const Title = styled.h1`
  margin: 0 0 16px 0;
  padding: 0 0 16px 16px;
  border-bottom: 1px solid ${color.gray[2]};
  background: ${color.gray[1]};
`;

const ButtonContainer = styled.div`
  padding-left: 16px;
`;

const mapStateToProps = state => {
  return {
    apiState: state.apiState
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCollections: () => dispatch(fetchCollections()),
    popPopup: () => dispatch(popPopup()),
    pushPopup: popup => dispatch(pushPopup(popup))
  };
};

class CollectionSelector extends Component {
  selectCollection = (collection, disco) => {
    const discoCollection = {
      discoId: disco.id,
      collectionId: collection.id
    };
    this.props.onSelect(discoCollection);
    this.props.popPopup();
  };

  newCollection = () => {
    this.props.pushPopup({
      name: "Collection Creator",
      props: {}
    });
  };

  getCollectionButtons = () => {
    const { collections } = this.props.apiState.data;
    const collectionButtons = [];
    const disco = this.props.disco[0];

    collections.map((item, index) => {
      const { name, description, artwork } = item;
      const img = new Buffer(artwork) || "images/music.jpg";
      collectionButtons.push(
        <CollectionButton
          key={index}
          title={name}
          description={description}
          img={img || "images/music.jpg"}
          onClick={() => this.selectCollection(item, disco)}
        />
      );
      return null;
    });

    return collectionButtons;
  };

  componentDidMount() {
    this.props.fetchCollections();
  }

  render() {
    const { index, closing } = this.props;

    return (
      <Container index={index} closing={closing}>
        <Header
          color={color.gray[1]}
          right={<Button onClick={this.props.popPopup}>Cancelar</Button>}
        />
        <Title>Adicionar na Coleção</Title>
        <ButtonContainer>
          <CollectionButton
            key="playlist-selector-new-playlist-button"
            title="Nova Coleção..."
            img="images/playlist_add.jpg"
            color="red"
            onClick={this.newPlaylist}
          />
          {this.getCollectionButtons()}
        </ButtonContainer>
      </Container>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionSelector);
