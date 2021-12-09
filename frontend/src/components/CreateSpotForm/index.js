import { PureComponent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSpot, updateSpot } from '../../store/spot'
import { useHistory, useParams } from 'react-router-dom';
import { restoreUser } from '../../store/session'
import LoginFormModal from '../LoginFormModal'

const CreatSpotForm = ({ hideForm, editSpot, newSpot }) => {
  const dispatch = useDispatch();
  const { spotId } = useParams()
  // console.log(spotId, 'the id')
  const userId = useSelector(state => {
    return state?.session?.user?.id
  });

  const history = useHistory();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [numPics, setNumPics] = useState(1);
  const [pics, setPics] = useState({});
  const [picInputCounter, setPicInputCounter] = useState(0)
  // const [picInputs, setPicInputs] = useState()

  // updating / editing 
  let grabTitle;
  let grabDescription;
  let grabPics

  // let picInputs = [];

  const grabStuff = useSelector(state => {
    grabTitle = state.spot[spotId].title
    grabDescription = state.spot[spotId].description
    // picInputs = state.spot.pictures
    grabPics = state.spot[spotId].pictures


  })
  // console.log('titls', grabTitle, grabDescription)
  useEffect(() => {
    if (grabTitle) {
      setTitle(grabTitle)
      setDescription(grabDescription)
    }
  }, [])
  useEffect(() => {
    let tempPics = {}
    if (grabPics) {
      let countr = 0;
      for (let pic in grabPics) {
        console.log('pic in folrloop', grabPics[pic])
        let id = grabPics[pic].id
        let picture = grabPics[pic].picture
        // console.log('PIIICCCS', pics)
        tempPics[countr] = picture
        countr++
      }
      setPicInputCounter(countr + 1)
      setPics({ ...pics, ...tempPics })
    }
    return (pics) => pics
  }, [])
  console.log('end pics', pics)


  const updateTitle = (e) => setTitle(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);

  const updateNumPics = (e) => {
    e.preventDefault()
    // setNumPics(numPics + 1)
    let id = picInputCounter
    setPics({ ...pics, [id]: "" })
    setPicInputCounter(picInputCounter + 1)

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      alert("Please Log In to Create a New Spot")
      return (
        <LoginFormModal />
      )

    }

    const payload = {
      title,
      description,
      userId,
      pics
    };
    let spot;
    if (newSpot) {
      spot = await dispatch(createSpot(payload));

    } else if (editSpot) {
      spot = await dispatch(updateSpot(payload, spotId));
    }
    if (spot) {
      history.push(`/spot/${spot.id}`);
    }
  };

  // https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpwW94OrHghgYQpK1htWKIhxJJ67qIlKX4Wg&usqp=CAU

  // const picUpdater = (e, i) => {
  //   let id = e.target.id
  //   setPics({ ...pics, [id]: e.target.value })
  //   // console.log('pics', pics)
  //   return pics
  // }
  const picUpdater = (e) => {
    let id = e.target.id
    setPics({ ...pics, [id]: e.target.value })
    // console.log('pics', pics)
    // console.log('picupdater pics', pics)
    return pics
  }
  console.log(' * * * * * pics', pics)
  let picInputs = [];
  // for (let i = 0; i < numPics; i++) {
  for (let pic in pics) {
    // note: we are adding a key prop here to allow react to uniquely identify each
    // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
    picInputs.push(<span key={pic}>
      <input
        type="url"
        id={`${pic}`}
        placeholder="Picture"
        pattern="https://.*"
        value={pics[pic]}
        // onBlur={picUpdater}
        onChange={picUpdater}
      />
    </span>);
  }
  // console.log(picInputs)
  return (
    <section className="new-form-holder centered middled">
      <h1>FORM</h1>
      {/* <button onClick={dispatch(restoreUser())}> user info</button> */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          required
          value={title}
          onChange={updateTitle}
        />
        <textarea
          placeholder="Description"
          required
          value={description}
          onChange={updateDescription}
        />
        <div>{
          picInputs
        }
          <button onClick={updateNumPics}>Add Another Picture</button>
        </div>

        <button type="submit">{newSpot ? "Create new Spot!" : "Update this Spot!"}</button>
        {/* <button type="button" onClick={handleCancelClick}>Cancel</button> */}
      </form>
    </section>
  );
};

export default CreatSpotForm;
