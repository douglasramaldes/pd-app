import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import {
  fetchCollections,
  fetchDiscoCollection,
  removeFromCollection,
  removeAllDiscosCollection
} from "../../api/actions";
import { pushView, popView, pushPopup } from "../actions";
import { Button, constants } from "../../toolbox";
import { Buffer } from "buffer";

const { color } = constants;
const breakpointSm = `@media screen and (max-width: 750px)`;

const Container = styled.div`
  display: flex;

  ${breakpointSm} {
    display: block;
  }
`;

const ArtworkContainer = styled.div`
  margin-right: 32px;

  ${breakpointSm} {
    display: block;
    margin-right: 8px;
    height: 100%;
  }
`;

const Artwork = styled.img`
  border: 1px solid ${color.gray[2]};
  border-radius: 6px;
  pointer-events: none;
  user-select: none;
  max-height: 100%;
`;

const ButtonContainer = styled.div`
  flex: 1;
  margin-top: 16px;
`;

const MobileHeader = styled.div`
  position: relative;
  display: flex;
  height: 20vh;
  margin-bottom: 16px;

  @media screen and (min-width: 750px) {
    display: none;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-bottom: 16px;
`;

const Title = styled.h1`
  margin: 0 0 8px;

  ${breakpointSm} {
    font-size: 1.5rem;
  }
`;

const Subtitle = styled.h2`
  color: ${color.red[4]};
  font-weight: normal;
  margin: 0 0 16px 0;

  ${breakpointSm} {
    font-size: 1.25rem;
  }
`;

const ActionContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  padding: 0 9px;

  svg,
  img {
    cursor: pointer;
  }
`;

const Svg = styled.img`
  height: ${props => props.size || 30}px;
  width: ${props => props.size || 30}px;
`;

const VisibleDesktop = styled.div`
  @media screen and (max-width: 750px) {
    display: none;
  }
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
    popView: () => dispatch(popView()),
    pushPopup: popup => dispatch(pushPopup(popup)),
    removeFromCollection: discoCollection =>
      dispatch(removeFromCollection(discoCollection)),
    removeAllDiscosCollection: collectionId =>
      dispatch(removeAllDiscosCollection(collectionId)),
    fetchCollections: () => dispatch(fetchCollections()),
    fetchDiscoCollection: collectionId =>
      dispatch(fetchDiscoCollection(collectionId))
  };
};

class CollectionView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collections: props.apiState.data.collections
    };
  }

  static getDerivedStateFromProps(nextProps) {
    const { collections } = nextProps.apiState.data;

    return {
      collections
    };
  }

  removeAllDiscosCollection = () => {
    const { collection } = this.props;
    this.props.removeAllDiscosCollection(collection.id);
  };

  setupCollectionRemoveMenu = (disco, collection) => {
    const discoCollection = {
      discoId: disco.id,
      collectionId: collection.id
    };
    this.props.pushPopup({
      name: "Options",
      props: {
        options: [
          {
            label: "Deletar da Coleção",
            image: "trash.svg",
            onClick: () => this.props.removeFromCollection(discoCollection)
          }
        ]
      }
    });
  };

  setupCollectionOptionsMenu = () => {
    this.props.pushPopup({
      name: "Options",
      props: {
        options: [
          {
            label: "Limpar Coleção",
            image: "trash.svg",
            onClick: this.removeAllDiscosCollection
          }
        ]
      }
    });
  };

  componentDidMount() {
    const collectionId = this.props.collection.id;
    this.props.fetchCollections();
    this.props.fetchDiscoCollection(collectionId);
  }

  render() {
    const { collection, apiState } = this.props;
    let { discosCollection } = this.props.apiState.data;
    const collections = apiState.data.collections;
    if (!collections) {
      return null;
    }
    let { artwork, description, name } = collection;
    artwork = new Buffer(artwork) || "images/music.jpg";

    return (
      <Container>
        <MobileHeader>
          <ArtworkContainer>
            <Artwork src={artwork} />
          </ArtworkContainer>
          <TitleContainer>
            <Title>{name}</Title>
            <Subtitle>{description}</Subtitle>
            <ActionContainer>
              <Svg
                src="images/more_circle.svg"
                onClick={this.setupCollectionOptionsMenu}
              />
            </ActionContainer>
          </TitleContainer>
        </MobileHeader>
        <VisibleDesktop>
          <ArtworkContainer>
            <Artwork src={artwork} />
          </ArtworkContainer>
        </VisibleDesktop>
        <ButtonContainer>
          <VisibleDesktop>
            <TitleContainer>
              <Title>{name}</Title>
              <Subtitle>{description}</Subtitle>
              <ActionContainer>
                <Svg
                  src="images/more_circle.svg"
                  onClick={this.setupCollectionOptionsMenu}
                />
              </ActionContainer>
            </TitleContainer>
          </VisibleDesktop>
          {discosCollection &&
            discosCollection.map((item, index) => {
              return (
                <Button
                  key={index}
                  label={item.album}
                  sublabel={item.artist}
                  OptionsMenu={true}
                  onOptionsClick={() =>
                    this.setupCollectionRemoveMenu(item, collection)
                  }
                />
              );
            })}
        </ButtonContainer>
      </Container>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CollectionView);
