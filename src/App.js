import { useEffect, useState } from "react";

export default function App() {
  const [bankData, setBankData] = useState({});
  const [initialvalue, setInitialValue] = useState("");
  const [ifcCode, setIfcCode] = useState("");
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!ifcCode) return;
    fetch(`https://ifsc.razorpay.com/${ifcCode}`)
      .then((res) => {
        //   res.ok ? return res.json() : {throw new Error("Couldn't fetch")};
        if (!res.ok) {
          throw new Error("Couldn't fetch");
        } else {
          setShow(true);
          return res.json();
        }
      })
      .then((data) => setBankData(data))
      .catch((err) => {
        setBankData({});
        setShow(false);
        console.error(
          `your IFSC is not valid so ${err.message} the bank details`
        );
        alert("you have entered wrong IFSC code");
      });
  }, [ifcCode]);
  console.log(ifcCode);
  console.log(bankData);
  return (
    <div className="container">
      <div className="inputbox">
        <input
          type="text"
          placeholder="Enter bankIFSC code..."
          value={initialvalue}
          onChange={(e) => setInitialValue(e.target.value)}
        />
        <button onClick={() => setIfcCode(initialvalue)}>Submit</button>
      </div>
      {show && (
        <table style={{ border: "2px solid black" }}>
          <thead>
            <tbody>
              <tr>
                <th>Bank name:</th>
                <td> {bankData.BANK}</td>
              </tr>
              <tr>
                <th>Branch</th>
                <td>{bankData.BRANCH}</td>
              </tr>
              <tr>
                <th>City : </th>
                <td>{bankData.CITY}</td>
              </tr>
              <tr>
                <th>Contact:</th>
                <td>{bankData.CONTACT}</td>
              </tr>
              <tr>
                <th>STATE</th>
                <td>{bankData.STATE}</td>
              </tr>
            </tbody>
          </thead>
        </table>
      )}
    </div>
  );
}
