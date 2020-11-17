import logo from './logo.svg';
import {useState, useEffect} from 'react'
import './App.css';

import {createFFmpeg, fetchFile} from '@ffmpeg/ffmpeg'
const ffmpeg = createFFmpeg( {log:true})

function App() {

  const [ready, setReady] =useState(false)
  const [video,setVideo] = useState() 
  const [gif,setGif] = useState()
  const load = async() => {
    await ffmpeg.load()
    setReady(true)
  }
  useEffect(() => {   
    load()
   },[]);

  
  const convertToGif = async () => {
    ffmpeg.FS ('writeFile','test.mp4',await fetchFile(video))
    await ffmpeg.run('-i','test.mp4','-t','10','-f','gif','out.gif')
    const data = ffmpeg.FS('readFile', 'out.gif')

    const url = URL.createObjectURL(new Blob([data.buffer]), {type : 'image/gif'})
    setGif(url)
  }

  return ready ?(
    <div className="App">
      {video &&  <video controls
                  width="250"
                  src = {URL.createObjectURL(video)}> 
                </video>}

       <button onClick = {convertToGif}>CONVERT</button> 
       {gif && <img src = {gif} />}
      
      
      <input type = "file" onChange = {(e) => setVideo (e.target.files?.item(0))}/>

    </div>
  ) :  (<p> Loading</p>)
}

export default App;
