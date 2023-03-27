import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useLocation, useParams } from "react-router-dom";
import userServices from "../services/userServices";
import Pagination from "@material-ui/lab/Pagination";

function AvailableCredits() {
  const { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const contract = searchParams.get("contract");
  const history = useHistory();
  const AcessToken = localStorage.getItem("use");
  const [credits, setCredits] = useState([]);

  const getRequestParams = (page, pageSize) => {
    let params = {};

    if (page) {
      params["page"] = page - 1;
    }

    if (pageSize) {
      params["size"] = pageSize;
    }

    return params;
  };
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    const data = localStorage.getItem("use");

    if (!data) {
      history.push("/employee/login");
    }
  }, [history]);

  const fetchAvailableCredits = () => {
    const params = getRequestParams(page, pageSize);

    userServices
      .getAllAvailableCredits(params, id)
      .then((response) => {
        const { increment, totalPages } = response.data;

        setCredits(increment);
        setCount(totalPages);
      })
      .catch((e) => {});
  };

  useEffect(fetchAvailableCredits, [page, pageSize]);
  const deleteData = async (id) => {
    const { data } = await axios.delete(
      `/api/users/verified/availablecredit/delete/${id}`,
      {
        headers: {
          authorization: "Bearer " + JSON.parse(AcessToken).token,
        },
      }
    );
    if (data === "success") {
      fetchAvailableCredits();
    }
  };
  return (
    <>
      <div className="container">
        <div className="row mt-4">
          <div className="col-md-2 col-lg-12">
            <button
              type="button"
              className="btn btn-success"
              onClick={() =>
                history.push(
                  `/employee/user/addavailablecredit/${id}/${contract}`
                )
              }
            >
              Add Available Credit
            </button>
            <button
              type="button"
              className="btn btn-danger ms-2"
              onClick={() => history.push(`/employee/users/plans/${id}`)}
            >
              Back
            </button>
          </div>

          <table className="table table-hover mt-4">
            <thead>
              <tr>
                <th scope="col">Started At</th>
                <th scope="col">Contract</th>
                <th scope="col">Credit</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {credits &&
                credits.map((credit, index) => (
                  <tr key={index}>
                    <td>{`${new Date(credit.createdAt).toDateString()}`}</td>
                    <td>{credit.contract}</td>
                    <td>{credit.credit}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-secondary me-2"
                        onClick={() => deleteData(credit.id)}
                      >
                        Remove
                      </button>
                      <button
                        type="button"
                        className="btn btn-info"
                        onClick={() =>
                          history.push(
                            `/employee/user/editavailablecredit/${credit.userId}/${contract}`
                          )
                        }
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="row mt-4">
          <Pagination
            className="my-3"
            count={count}
            page={page}
            siblingCount={1}
            boundaryCount={1}
            variant="outlined"
            shape="rounded"
            color="primary"
            onChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
}

export default AvailableCredits;
