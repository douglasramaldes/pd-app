import { Api } from "../toolbox";
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

export const createDisco = (album, albums) => {
  return dispatch => {
    return Api.createDisco(album)
      .then(album => {
        albums.push(album);
        dispatch({
          type: "CREATE_ALBUM",
          albums
        });
        store.addNotification({
          title: "Disco Criado",
          message: "O Disco foi criado com sucesso",
          type: "default", // 'default', 'success', 'info', 'warning'
          container: "bottom-right", // where to position the notifications
          dismiss: {
            duration: 3000
          }
        });
      })
      .catch(error => {
        store.addNotification({
          title: "Disco Não foi Salvo",
          message: "Tente adicionar o disco novamente",
          type: "warning", // 'default', 'success', 'info', 'warning'
          container: "bottom-right", // where to position the notifications
          dismiss: {
            duration: 3000
          }
        });
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
        store.addNotification({
          title: "Disco Editado",
          message: "O Disco foi editado com sucesso",
          type: "success", // 'default', 'success', 'info', 'warning'
          container: "bottom-right", // where to position the notifications
          dismiss: {
            duration: 3000
          }
        });
      })
      .catch(error => {
        store.addNotification({
          title: "Não conseguimos editar o disco",
          message: "Tente editar o disco novamente",
          type: "warning", // 'default', 'success', 'info', 'warning'
          container: "bottom-right", // where to position the notifications
          dismiss: {
            duration: 3000
          }
        });
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
        store.addNotification({
          title: "Coleção Criada",
          message: "A coleção foi criada com sucesso",
          type: "success", // 'default', 'success', 'info', 'warning'
          container: "bottom-right", // where to position the notifications
          dismiss: {
            duration: 3000
          }
        });
      })
      .catch(error => {
        store.addNotification({
          title: "Não conseguimos criar a coleção",
          message: "Tente criar a coleção novamente",
          type: "warning", // 'default', 'success', 'info', 'warning'
          container: "bottom-right", // where to position the notifications
          dismiss: {
            duration: 3000
          }
        });
        console.log(error);
      });
  };
};

export const addToCollection = discoCollection => {
  return dispatch => {
    return Api.createDiscoCollection(discoCollection)
      .then(res => {
        store.addNotification({
          title: "Disco Adicionado ",
          message: "O Disco foi adicionado na coleção com sucesso",
          type: "success", // 'default', 'success', 'info', 'warning'
          container: "bottom-right", // where to position the notifications
          dismiss: {
            duration: 3000
          }
        });
      })
      .catch(error => {
        if (error === "disco is already in the collection") {
          store.addNotification({
            title: "Disco Duplicado",
            message: "Esse Disco já encontra-se na coleção",
            type: "warning", // 'default', 'success', 'info', 'warning'
            container: "bottom-right", // where to position the notifications
            dismiss: {
              duration: 3000
            }
          });
        }
        if (error !== "disco is already in the collection") {
          store.addNotification({
            title: "Não conseguimos adicionar o disco",
            message: "Tente adicionar o disco novamente",
            type: "warning", // 'default', 'success', 'info', 'warning'
            container: "bottom-right", // where to position the notifications
            dismiss: {
              duration: 3000
            }
          });
        }
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
        store.addNotification({
          title: "Disco Removido ",
          message: "O Disco foi removido da coleção com sucesso",
          type: "success", // 'default', 'success', 'info', 'warning'
          container: "bottom-right", // where to position the notifications
          dismiss: {
            duration: 3000
          }
        });
      })
      .catch(error => {
        store.addNotification({
          title: "Não conseguimos remover o Disco",
          message: "Tente remover o disco novamente",
          type: "warning", // 'default', 'success', 'info', 'warning'
          container: "bottom-right", // where to position the notifications
          dismiss: {
            duration: 3000
          }
        });
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
        store.addNotification({
          title: "Todos os discos Foram Removidos ",
          message: "Removemos os discos com sucesso",
          type: "success", // 'default', 'success', 'info', 'warning'
          container: "bottom-right", // where to position the notifications
          dismiss: {
            duration: 3000
          }
        });
      })
      .catch(error => {
        store.addNotification({
          title: "Não conseguimos remover os Discos",
          message: "Tente remover os discos novamente",
          type: "warning", // 'default', 'success', 'info', 'warning'
          container: "bottom-right", // where to position the notifications
          dismiss: {
            duration: 3000
          }
        });
        console.log(error);
      });
  };
};
