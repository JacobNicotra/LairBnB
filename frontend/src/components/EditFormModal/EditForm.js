
import CreatSpotForm from "../CreateSpotForm";

function EditForm() {

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
