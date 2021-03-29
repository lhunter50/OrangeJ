import React from 'react'
import fetch from 'node-fetch';
import Unsplash, { toJson } from 'unsplash-js';
import { Button } from 'antd'

global.fetch = fetch;

const unsplash = new Unsplash({ 
  accessKey: "ZwlAH167E4UEIulH5zobX29b8MCvfj1dga_IF0iB2ik", 
  secret: "aC-q3TpYXxKfbdGNdvdDRu5R5V6pNQ9obsDAk8a-e_4", 
})

class PicturePicker extends React.Component {
  state = {
    fetchedPictures: [],
    searchTerm: "",
    page: 1,
    querySearched: false,
    selectedId: "",
  }

  handleSearchTerm = () => {
    this.setState({ 
      searchTerm: searchTerm.value,
      page: 1,
      selectedId: "",
    })
  }

  paginationUp = async () => {
    await this.setState(oldState =>({
      page: oldState.page + 1,
      searchTerm: searchTerm.value,
      selectedId: "",
    }))
    
    this.getPhotos()
  }
  
  paginationDown = async () => {
    await this.setState(oldState => ({
      page: oldState.page - 1,
      searchTerm: searchTerm.value,
      selectedId: "",
    }))
    this.getPhotos()
  }

  getPhotos = () => {
    let temp = []

    unsplash.search.photos(this.state.searchTerm, this.state.page, 10, { orientation: "landscape" })
      .then(toJson)
      .then(json => {
      json.results.forEach(photo => {
        let imageData = {
          key: photo.id,
          id: photo.id,
          src: photo.urls.thumb, 
          alt: photo.alt_description, 
        }

        temp.push(imageData)
        this.setState({ fetchedPictures: temp, querySearched: true })
      })
    })
  }

  createImages = (array) => {
    return array.map(item => {
      let test = "" 
      if(item.id == this.state.selectedId) {
        test = "chosen"
      }
      return <img
        key={item.id}
        id={item.id}
        src={item.src}
        alt={item.alt}
        onClick={e => this.imageClicked(e)}
        className={test}
      />
    })
  }

  imageClicked = async (e) => {
    if(this.state.selectedId == e.target.id) {
      this.setState({
        selectedId: ""
      })
    } else {
      this.setState({
        selectedId: e.target.id 
      })
    }
  }
 
  render() {

    var termSearched = "false"
    var backButtonDisplay = "false"
    var fowardButtonDisplay = "true"

    if(this.state.querySearched){
      termSearched = "true"
    }
    
    if(this.state.page > 1) {
      backButtonDisplay = "true"
    }

    if(this.state.page > 9) {
      fowardButtonDisplay = "false"
    }

    return (
      <>
        <div>
          <h1>Search for Photos</h1>
          <input type="text" name="searchTerm" id="searchTerm" onChange={this.handleSearchTerm} value={this.state.value} />
          <input type="submit" onClick={this.getPhotos} />
          <p id="printPhotos">{this.createImages(this.state.fetchedPictures)}</p>
          <p>{this.state.searchTerm}</p>
          <div id="paginationButtons" className={termSearched}>
            <div id="backButton" className={backButtonDisplay}>
              <Button onClick={this.paginationDown}>Go Back</Button>
            </div>
            <div id="fowardButton" className={fowardButtonDisplay}>
              <Button onClick={this.paginationUp}>Go plus a page</Button>
            </div>
          </div>
        </div>
        <style jsx>
          {`
            #paginationButtons.false {
              display: none;
            }

            #backButton.false {
              display: none;
            }

            #fowardButton.false {
              display: none;
            }

            :global(.chosen) {
              border: 20px solid black;
            }
          `}
        </style>
      </>
    )
  }
}

export default PicturePicker