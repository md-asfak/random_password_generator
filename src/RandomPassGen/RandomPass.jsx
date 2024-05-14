import React, { useCallback, useEffect, useRef, useState } from "react";

export default function RandomPass() {
  const [lenght, setLenght] = useState(10);
  const [charAllowed, setCharAllowed] = useState(false);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKMNOPQESTUVWXYZabcdefghijkmnopqrstwxyz";
    if (numberAllowed) {
      str += "1234567890";
    }
    if (charAllowed) {
      str += "!@#$%^&*()}{][><?/|";
    }
    for (let i = 1; i <= lenght; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [lenght, charAllowed, numberAllowed, setPassword]);

  useEffect(() => {
    passGenerator();
  }, [lenght, charAllowed, numberAllowed, passGenerator]);

  // Password copy
  let inputRef = useRef(null);

  const copyPassHundle = useCallback(() => {
    window.navigator.clipboard.writeText(password); // password copy interface
    inputRef.current?.select(); // password copy
  }, [password]);
  return (
    <div className=" grid place-items-center">
      <div className="w-[500px] mt-[40px] bg-[#EE99C2] p-9">
        <h1 className="text-center text-3xl">Random Password Generator</h1>
        <div className="flex items-center justify-center gap-5 my-5 sm:flex-row">
          <input
            type=" text"
            readOnly
            className="border-2 w-60 py-1 rounded-md pl-3"
            value={password}
            ref={inputRef}
          />
          <button
            className="bg-[#0C359E] text-white py-1 px-3 text-sm rounded-md"
            onClick={copyPassHundle}
          >
            Copy
          </button>
        </div>
        <div className="flex items-center justify-center gap-5 sm:flex-row">
          <div className="flex items-center justify-center gap-3 ">
            <input
              type="range"
              className="w-32"
              min={6}
              max={20}
              value={lenght}
              onChange={(e) => setLenght(e.target.value)}
            />
            <span>Length: {lenght}</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            <span> Number</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              onChange={() => setCharAllowed((prev) => !prev)}
            />
            <span>Character</span>
          </div>
        </div>
      </div>
    </div>
  );
}
