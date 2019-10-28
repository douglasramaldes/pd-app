import { Api } from "../toolbox";

export const createDisco = (album, albums) => {
  return dispatch => {
    return Api.createDisco(album)
      .then(album => {
        albums.push(album);
        dispatch({
          type: "CREATE_ALBUM",
          albums
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const editDisco = (disco, discoId) => {
  return dispatch => {
    return Api.editDisco(disco, discoId)
      .then(res => {
        dispatch({
          type: "EDIT_ALBUM",
          disco,
          discoId
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const fetchAlbums = () => {
  return dispatch => {
    return Api.fetchAlbums()
      .then(albums => {
        const albumData = {};

        for (let album of albums) {
          const name = album.album;
          albumData[name] = [];
        }

        dispatch({
          type: "FETCH_DISCO_LIST",
          albumData,
          albums
        });
        return albums;
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const fetchAlbum = ({ artist, album, discoId }) => {
  return dispatch => {
    return Api.fetchAlbum({ discoId })
      .then(disco => {
        dispatch({
          type: "FETCH_DISCO",
          album,
          disco
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const fetchCollections = () => {
  return dispatch => {
    return Api.fetchCollections()
      .then(collections => {
        dispatch({
          type: "FETCH_COLLECTIONS",
          collections: collections
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const fetchDiscoCollection = id => {
  return dispatch => {
    return Api.fetchDiscoCollection(id)
      .then(res => {
        dispatch({
          type: "FETCH_DISCOS_COLLECTION",
          discosCollection: res
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const createCollection = (collection, collections) => {
  return dispatch => {
    return Api.createCollection(collection)
      .then(collec => {
        collections.push(collec);
        dispatch({
          type: "CREATE_COLLECTION",
          collections
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const addToCollection = discoCollection => {
  return dispatch => {
    return Api.createDiscoCollection(discoCollection)
      .then(res => {})
      .catch(error => {
        console.log(error);
      });
  };
};

export const removeFromCollection = discoCollection => {
  return dispatch => {
    return Api.deleteDiscoCollection(discoCollection)
      .then(res => {
        dispatch({
          type: "FETCH_DISCOS_COLLECTION",
          discosCollection: res
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const removeAllDiscosCollection = discoCollectionId => {
  return dispatch => {
    return Api.deleteAllDiscosCollection(discoCollectionId)
      .then(res => {
        dispatch({
          type: "FETCH_DISCOS_COLLECTION",
          discosCollection: []
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
};
