import './App.css';
import Navigation from './components/Navigation';
import Logo from './components/Logo';
import ImageLinkForm from './components/ImageLinkForm.js';
import FaceRecognition from './components/FaceRecognition.js';
import Rank from './components/Rank.js';
import { Component } from 'react';
import ParticlesBg from 'particles-bg';
import Signin from './components/Signin.js';
import Register from './components/Register.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route:'signin',
      isSignedIn: false
    }
  }

  calculateFaceLocation = (data) => {
    const clarifyFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage')
    const width  = Number(image.width )
    const height = Number(image.height)
    console.log(clarifyFace)
    console.log(width, height)

    return{
      leftCol: clarifyFace.left_col * width,
      topRow: clarifyFace.top_row * height,
      rightCol: width - (clarifyFace.right_col * width),
      bottomRow: height - (clarifyFace.bottom_row * height),
    }
  }

  displayFaceBox = (box) => {
    console.log(box)
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});

    const PAT = '99fdf6f847c34361980880107d7010e1';
    const USER_ID = 'simi';       
    const APP_ID = 'SmartBrain';
 
    const MODEL_ID = 'face-detection'
    const IMAGE_URL = this.state.input;

    const raw = JSON.stringify({
      "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": IMAGE_URL
                  }
              }
          }
      ]
  });

   const requestOptions = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Key ' + PAT
    },
    body: raw
};


    fetch("https://api.clarifai.com/v2/models/" + 'face-detection' + "/outputs", requestOptions)
        .then(response => response.json())
        .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
        .catch(err => console.log(err));
}

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});

  }

  render() { 
   const {isSignedIn, imageUrl, route, box} = this.state
    return (
      <div className="App">
        <ParticlesBg type="circle" bg={true} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>

        { route === 'home' 
          ? <div>
          <Logo />
          <Rank />
          <ImageLinkForm 
            onInputChange={this.onInputChange} 
            onButtonSubmit={this.onButtonSubmit} />
          <FaceRecognition imageUrl={imageUrl} box={box}  />
        </div>
        : (
            route === 'signin'
            ?
            <Signin onRouteChange={this.onRouteChange}/> 
            :
            <Register onRouteChange={this.onRouteChange}/> 
          )
       
        }
      </div>
  );
 }
}

export default App;
