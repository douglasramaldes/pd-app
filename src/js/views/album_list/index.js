import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { fetchAlbums } from "../../api/actions";
import { pushView, pushPopup } from "../actions";
import { AlbumButton, constants, CollectionButton } from "../../toolbox";

const { color } = constants;

const Container = styled.div`
  margin-top: 48px;
  border-top: 1px solid ${color.gray[2]};
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 16px;
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
    fetchAlbums: () => dispatch(fetchAlbums())
  };
};

class AlbumListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filtered: []
    };
    this.handleChange = this.handleChange.bind(this);
  }

  newDisco = () => {
    this.props.pushPopup({
      name: "Disco Creator",
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

  componentDidMount() {
    const { apiState } = this.props;
    const { albums } = apiState.data;

    if (albums.length === 0) {
      this.props
        .fetchAlbums()
        .then(res => {
          this.setState({
            filtered: res
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
    if (albums.length > 0) {
      this.setState({
        filtered: albums
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      filtered: nextProps.apiState.data.albums
    });
  }

  handleChange(e) {
    let currentList = [];
    let newList = [];
    if (e.target.value !== "") {
      currentList = this.props.apiState.data.albums;
      newList = currentList.filter(disco => {
        const lc = disco.album.toLowerCase();
        const filter = e.target.value.toLowerCase();
        return lc.includes(filter);
      });
    } else {
      newList = this.props.apiState.data.albums;
    }
    this.setState({
      filtered: newList
    });
  }

  render() {
    const albums = this.state.filtered;
    return (
      <Container>
        <ButtonContainer>
          <CollectionButton
            key="new-disco-button"
            title="Novo Disco..."
            img="images/playlist_add.jpg"
            color="red"
            onClick={this.newDisco}
          />
        </ButtonContainer>
        <input
          type="text"
          className="input"
          onChange={this.handleChange}
          placeholder="Digite o nome do disco..."
        />
        <ButtonContainer>
          {albums.length === 0 && (
            <h2>Você ainda não adicionou nenhum disco.</h2>
          )}
          {albums &&
            albums.map((item, index) => {
              const { album, artist, artwork, id } = item;
              const discoId = id;
              const url = new Buffer(artwork);
              return (
                <AlbumButton
                  key={index}
                  label={album}
                  sublabel={artist}
                  artwork={url}
                  onClick={() => this.viewAlbum({ artist, album, discoId })}
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
)(AlbumListView);
