import React, { useState } from "react";
import { Alert, AlertTitle, Button, Grid, IconButton, TextField, Card, Box } from '@mui/material';
import Typography from '@mui/material/Typography';
import { ADD_NOTE, DELETE_NOTE, UPDATE_CHARACTER } from '../utils/mutations';
import { useHistory } from "react-router";
import { Add, Remove } from "@mui/icons-material";
import { useMutation } from "@apollo/client";
import { __Field } from "graphql";
import Auth from '../utils/auth';

 const getModifier = score => Math.floor((score - 10)/2);
let barbarianHp = 12;
let bardHp = 8;
let clericHp = 8;
let druidHp = 8;
let fighterHp = 10;
let monkHp = 8;
let paladinHp = 10;
let rangerHp = 10;
let rogueHp = 8;
let sorcererHp = 6;
let warlockHp = 8;
let wizardHp = 6;
const barbarian = "barbarian";
const bard = "bard";
const cleric = "cleric";
const druid = "druid";
const fighter = "fighter";
const monk = "monk";
const paladin = "paladin";
const ranger = "ranger";
const rogue = "rogue";
const sorcerer = "sorcerer";
const warlock = "warlock";
const wizard = "wizard";



const CharSheet = ({character}) => {
  const [charData, setCharData] = useState({...character});
  const [noteData, setNoteData] = useState({title: '', text: '' });
  const [showCreateNote, setShowCreateNote] = useState(false);
  const [addNote, { addError }] = useMutation(ADD_NOTE);
  const [deleteNote, { deleteError }] = useMutation(DELETE_NOTE);
  const [updateCharacter, { uperror }] = useMutation(UPDATE_CHARACTER);
  console.log(charData);
  const handleInputChange = async (event) => {
    const { name, value } = event.target;
    setCharData({ ...charData, [name]: JSON.parse(value) })
    
  };
  const handleUpdate = async (event) => {
    try {
      const { data } = await updateCharacter({
        variables: {
          characterId: character._id,
          characterToUpdate: 
          {
          _id: charData._id,
          characterName: charData.characterName,
          className: charData.className,
          race: charData.race,
          hitPoints: charData.hitPoints,
          strength: charData.strength,
          dexterity: charData.dexterity,
          constitution: charData.constitution,
          intelligence: charData.intelligence,
          wisdom: charData.wisdom,
          charisma: charData.charisma,},
          madeBy: Auth.getProfile().data.username,
        },
      });
    } catch (error) {
      console.log(JSON.parse(JSON.stringify(error)));
    }
  }
  

  const toggleCreate = () => {
    setShowCreateNote(!showCreateNote);
  }

  const handleNoteChange = (event) => {
    const { name, value } = event.target;
    setNoteData({...noteData, [name]: value});
  }

  const submitNote = async (event) => {
    event.preventDefault();
   
    try {
      const { data } = await addNote({variables: {characterId: charData._id, noteToSave: noteData}});
      console.log(data.addNote);
      setShowCreateNote(false);
      setNoteData({title:'', text:''});
      setCharData(data.addNote);
      //history.push(0)
    } catch (err) {
      console.log(JSON.parse(JSON.stringify(err)));
    }
  }

  const removeNote = async (noteId) => {
    try {
      await deleteNote({variables: { characterId: charData._id, noteToDelete: noteId}});
      setCharData({...charData, notes: charData.notes.filter((note) => note._id !== noteId)});
    } catch (err) {
      console.log(JSON.parse(JSON.stringify(err)));
    }
  }

  const getHpTotal = () => {
  
    if (charData.className === barbarian) {
      charData.hitPoints = barbarianHp + getModifier(charData.constitution)
    }
    if (charData.className === bard) {
      charData.hitPoints = bardHp + getModifier(charData.constitution)
    }  
    if (charData.className === cleric) {
      charData.hitPoints = clericHp + getModifier(charData.constitution)
    }  
    if (charData.className === druid) {
      charData.hitPoints = druidHp + getModifier(charData.constitution)
    }     
    if (charData.className === fighter) {
      charData.hitPoints = fighterHp + getModifier(charData.constitution)
    }     
    if (charData.className === monk) {
      charData.hitPoints = monkHp + getModifier(charData.constitution)
    }     
    if (charData.className === paladin) {
      charData.hitPoints = paladinHp + getModifier(charData.constitution)
    }      
    if (charData.className === ranger) {
      charData.hitPoints = rangerHp + getModifier(charData.constitution)
    }          
    if (charData.className === rogue) {
      charData.hitPoints = rogueHp + getModifier(charData.constitution)
    }     
    if (charData.className === sorcerer) {
      charData.hitPoints = sorcererHp + getModifier(charData.constitution)
    }     
    if (charData.className === warlock) {
      charData.hitPoints = warlockHp + getModifier(charData.constitution)
    }     
    if (charData.className === wizard) {
      charData.hitPoints = wizardHp + getModifier(charData.constitution)
    }   
    return charData.hitPoints;  
  
  };

  return (
    <>
      {uperror && (
        <Alert severity="error" onClose={() => {}}>
          <AlertTitle>Error</AlertTitle>
          An error occured while trying to update your character.
        </Alert>
      )}
      <Box sx={{ flexGrow: 1, backgroundColor: "white" }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid item xs={2} sm={4} md={4} >
          <Typography variant="h4">
          Character: {charData.characterName}
          </Typography>
        </Grid>
        <Grid item xs={2} sm={4} md={4} >
        <Typography variant="h4">
          Creator: {charData.madeBy}
        </Typography>
        </Grid>
          
        <Grid item xs={4}>
          <Typography variant="h5">
            Race: {charData.race}
          </Typography>
          <Typography variant="h5">
            Class: {charData.className}
          </Typography>   
        </Grid>
        <Grid item xs={4}>
          <h3 className="charHP"><span>HP  </span>{getHpTotal()}</h3>
          <h3 className="charAlignment">{charData.alignment}</h3>
        </Grid>

        <Grid item xs={4} >
          <table style={{textAlign: "center"}}>
            <tbody style={{textAlign: "center"}}>
              <tr>
                <th>Ability</th>
                <th>Score</th>
                <th>Modifier</th>
              </tr>
              <tr>
                <td>Strength</td>
                <td style={{textAlign: "center"}}>
                  <TextField size="small" type="number" name="strength" value={charData.strength} id="strScore" onChange={handleInputChange} onBlur={handleUpdate} sx={{maxWidth: {xs: "50px", md: "100px", lg: "194px"}}}></TextField>
                </td>
                <td style={{textAlign: "center"}}>
                  <TextField size="small" disabled type="number" value={getModifier(charData.strength)} id="strMod" sx={{maxWidth: {xs: "50px", md: "100px", lg: "194px"}}}></TextField>
                </td>
              </tr>
              <tr>
                <td>Dexterity</td>
                <td style={{textAlign: "center"}}>
                  <TextField size="small" type="number" name="dexterity" value={charData.dexterity} id="dexScore" onChange={handleInputChange} onBlur={handleUpdate} sx={{maxWidth: {xs: "50px", md: "100px", lg: "194px"}}}></TextField>
                </td>
                <td style={{textAlign: "center"}}>
                  <TextField size="small" disabled type="number" value={getModifier(charData.dexterity)} id="dexMod" sx={{maxWidth: {xs: "50px", md: "100px", lg: "194px"}}}></TextField>
                </td>
              </tr>
              <tr>
                <td>Constitution</td>
                <td style={{textAlign: "center"}}>
                  <TextField size="small" type="number" name="constitution" value={charData.constitution} id="conScore" onChange={handleInputChange} onBlur={handleUpdate} sx={{maxWidth: {xs: "50px", md: "100px", lg: "194px"}}}></TextField>
                </td>
                <td style={{textAlign: "center"}}>
                  <TextField size="small" disabled type="number" value={getModifier(charData.constitution)} id="conMod" sx={{maxWidth: {xs: "50px", md: "100px", lg: "194px"}}}></TextField>
                </td>
              </tr>
              <tr>
                <td>Intelligence</td>
                <td style={{textAlign: "center"}}>
                  <TextField size="small" type="number" name="intelligence" value={charData.intelligence} id="intScore" onChange={handleInputChange} onBlur={handleUpdate} sx={{maxWidth: {xs: "50px", md: "100px", lg: "194px"}}}></TextField>
                </td>
                <td style={{textAlign: "center"}}>
                  <TextField size="small" disabled type="number" value={getModifier(charData.intelligence)} id="intMod" sx={{maxWidth: {xs: "50px", md: "100px", lg: "194px"}}}></TextField>
                </td>
              </tr>
              <tr>
                <td>Wisdom</td>
                <td style={{textAlign: "center"}}>
                  <TextField size="small" type="number" name="wisdom" value={charData.wisdom} id="wisScore" onChange={handleInputChange} onBlur={handleUpdate} sx={{maxWidth: {xs: "50px", md: "100px", lg: "194px"}}}></TextField>
                </td>
                <td style={{textAlign: "center"}}>
                  <TextField size="small" disabled type="number" value={getModifier(charData.wisdom)} id="wisMod" sx={{maxWidth: {xs: "50px", md: "100px", lg: "194px"}}}></TextField>
                </td>
              </tr>
              <tr>
                <td>Charisma</td>
                <td style={{textAlign: "center"}}>
                  <TextField size="small" type="number" name="charisma" value={charData.charisma} id="chaScore" onChange={handleInputChange} onBlur={handleUpdate} sx={{maxWidth: {xs: "50px", md: "100px", lg: "194px"}}}></TextField>
                </td>
                <td style={{textAlign: "center"}}>
                  <TextField size="small" disabled type="number" value={getModifier(charData.charisma)} id="chaMod" sx={{maxWidth: {xs: "50px", md: "100px", lg: "194px"}}}></TextField>
                </td>
              </tr>
            </tbody>
          </table>
        </Grid>
        <Grid item xs={4}>
          <h3>Player Level</h3>
          <br/>
          <TextField type="number" name="level" id="charLevel" min="1" max="20" value={1} onChange={handleInputChange}></TextField>
        </Grid>

        <Grid item xs={4}>
          <h3>Proficiency Bonus</h3>
          <br/>
          <TextField type="number" id="profBonus" value={Math.ceil((1/4) + 1)}></TextField>
        </Grid>

        <Grid item xs={12}>
          <h3>Notes <IconButton onClick={toggleCreate}><Add/></IconButton></h3>
          {addError && (
            <Alert severity="error" onClose={() => {}}>
              <AlertTitle>Error</AlertTitle>
              An error occured while trying to add the note.
            </Alert>
          )}
          {deleteError && (
            <Alert severity="error" onClose={() => {}}>
              <AlertTitle>Error</AlertTitle>
              An error occured while trying to delete the note.
            </Alert>
          )}
          {showCreateNote && (
            <div id="createNote" >
              <TextField name="title" placeholder="Title" onChange={handleNoteChange}></TextField>
              <TextField multiline name="text" onChange={handleNoteChange}></TextField>
              <Button onClick={submitNote}>Submit</Button>
            </div>
          )}
          {charData.notes.map((note) => 
            <div key={note._id} className="note">
              <h4>{note.title} <IconButton onClick={() => removeNote(note._id)}><Remove/></IconButton></h4>
              <h5>{note.timestamp}</h5>
              <p>{note.text}</p>
            </div>
          )}
        </Grid>
      </Grid>
      </Box>
    </>
  );
};

export default CharSheet;
