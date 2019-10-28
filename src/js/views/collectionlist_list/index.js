import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { fetchCollections } from "../../api/actions";
import { pushView, pushPopup } from "../actions";
import { CollectionButton } from "../../toolbox";

const Container = styled.div`
  margin-top: 48px;
`;

const ButtonContainer = styled.div``;

const mapStateToProps = state => {
  return {
    viewState: state.viewState,
    apiState: state.apiState
  };
};

const mapDispatchToProps = dispatch => {
  return {
    pushView: view => dispatch(pushView(view)),
    pushPopup: popup => dispatch(pushPopup(popup)),
    fetchCollections: () => dispatch(fetchCollections())
  };
};

class CollectionListView extends Component {
  viewCollection = (collection, index) => {
    this.props.pushView({
      name: "Collection",
      title: collection.name,
      props: {
        hideTitle: true,
        index,
        collection
      }
    });
  };

  newCollection = () => {
    this.props.pushPopup({
      name: "Collection Creator",
      props: {}
    });
  };

  componentDidMount() {
    this.props.fetchCollections();
  }

  getCollectionButtons = () => {
    const collections = this.props.apiState.data.collections
      ? this.props.apiState.data.collections
      : [];
    const collectionButtons = [];

    collections.map((item, index) => {
      const { name, description, artwork } = item;
      const img = new Buffer(artwork);
      collectionButtons.push(
        <CollectionButton
          key={index}
          title={name}
          description={description}
          img={img || "images/music.jpg"}
          onClick={() => this.viewCollection(item, index)}
        />
      );
      return null;
    });
    return collectionButtons;
  };

  render() {
    return (
      <Container>
        <ButtonContainer>
          <CollectionButton
            key="new-playlist-button"
            title="Nova Coleção..."
            img="images/playlist_add.jpg"
            color="red"
            onClick={this.newCollection}
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
)(CollectionListView);
