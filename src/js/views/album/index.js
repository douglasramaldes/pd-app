import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { fetchAlbums, fetchAlbum, addToCollection } from "../../api/actions";
import { pushView, pushPopup } from "../actions";
import { Button, constants, Modal } from "../../toolbox";

const { color } = constants;
const breakpointSm = `@media screen and (max-width: 750px)`;

const Container = styled.div`
  display: flex;

  ${breakpointSm} {
    display: block;
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

const ArtworkContainer = styled.div`
  position: relative;
  height: 300px;
  width: 300px;
  margin-right: 32px;

  ${breakpointSm} {
    height: 36vw;
    width: 36vw;
    display: block;
    margin-right: 8px;
    max-height: 100%;
  }
`;

const Artwork = styled.img`
  border: 1px solid ${color.gray[2]};
  box-sizing: border-box;
  border-radius: 6px;
  pointer-events: none;
  user-select: none;
  max-height: 100%;
`;

const Placeholder = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: url("images/default_artwork.svg");
  background-size: cover;
  transition: all 0.3s;
  opacity: ${props => (props.isHidden ? 0 : 1)};
`;

const ButtonContainer = styled.div`
  flex: 1;
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
`;

const Title = styled.h1`
  margin: 0 0 8px;

  ${breakpointSm} {
    font-size: 3.5vh;
  }
`;

const Subtitle = styled.h2`
  color: ${color.red[4]};
  font-weight: normal;
  margin: 0 0 16px 0;

  ${breakpointSm} {
    font-size: 3vh;
  }
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
    pushPopup: popup => dispatch(pushPopup(popup)),
    addToCollection: discoCollection =>
      dispatch(addToCollection(discoCollection)),
    fetchAlbums: () => dispatch(fetchAlbums()),
    fetchAlbum: ({ discoId, album }) => dispatch(fetchAlbum({ discoId, album }))
  };
};

class AlbumView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      artist: this.props.artist,
      album: this.props.album,
      isLoaded: false
    };
  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  handleToUpdate = (artist, album) => {
    this.setState({ artist, album, isOpen: !this.state.isOpen });
  };

  onArtworkLoaded = () => {
    this.setState({ isLoaded: true });
  };

  setupOptionsMenu = disco => {
    this.props.pushPopup({
      name: "Options",
      props: {
        options: [
          {
            label: "Adicionar na Coleção",
            image: "add_to_playlist.svg",
            onClick: () =>
              this.props.pushPopup({
                name: "Collection Selector",
                props: {
                  disco: disco,
                  onSelect: discoCollection =>
                    this.props.addToCollection(discoCollection)
                }
              })
          }
        ]
      }
    });
  };

  componentDidMount() {
    const { album, apiState, discoId } = this.props;
    const { albums, albumData } = apiState.data;

    if (albums.length === 0) {
      this.props.fetchAlbums();
      this.props.fetchAlbum({ discoId, album });
    }

    if (!albumData[album] || !albumData[album].length) {
      this.props.fetchAlbum({ discoId, album });
    }
    this.setState({ inputValue: this.props.inputValue });
  }

  render() {
    const { album, apiState } = this.props;
    const { albumData } = apiState.data;
    const { isLoaded } = this.state;
    const disco = albumData[album];
    const artwork = disco ? disco[0] && disco[0].artwork : null;
    const url = "";

    return (
      <Container>
        <MobileHeader>
          <ArtworkContainer>
            <Placeholder isHidden={isLoaded} />
            {artwork && <Artwork src={url} />}
          </ArtworkContainer>
          <TitleContainer>
            <Title>{this.state.album}</Title>
            <Subtitle>{this.state.artist}</Subtitle>
            <ActionContainer>
              <Svg src="images/more_circle.svg" onClick={this.toggleModal} />
            </ActionContainer>
            <Button
              OptionsMenu={true}
              onOptionsClick={() => this.setupOptionsMenu()}
            />
          </TitleContainer>
          <Modal
            handleToUpdate={this.handleToUpdate}
            artist={this.state.artist}
            album={this.state.album}
            discoId={this.props.discoId}
            show={this.state.isOpen}
            onClose={this.toggleModal}
          ></Modal>
        </MobileHeader>
        <VisibleDesktop>
          <ArtworkContainer>
            <Placeholder isHidden={isLoaded} />
            {artwork && <Artwork src={url} onLoad={this.onArtworkLoaded} />}
          </ArtworkContainer>
          <Modal
            handleToUpdate={this.handleToUpdate}
            artist={this.state.artist}
            album={this.state.album}
            discoId={this.props.discoId}
            show={this.state.isOpen}
            onClose={this.toggleModal}
          ></Modal>
        </VisibleDesktop>
        <ButtonContainer>
          <VisibleDesktop>
            <Title>{this.state.album}</Title>
            <Subtitle>{this.state.artist}</Subtitle>
            <ActionContainer>
              <Svg src="images/more_circle.svg" onClick={this.toggleModal} />
            </ActionContainer>
            <Button
              OptionsMenu={true}
              onOptionsClick={() => this.setupOptionsMenu(disco)}
            />
          </VisibleDesktop>
        </ButtonContainer>
      </Container>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AlbumView);
