import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import { useHistory } from 'react-router-dom';



import greyjoy from '../../images/greyjoy_yara.png'
import bolton from '../../images/bolton_ramsey.png'
import stark from '../../images/stark_jon.png'
import lannister from '../../images/lannister_cersei.png'
import targaryen from '../../images/targaryen_daenerys.png'
import tyrell from '../../images/tyrell_olenna.png'
import baratheon from '../../images/baratheon.png'
import martell from '../../images/martell_oberyn.png'

function EditForm() {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = (username) => {
    dispatch(sessionActions.login({ credential: username, password: "password" }));
    history.push(`/spots`);

  };



  return (
    <main id="home-page-main">
      <h2 id="welcome-text2">Browse the many accomodations available throughout the Seven Kingdoms and beyond.</h2>

      <span id="banner-container">
        <img onClick={() => handleSubmit('Yara Greyjoy')} src={greyjoy} alt="greyjoy" />
        <img onClick={() => handleSubmit('Ramsey Bolton')} src={bolton} alt="bolton" />
        <img onClick={() => handleSubmit('Jon Snow')} src={stark} alt="stark" />
        <img onClick={() => handleSubmit('Cersei Lannister')} src={lannister} alt="lannister" />
        <img onClick={() => handleSubmit('Daenerys Targaryen')} src={targaryen} alt="targaryen" />
        <img onClick={() => handleSubmit('Olenna Tyrell')} src={tyrell} alt="tyrell" />
        <img onClick={() => handleSubmit('Stannis Baratheon')} src={baratheon} alt="baratheon" />
        <img onClick={() => handleSubmit('Oberyn Martell')} src={martell} alt="martell" />
      </span>
      <h3 id="welcome-text3">To make a booking, or list your own lair, log in.</h3>
      <h3 id="welcome-text4"> If you do not have an acount, you can sign up or choose a banner above to continue as a guest user</h3>

    </ main>

  );
}

export default EditForm;
