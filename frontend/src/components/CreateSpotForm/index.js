import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSpot, updateSpot } from '../../store/spot'
import { useHistory, useParams } from 'react-router-dom';
import LoginFormModal from '../LoginFormModal'

const CreatSpotForm = ({ editSpot, newSpot }) => {
  const dispatch = useDispatch();
  const { spotId } = useParams()
  const userId = useSelector(state => {
    return state?.session?.user?.id
  });

  const history = useHistory();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [pics, setPics] = useState({});
  const [picInputCounter, setPicInputCounter] = useState(0)
  const [price, setPrice] = useState('')

  const [errors, setErrors] = useState([]);


  let grabTitle;
  let grabDescription;
  let grabPics = null
  let grabPrice = 0


  useSelector(state => {
    grabTitle = state.spot[spotId]?.title
    grabDescription = state.spot[spotId]?.description
    grabPrice = state.spot[spotId]?.price
    if (state.spot[spotId] && state.spot[spotId].pictures.length) {

      grabPics = state.spot[spotId]?.pictures
    }


  })
  useEffect(() => {
    if (grabTitle) {
      setTitle(grabTitle)
      setDescription(grabDescription)
      setPrice(grabPrice)
    }
  }, [grabDescription, grabTitle, grabPrice])


  useEffect(() => {
    let tempPics = {}
    if (grabPics) {
      let countr = 0;
      for (let pic in grabPics) {
        let picture = grabPics[pic].picture
        tempPics[countr] = picture
        countr++
      }
      setPicInputCounter(countr + 1)
      setPics(tempPics)
    }
    return (pics) => pics
  }, [grabPics])


  const updateTitle = (e) => setTitle(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updatePrice = (e) => setPrice(e.target.value);

  const updateNumPics = (e) => {
    e.preventDefault()
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

    if (!title.length) {
      return setErrors(["Please include a title."])
    }
    if (!description.length) {
      return setErrors(["Please include a description."])
    }

    if (!price > 0) {
      return setErrors(["Please include a price."])
    }

    for (let pic in pics) {
      if (pics[pic] === '') delete pics[pic]
    }

    const payload = {
      title,
      description,
      price,
      userId,
      pics
    };
    let spot;
    if (newSpot) {
      spot = await dispatch(createSpot(payload))
        .catch(async (res) => {
          const data = await res.json()
          if (data && data.errors) setErrors(data.errors);

        })

    } else if (editSpot) {
      spot = await dispatch(updateSpot(payload, spotId))
        .catch(async (res) => {
          const data = await res.json()
          if (data && data.errors) setErrors(data.errors);

        })
    }
    if (spot) {
      history.push(`/spot/${spot.id}`);
    }
  };

  const handleDeletePicInput = async (e) => {
    e.preventDefault()
    let picToDelete = +e.target.id - 1
    let tempPics = pics
    delete tempPics[picToDelete]
    setPics(tempPics)
    setPicInputCounter(picInputCounter + 1)

  }


  const picUpdater = (e) => {
    let id = e.target.id
    setPics({ ...pics, [id]: e.target.value })

    return pics
  }
  let picInputs = [];
  for (let pic in pics) {
 
    picInputs.push(<span key={pic}>
      <div className="pic-input-container">
      <input
        type="url"
        id={`${pic}`}
        placeholder="Picture"
        value={pics[pic]}
        onChange={picUpdater}
        />
        <button className="small-btn small-red-btn" id={`${+pic + 1}`} onClick={handleDeletePicInput}>Delete</button>
      </div>
    </span>);
  }
  return (
    <section className="new-form-holder centered middled container">
      <form onSubmit={handleSubmit} className="form-control spot-form">
        <ul className="create-spot-error-container">
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={updateTitle}
          className="title-input"

        />
        <input
          type="text"
          placeholder="Price Per Night"
          value={price}
          onChange={updatePrice}
          className="title-input"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={updateDescription}
          className="input desc-input"
        />
        <div className="pic-holder">{
          picInputs
        }
          <button className="small-btn add-pic" onClick={updateNumPics}>{picInputCounter === 0 ? 'Add a Picture' : 'Add Another Picture'}</button>
        </div>

        <button className="small-btn" type="submit">{newSpot ? "Create new Spot!" : "Update this Spot!"}</button>
      </form>
    </section>
  );
};

export default CreatSpotForm;
