// src/App.js

// import "./App.css";
import { useState } from "react";

function API() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [message, setMessage] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("https://www.rundowncreator.com/surrey/API.php?APIKey=samsarjudeen&APIToken=VzPXfFFfTy6mvOVxmIy4EMpYlU84lI&Action=getRundowns", {
        method: "POST",
        // body: JSON.stringify({
        //   name: name,
        //   email: email,
        //   mobileNumber: mobileNumber,
        // }),
      });
      let resJson = await res.json();
      console.log(resJson)
      if (res.status === 200) {
        setName("");
        setEmail("");
        setMessage("User created successfully");
      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="API">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          value={mobileNumber}
          placeholder="Mobile Number"
          onChange={(e) => setMobileNumber(e.target.value)}
        />

        <button type="submit">Create</button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </div>
  );
}

export default API;