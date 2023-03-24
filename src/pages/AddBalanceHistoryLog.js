import axios from "axios";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useHistory, useParams } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import { Select } from "@material-ui/core";
function AddBalanceHistoryLog() {
  const history = useHistory();
  const AcessToken = localStorage.getItem("use");
  useEffect(() => {
    const data = localStorage.getItem("use");

    if (!data) {
      history.push("/employee/login");
    }
  }, [history]);
  const [err, seterr] = useState(false);
  const [message, setmessage] = useState("");
  const [date, setdate] = useState(new Date());

  const [balance, setbalance] = useState(0.0);
  const { id, } = useParams();
  const [contract, setcontract] = useState("");
  const subMitHandel = async (e) => {
    try {
          const { data } = await axios.post(
            `/api/balancelog/${id}`,
            {
              date,
              balance,

              contract,
            },
            {
              headers: {
                authorization: "Bearer " + JSON.parse(AcessToken).token,
              },
            }
          );

          if (data) {
            history.push(`/employee/users/update/${id}`);
          } else {
            seterr(true);
            setmessage(data);
          }
    } catch (error) {
          seterr(true);
          setmessage(error.message);
    }
    e.preventDefault();

  };
  const [users, setUsers] = useState({});
  const getUser = async () => {
    const { data } = await axios.get(`/api/users/verified/${id}`, {
      headers: {
        authorization: "Bearer " + JSON.parse(AcessToken).token,
      },
    });
    const {
      first_name,
      last_name,
      email,
      phone_number,
      address,
      city,
      state,
      zip,
      country,
      contracts,
    } = data[0];
    setUsers({
      first_name,
      last_name,
      email,
      phone_number,
      address,
      city,
      state,
      zip,
      country,
      contracts,
    });
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <>
   
    </>
  );
}

export default AddBalanceHistoryLog;
