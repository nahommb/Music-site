import React from "react";
import { Link , useNavigate} from "react-router-dom";
import { space,color,background, flex} from "styled-system";
import { styled } from "styled-components";
import Header from "./Header";
import { useSelector ,useDispatch} from "react-redux";
import { deleteSongs ,uploadSongs,deleteUpload} from "./songState";
import { Edit,Delete,Add } from "@mui/icons-material";
import { useState } from "react";
import musicimage from './images/music2.jpg'
import AudioPlayer from 'react-h5-audio-player';


function Home(){

const Body = styled.div`
 ${space}
${color}
${background}
  padding:10px;
  border:2px dotted gray;
  border-radius:15px;
  padding-bottom:35px;
  
  display:flex;
  justify-content:center; 
  font-family: Arial, Helvetica, sans-serif;
  
`;

const H2text = styled.h2`
  color:#ECB365;
`;

const Ptext = styled.p`
 ${space}
  
   color:#ECB365;
   font-size:17px
`;

const Button = styled.button`

  ${space}
  ${color}

  padding: 10px 10px;
  border-radius: 10px;
  border:none;
  font-size: 16px;
  cursor: pointer;
  width: ${(props)=>props.width};
  height:45px;
  background-color:${(props)=>props.bg};
  color:white;
  &:hover{
    background-color:${(props)=>props.hoverColor}
  }
 
`;
const MusicCont = styled.div`
    justify-content: center;
    display: grid;
    grid-template-columns: 100px;
    grid-template-columns: repeat(auto-fill,minmax(25rem,100px));
    grid-gap:10px;
    width:100%;
    align-items:center;
   
`;

const Image = styled.img`
    width: 150px;
    height:150px;
    border-radius: 20px;
`;

const Audio = styled.audio`
 width: 150px;
 &:hover{
    width:300px;
 }

`;

const DivMusic = styled.div`
display:flex;
justify-content:center;
align-items:center;
`;
const MusicImage = styled.img`
width:100%;
height:150px;
border-radius:20px
`;
const StyledFileInput = styled.input`
  padding: 0.5em;
  background-color: #black;
  border: 1px solid #ECB365;
  border-radius: 10px;
  color: #ECB365;
  font-size: 1em;
`;


   const songsList = useSelector((state)=>state.songs.userAddedSongs)
   const dispatch = useDispatch();
   const navigate = useNavigate();

    function handleDelete(id){
       dispatch(deleteSongs({
        trackId:id,
       }))
       navigate("/");
    }
   

   const [audioFile, setAudioFile] = useState(null);
  
    
   function upLoad(){
    if(audioFile!==null){
        dispatch(uploadSongs({
        audio:audioFile
    }))
    }
   }
   function deleteUploaded(name){
     dispatch(deleteUpload({
        name:name
     }))
   }
  
   const uploadedList = useSelector((state)=>state.songs.upload);
   
    return ( 
        
        <center>
            <Header title ="Music Site" margin ={10} mb={0}/> 
            <MusicImage src={musicimage}></MusicImage>
            <DivMusic>
            <Ptext mr={3}>Add from Device</Ptext> 
            <StyledFileInput type="file" accept="audio" onChange={(e) => setAudioFile(e.target.files[0])} />
            {audioFile && <audio src={URL.createObjectURL(audioFile)} controls />}
            <Button onClick={upLoad} bg={'#FB8B24'} width={"100px"} hoverColor={"#E36414"} ml={1}>Add</Button>
            </DivMusic>

            <div>
              {uploadedList.length > 0 ? ( 
               <MusicCont >
                { uploadedList.map((upl,index)=>(
                    <div key={index}>
                      <div>
                        <Ptext>{upl.audio.name.slice(0,25)}</Ptext>
                       {upl.audio && <audio src={URL.createObjectURL(upl.audio)} controls ></audio>} <br/>
                      </div> 
                      
                    <Button ml={2} bg={"#FF5B00"} hoverColor={"#D21312"} onClick={() => deleteUploaded(upl.audio.name)}>
                      <Delete></Delete>
                    </Button>
                  
                    
                    </div>
                    
                )) 
            }   
              </MusicCont>
               ):<section></section>
            
            }
         </div>
            

            <Body mt={40} mb={20} >
            {songsList.length > 0 ? (
                <MusicCont>
                     {songsList.map((songs,index)=>(
                        <div key={index}>
                        <Ptext>{songs.artistName}</Ptext>
                         <Image src={songs.artworkUrl100} alt="img" /> <br/>
                        <Audio src={songs.previewUrl} controls></Audio> <br/>
                        <Link to={`/edit/${songs.trackId}`}>
                            <Button bg={"#3F2305"} hoverColor={"gray"}>
                                <Edit></Edit>
                            </Button>
                        </Link>
                    <Button ml={2} bg={"#FF5B00"} hoverColor={"#D21312"} onClick={() => handleDelete(songs.trackId)}>
                      <Delete></Delete>
                    </Button>
                </div>
                   
                ))
                }
                </MusicCont>
               
            
            ):<H2text>Add  List of Songs You Want From itunes</H2text>
            
            }
            
            </Body>  
            <div>
            <Link to={"/add"}><Button bg={"#65B741"} hoverColor={"green"} width={"120px"} ><Add></Add></Button></Link>
         
            </div>
         
            </center>
    )
}

export default Home;
