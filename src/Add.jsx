import React from "react";
import { useEffect } from "react";
import { useSelector ,useDispatch} from "react-redux";
import { getSongsFetch } from "./songState";
import { space,color} from "styled-system";
import { styled } from "styled-components";
import Header from "./Header";
import { addSongs } from "./songState";
import { useNavigate } from "react-router-dom";


function Add(){

    const Body = styled.div`
    ${space}
     padding:30px;
     background-color:#0F0F0F;
     border:none;
     border-radius:15px;
    
    
     display:flex;
     justify-content:center;
     align-items:end;
   `;
   const Button = styled.button`
 
  ${space}
  ${color}

  
  padding: 10px 10px;
  border-radius: 5px;
  border:none;
  font-size: 16px;
  cursor: pointer;
  width:100px;
  height:40px;
  background-color:#65B741;
  color:white;
  &:hover{
    background-color:green;
  }
`;

const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
};

const Audio = styled.audio`
 width: 180px;

@media(min-width:${breakpoints.tablet}){
    
    width:300px;
 
}
`;
const Image = styled.img`
width:200;
border-radius:50%
`;

const Ptext = styled.p`
${space}
 
  color:#ECB365;
  font-size:17px
`;     

        const dispatch = useDispatch();
        useEffect(()=>{
           dispatch(getSongsFetch());
        },[dispatch]);
       const songs = useSelector((state)=>state.songs.songs);
        const navigate = useNavigate();

        function addHandler(id,title,artistName,img,audioUrl){
         dispatch(addSongs({
            trackId:id,
            trackCensordName:title,
            artistName:artistName,
            artworkUrl100:img,
            previewUrl:audioUrl

         }))
         navigate("/")
        }
        
           return (
            <center>
              <Header title={"Music Site"}/>
                 <Body>
                 {songs.length > 0? (
                    <div>
               <table>
                 <thead>
                    <tr>
                       
                        <th></th>
                        <th></th> 
                        <th></th>

                    </tr>
                 </thead>
                <tbody> {songs.map((song,index)=>(
                    <tr key={index}style={{color:"#ECB365"}}>
                        <td>
                        <Image width={50}  src={song.artworkUrl100} alt='img'></Image>
                        </td>
                        <td>{song.trackCensoredName}{':'}{song.artistName}<br></br>
                        <Audio src={song.previewUrl} controls></Audio> 
                           </td>
            
                        <td>
                            <Button onClick={()=>addHandler(
                                song.trackId,
                                song.trackCensoredName,
                                song.artistName,
                                song.artworkUrl100,
                                song.previewUrl
                                )}>Add</Button>
                        </td>
                    </tr>
                    
                    ))}
                    
                </tbody>
               </table>
                  
              
           </div>
                 ):<Ptext>Loading...</Ptext>
                 
                 }
    
           </Body>
            </center>
          
          
           )
    
}

export default Add;


