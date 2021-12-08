import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { createPokemon, getPokemonTypes } from '../store/pokemon';
import { createSpot } from '../../store/spot'
import { useHistory } from 'react-router-dom';
import { restoreUser } from '../../store/session'
import LoginFormModal from '../LoginFormModal'

const CreatePokemonForm = ({ hideForm }) => {
  // const pokeTypes = useSelector(state => state.pokemon.types);
  const dispatch = useDispatch();

  const userId = useSelector(state => {
    // console.log("STATE USER", state.session.user)
    return state?.session?.user?.id
  });
  // console.log(userId)


  const history = useHistory();
  // const [no, setNo] = useState(1);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [numPics, setNumPics] = useState(1);
  const [pics, setPics] = useState({});
  // const [exterior, setExterior] = useState(true);
  // const [count, setCount] = useState(0);
  // const [move1, setMove1] = useState('');
  // const [move2, setMove2] = useState('');

  // const updateNo = (e) => setNo(e.target.value);
  const updateTitle = (e) => setTitle(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updateNumPics = (e) => {
    e.preventDefault()
    setNumPics(numPics + 1)
  };
  // const updateExterior = () => setExterior(!exterior);
  // const updateType = (e) => setType(e.target.value);
  // const updateMove1 = (e) => setMove1(e.target.value);
  // const updateMove2 = (e) => setMove2(e.target.value);

  // useEffect(() => {
  //   dispatch(getPokemonTypes());
  // }, [dispatch]);

  // useEffect(() => {
  //   if (pokeTypes.length && !type) {
  //     setType(pokeTypes[0]);
  //   }
  // }, [pokeTypes, type]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      alert("Please Log In to Create a New Spot")
      return (
        <LoginFormModal />
      )

    }
    console.log('---------------------------------------------------------- payload pics', pics)

    const payload = {
      title,
      description,
      userId,
      pics
    };
    // console.log('herererererer')
    const spot = await dispatch(createSpot(payload));
    // console.log('SPOT', spot)
    if (spot) {
      history.push(`/spot/${spot.id}`);
    }
  };

  // https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpwW94OrHghgYQpK1htWKIhxJJ67qIlKX4Wg&usqp=CAU

  const picUpdater = (e, i) => {
    // console.log('target', e.target.value)
    let id = e.target.id
    setPics({ ...pics, [id]: e.target.value })
    // console.log('pics', pics)
    return pics
  }


  let picInputs = [];
  for (let i = 0; i < numPics; i++) {
    // note: we are adding a key prop here to allow react to uniquely identify each
    // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
    picInputs.push(<span key={i}>
      <input
        type="url"
        id={`picId-${i}`}
        placeholder="Picture"
        pattern="https://.*"
        onBlur={picUpdater}
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
        {/* <input
          type="number"
          placeholder="Attack"
          min="0"
          max="100"
          required
          value={title}
          onChange={updateTitle} />
        <input
          type="number"
          placeholder="description"
          min="0"
          max="100"
          required
          value={description}
          onChange={updateDescription} />
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={updateImageUrl} />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={updateName} />
        <input
          type="text"
          placeholder="Move 1"
          value={move1}
          onChange={updateMove1} />
        <input
          type="text"
          placeholder="Move 2"
          value={move2}
          onChange={updateMove2} />
        <select onChange={updateType} value={type}>
          {pokeTypes.map(type =>
            <option key={type}>{type}</option>
          )} */}
        {/* </select> */}
        <button type="submit">Create new Spot</button>
        {/* <button type="button" onClick={handleCancelClick}>Cancel</button> */}
      </form>
    </section>
  );
};

export default CreatePokemonForm;
