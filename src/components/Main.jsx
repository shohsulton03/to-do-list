import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { COUNTRYS } from "../static";
import { PatternFormat } from "react-number-format";

const Main = () => {
  const [username, setUsername] = useState("");
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("")
  const fname = useRef(null);
  const lname = useRef(null);
  const password = useRef(null);
  const birth = useRef(null);

  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("data")) || []
  );
  const [edit, setEdit] = useState(null);

  console.log("Main render");

  useEffect(() => {
    if (data.length) {
      localStorage.setItem("data", JSON.stringify(data));
    }
  }, [data]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(edit);
    if (edit) {
      let updatedUser = {
        id: edit.id,
        fname: fname.current.value,
        lname: lname.current.value,
        username,
        password: password.current.value,
        country,
        gender,
        birth: birth.current.value,
        phone
      };
      setData((prev) =>
        prev.map((item) => (item.id === edit.id ? updatedUser : item))
      );
      setEdit(null);
      //   const index = data.findIndex(item => item.id === edit.id)
      //   data.splice(index, 1, updatedUser)
      //   setData(data)
    } else {
      const newUser = {
        id: uuidv4(),
        fname: fname.current.value,
        lname: lname.current.value,
        username,
        password: password.current.value,
        country,
        gender,
        birth: birth.current.value,
        phone
      };
      setData((prev) => [...prev, newUser]);
    }
    setUsername("");
    password.current.value = "";
    fname.current.value = "";
    lname.current.value = "";
    setCountry("");
    setGender("");
    birth.current.value = "";
    setPhone("")
  };

  const handleDelete = function (id) {
    if (confirm("Are you sure?")) {
      setData((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleEdit = (item) => {
    fname.current.value = item.fname;
    lname.current.value = item.lname;
    setUsername(item.username);
    password.current.value = item.password;
    setCountry(item.country);
    setCountry(item.gender);
    birth.current.value = item.birth;
    setPhone(item.phone)
    setEdit(item);
  };

  return (
    <div className="flex gap-5">
      <form
        onSubmit={handleSubmit}
        className="w-80 p-5 bg-slate-200 h-screen"
        action=""
      >
        <input
          required
          ref={fname}
          className="w-full h-10 px-3 mb-3 outline-none"
          type="text"
          placeholder="fname"
        />
        <input
          required
          ref={lname}
          className="w-full h-10 px-3 mb-3 outline-none"
          type="text"
          placeholder="lname"
        />
        <input
          required
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          className="w-full h-10 px-3 mb-3 outline-none"
          type="text"
          placeholder="username"
        />
        <input
          minLength={6}
          required
          ref={password}
          className="w-full h-10 px-3 mb-3 outline-none"
          type="password"
          placeholder="password"
        />
        <select
          required
          value={country}
          onChange={(event) => setCountry(event.target.value)}
          className="w-full h-10 px-3 mb-3 outline-none"
        >
          <option value="" disabled>
            Select your country
          </option>
          {COUNTRYS.map((country) => (
            <option key={country.id} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>
        <div className="mb-3">
          <label className="mr-3">
            <input
              type="radio"
              value="Male"
              checked={gender === "Male"}
              onChange={(event) => setGender(event.target.value)}
            />
            Male
          </label>
          <label className="mr-3">
            <input
              type="radio"
              value="Female"
              checked={gender === "Female"}
              onChange={(event) => setGender(event.target.value)}
            />
            Female
          </label>
          <label className="mr-3">
            <input
              type="radio"
              value="Female"
              checked={gender === "Kvadrober"}
              onChange={(event) => setGender(event.target.value)}
            />
            Kvadrober
          </label>
        </div>
        <input
          required
          ref={birth}
          className="w-full h-10 px-3 mb-3 outline-none"
          type="date"
          placeholder="Birthday"
        />
        <PatternFormat
          format="+998 (##) ### ## ##"
          allowEmptyFormatting
          mask="_"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          className="w-full h-10 px-3 mb-3 outline-none"
          placeholder="Phone Number"
        />
        <button className="w-full h-10 px-3 mb-3 bg-blue-400">Create</button>
      </form>
      <div className="flex-1 flex gap-3 flex-wrap items-start content-start py-5">
        {data?.map((item) => (
          <div
            key={item.id}
            className="w-72 p-3 shadow text-center flex flex-col gap-2"
          >
            <div className="w-20 h-20 bg-slate-300 rounded-full mx-auto"></div>
            <h3>
              {item.fname}-{item.lname}
            </h3>
            <h3>{item.username}</h3>
            <p>{item.password}</p>
            <p>{item.country}</p>
            <p>{item.gender}</p>
            <p>{item.birth}</p>
            <p>{item.phone}</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-300 p-1 rounded-lg"
              >
                delete
              </button>
              <button
                onClick={() => handleEdit(item)}
                className="bg-green-300 p-1 rounded-lg"
              >
                edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;
