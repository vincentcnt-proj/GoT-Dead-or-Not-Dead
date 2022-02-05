import {useState, useRef} from 'react'
import ModalList from './Components/ModalList';
import Backdrop from './Components/Backdrop';

function App() {
  //Set State Handlers for our modal and backdrop
  const [modals, setModals] = useState([]);
  const [backdropIsOpen, setBackdropIsOpen] = useState(false);

  //Set Reference to grab input from characterName input
  const characterNameRef = useRef();

  //Handler for removing the Modal and Backdrop
  function closeModalHandler(){
    //Clear the modals
    setModals([]);
    //Set the backdrop State to remove the render
    setBackdropIsOpen(false);
  }

  //Const array for possible characterStatus
  const charStatusList = ["alive", "dead", "unknown"]

  //Handler for the Discover button
  function handleDiscover(event){
    //Cautionary preventDefault
    event.preventDefault();
    //Get value from the input
    const characterName = characterNameRef.current.value;

    //Only continue if the input was not empty or populated by blank spaces
    if(characterName === '' || !characterName.trim()) return;

    try{
      //GET Request to the API
      fetch(`https://www.anapioficeandfire.com/api/characters?name=${characterName}`).then((response)=>{
        //Process response with json for handling
        return response.json();
      }).then((data) =>{
        //Get the first element of the returned array
        var charInfo = data[0];

        //If data is present then process
        if(charInfo){
          //If died element is empty then character is alive
          if(charInfo.died === ""){
            //Set the ModalList for Modal population; id is irrelevant as only one modal will exist at a time
            setModals(()=>{
              return [{id: 1, characterName: characterName, characterStatus: charStatusList[0], deathYear: ""}]
            })
          //If died element is not-empty then character is dead
          }else{
            //Set the ModalList for Modal population; id is irrelevant as only one modal will exist at a time
            setModals(()=>{
              return [{id: 1, characterName: characterName, characterStatus: charStatusList[1], deathYear: charInfo.died}]
            })
          }
        //If no character was found then proceed as unknown
        }else{
          //Set the ModalList for Modal population; id is irrelevant as only one modal will exist at a time
          setModals(()=>{
            return [{id: 1, characterName: "", characterStatus: charStatusList[2], deathYear: ""}]
          })
        }
      })
    }catch{
      //Treat an error as an unknown for now
      //Set the ModalList for Modal population; id is irrelevant as only one modal will exist at a time
      setModals(()=>{
        return [{id: 1, characterName: "", characterStatus: charStatusList[2], deathYear: ""}]
      })
    }

    //Clear input
    characterNameRef.current.value = null;

    //Set Backdrop State to render
    setBackdropIsOpen(true);
  }

  /*
  Wrap within a column flexbox for center-center positioning
  ModalList will populate with modals that exist at the highest z-index and sit above the input on most screens
  Backdrop will render when a Modal is present and controls closing the modal
  */
  return (
    <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center p-2 bd-highlight">
      <ModalList modals={modals}/>
      {backdropIsOpen ? <Backdrop onClick={closeModalHandler}/> : null}
      <div className ='p-2 bd-highlight'>
        <div>
            <h1>Would you like to learn a fate?</h1>
        </div>
        <div className="input-group mb-3">
          <input ref ={characterNameRef} type="text" className="form-control" placeholder="Prepare a name..." aria-label="Recipient's username" aria-describedby="button-addon2"/>
          <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={handleDiscover}>Discover</button>
        </div>
      </div>
    </div>
  );
}

export default App;
