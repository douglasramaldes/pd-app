const initialState = {
  data: {
    albums: [],
    collections: [],
    albumData: {},
    discosCollection: []
  }
};

const apiReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_DISCO_LIST":
      return {
        ...state,
        data: {
          ...state.data,
          albumData: {
            ...state.data.albumData,
            ...action.albumData
          },
          albums: action.albums
        }
      };
    case "CREATE_ALBUM":
      return {
        ...state,
        data: {
          ...state.data,
          albums: action.albums
        }
      };
    case "EDIT_ALBUM":
      return {
        ...state,
        data: {
          ...state.data,
          albums: state.data.albums.map((album, i) =>
            album.id === action.discoId
              ? {
                  ...album,
                  album: action.disco.album,
                  artist: action.disco.artist
                }
              : album
          )
        }
      };
    case "FETCH_DISCO":
      return {
        ...state,
        data: {
          ...state.data,
          albumData: {
            ...state.data.albumData,
            [action.album]: action.disco
          }
        }
      };
    case "FETCH_COLLECTIONS":
      return {
        ...state,
        data: {
          ...state.data,
          collections: action.collections
        }
      };
    case "FETCH_DISCOS_COLLECTION":
      return {
        ...state,
        data: {
          ...state.data,
          discosCollection: action.discosCollection
        }
      };
    case "CREATE_COLLECTION":
      return {
        ...state,
        data: {
          ...state.data,
          collections: action.collections
        }
      };
    default:
      return state;
  }
};

export default apiReducer;
