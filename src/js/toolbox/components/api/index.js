class ApiClass {
  constructor() {
    this.url = `http://127.0.0.1:3001/v1`;
  }

  makeRequest = ({ url, data }) => {
    return new Promise(function(resolve, reject) {
      fetch(url, data)
        .then(response => {
          response.json().then(data => {
            if (response.status >= 300) {
              reject(data.message);
            }
            resolve(data);
          });
        })
        .catch(e => {
          reject(Error(e));
        });
    });
  };

  createDisco = disco => {
    return this.makeRequest({
      url: `${this.url}/discos`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      data: {
        method: "Post",
        body: JSON.stringify(disco)
      }
    });
  };

  createCollection = collection => {
    return this.makeRequest({
      url: `${this.url}/collections`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      data: {
        method: "Post",
        body: JSON.stringify(collection)
      }
    });
  };

  createDiscoCollection = collection => {
    return this.makeRequest({
      url: `${this.url}/discos-collections`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      data: {
        method: "Post",
        body: JSON.stringify(collection)
      }
    });
  };

  editDisco = (disco, discoId) => {
    return this.makeRequest({
      url: `${this.url}/discos/${discoId}`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      data: {
        method: "Put",
        body: JSON.stringify(disco)
      }
    });
  };

  fetchAlbums = () => {
    return this.makeRequest({
      url: `${this.url}/discos`,
      data: {
        method: "GET"
      }
    });
  };

  fetchAlbum = ({ discoId }) => {
    return this.makeRequest({
      url: `${this.url}/discos/${discoId}`,
      data: {
        method: "GET"
      }
    });
  };

  fetchCollections = () => {
    return this.makeRequest({
      url: `${this.url}/collections`,
      data: {
        method: "GET"
      }
    });
  };

  fetchDiscoCollection = collectionId => {
    return this.makeRequest({
      url: `${this.url}/discos-collections/${collectionId}`,
      data: {
        method: "GET"
      }
    });
  };

  deleteDiscoCollection = discoCollection => {
    return this.makeRequest({
      url: `${this.url}/discos-collections`,
      data: {
        method: "DELETE",
        body: JSON.stringify(discoCollection)
      }
    });
  };

  deleteAllDiscosCollection = collectionId => {
    return this.makeRequest({
      url: `${this.url}/discos-collections/${collectionId}`,
      data: {
        method: "DELETE"
      }
    });
  };
}

const Api = new ApiClass();
export default Api;
