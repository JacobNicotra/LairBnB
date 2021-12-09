// frontend/src/components/LoginFormModal/LoginForm.js
import React, { useState } from "react";
// import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { updateSpot } from '../../store/spot'
import CreatSpotForm from "../CreateSpotForm";

function EditForm() {
  const dispatch = useDispatch();
  // const [credential, setCredential] = useState("");
  // const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    let title = 'individis'
    let description = 'description text'
    let userId = 109
    let pics = ['urlOfApic', 'another one']
    const payload = {
      title,
      description,
      userId,
      pics
    }
    const newSpot = dispatch(updateSpot(payload))

    //   setErrors([]);
    //   return dispatch(sessionActions.login({ credential, password })).catch(
    //     async (res) => {
    //       const data = await res.json();
    //       if (data && data.errors) setErrors(data.errors);
    //     }
    //   );
  };

  return (
    <>
      <CreatSpotForm editSpot={true} />
    </>
    // <form onSubmit={handleSubmit}>
    //   <h3>edit form</h3>
    //   <ul>
    //     {errors.map((error, idx) => (
    //       <li key={idx}>{error}</li>
    //     ))}
    //   </ul>
    //   <label>
    //     Username or Email
    //     <input
    //       type="text"
    //       value={"credential"}

    //       required
    //     />
    //   </label>
    //   <label>
    //     Password
    //     <input
    //       type="password"
    //       value={'password'}
    //       required
    //     />
    //   </label>
    //   <button type="submit">Log In</button>
    // </form>
  );
}

export default EditForm;
