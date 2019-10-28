import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { editDisco } from "../../../api/actions";
import { pushView } from "../../../views/actions";

const EditInput = styled.textarea`
  margin: 16px 0 16px 16px;
  -webkit-appearance: none;
  font-size: 24px;
  border: none;
  outline: none;
  flex: 1;
  resize: none;
  caret-color: red;
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
  font-family: "SF Pro Display";
`;

const BtnEdit = styled.button`
  margin: 5px;
`;

const mapDispatchToProps = dispatch => {
  return {
    pushView: view => dispatch(pushView(view)),
    editDisco: (disco, discoId) => dispatch(editDisco(disco, discoId))
  };
};

const Title = styled.h3`
  margin: 0 0 8px;
`;

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artist: props.artist,
      album: props.album
    };
    this.handleChangeArtist = this.handleChangeArtist.bind(this);
    this.handleChangeAlbum = this.handleChangeAlbum.bind(this);
  }

  handleChangeArtist(event) {
    this.setState({ artist: event.target.value });
  }

  handleChangeAlbum(event) {
    this.setState({ album: event.target.value });
  }

  changeView = name => {
    this.props.pushView({
      name,
      props: {}
    });
  };

  viewAlbum = ({ artist, album, discoId }) => {
    this.props.pushView({
      name: "Album",
      title: album,
      props: {
        hideTitle: true,
        artist,
        album,
        discoId
      }
    });
  };

  editDisco = () => {
    const album = this.state.album;
    const artist = this.state.artist;

    const disco = {
      album,
      artist
    };
    this.props.editDisco(disco, this.props.discoId);
    this.props.handleToUpdate(artist, album);
  };

  render() {
    if (!this.props.show) {
      return null;
    }

    const backdropStyle = {
      position: "fixed",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      padding: 50
    };

    const modalStyle = {
      backgroundColor: "#fff",
      borderRadius: 5,
      maxWidth: 500,
      minHeight: 300,
      margin: "0 auto",
      padding: 30
    };

    const labelStyle = {
      display: "flex"
    };

    return (
      <div className="backdrop" style={backdropStyle}>
        <div className="modal" style={modalStyle}>
          {this.props.children}
          <Title>Editar</Title>
          <label style={labelStyle}>Nome do Album</label>
          <EditInput
            value={this.state.album}
            onChange={this.handleChangeAlbum}
            id="album-edit"
          ></EditInput>
          <label style={labelStyle}>Nome do Artista</label>
          <EditInput
            value={this.state.artist}
            onChange={this.handleChangeArtist}
            id="artist-edit"
          ></EditInput>
          <div className="footer">
            <BtnEdit onClick={this.props.onClose}> Fechar</BtnEdit>
            <BtnEdit onClick={this.editDisco}> Salvar</BtnEdit>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Modal);
