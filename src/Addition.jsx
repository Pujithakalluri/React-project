import { useRef } from "react";

function Addition() {

  const num1Ref = useRef();
  const num2Ref = useRef();
  const resultRef = useRef();   // ref for result textbox

  const addlogics = (e) => {
    e.preventDefault();

    let num1 = Number(num1Ref.current.value);
    let num2 = Number(num2Ref.current.value);

    let sum = num1 + num2;

    resultRef.current.value = sum;   // set result to textbox

    num1Ref.current.value = "";
    num2Ref.current.value = "";
  };

  return (
    <form onSubmit={addlogics}>
      <input type="number" ref={num1Ref} placeholder="Enter first number" />
      <input type="number" ref={num2Ref} placeholder="Enter second number" />

      <button type="submit">Add</button>

      <br /><br />

      <input type="text" ref={resultRef} placeholder="Result"/>
    </form>
  );
}

export default Addition;
