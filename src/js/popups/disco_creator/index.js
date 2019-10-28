import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { constants, FileInput } from "../../toolbox";
import { fetchCollections, createDisco } from "../../api/actions";
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

const Album = styled.h3`
  margin: 0;
`;

const Section = styled.div`
  display: flex;
  padding: 0 16px;
`;

const AlbumInput = styled.textarea`
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

const ArtistInput = styled.textarea`
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
    createDisco: (disco, discos) => dispatch(createDisco(disco, discos))
  };
};

class DiscoCreator extends Component {
  state = {
    artwork: /* Base64 encoded string */ null,
    album: "",
    artist: ""
  };

  handleImageUpload = artwork => {
    this.setState({ artwork });
  };

  createDisco = () => {
    const { apiState } = this.props;
    const albums = apiState.data.albums;
    const album = document.getElementById("disco-album").value;
    const artist = document.getElementById("disco-artist").value;
    const { artwork } = this.state;

    if (!album || !artist || !artwork) {
      alert("Tenha certeza de adicionar o nome do disco, artista e a capa");
      return;
    }

    const disco = {
      album,
      artist,
      artwork
    };
    this.props.createDisco(disco, albums);
    this.props.popPopup();
  };

  render() {
    const { index, closing } = this.props;

    return (
      <Container index={index} closing={closing}>
        <Header
          left={<Button onClick={this.props.popPopup}>Cancelar</Button>}
          center={<Album>Novo Disco</Album>}
          right={
            <Button bold onClick={this.createDisco}>
              Salvar
            </Button>
          }
        />
        <Section>
          <FileInput
            img={"images/photo_add.png"}
            onUpload={this.handleImageUpload}
          />
          <AlbumInput id="disco-album" placeholder="Nome do Disco" />
        </Section>
        <Section>
          <ArtistInput id="disco-artist" placeholder="Artista" />
        </Section>
      </Container>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiscoCreator);
