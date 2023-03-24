import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import userServices from "../services/userServices";
import Pagination from "@material-ui/lab/Pagination";

function BalanceLogs() {
  const { id } = useParams();
  const history = useHistory();
  const AcessToken = localStorage.getItem("use");
  const [plans, setPlans] = useState([]);

  const getRequestParams = (page, pageSize) => {
    let params = {};

    // if (searchTitle) {
    //   params['title'] = searchTitle;
    // }

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

  const fetchBalanceLogs = () => {
    const params = getRequestParams(page, pageSize);

    userServices
      .getAllBalanceLogs(params, id)
      .then((response) => {
        const { increment, totalPages } = response.data;

        setPlans(increment);
        setCount(totalPages);
      })
      .catch((e) => {});
  };

  useEffect(fetchBalanceLogs, [page, pageSize]);
  const deleteData = async (id) => {
    const { data } = await axios.delete(
      `/api/users/verified/balancelog/delete/${id}`,
      {
        headers: {
          authorization: "Bearer " + JSON.parse(AcessToken).token,
        },
      }
    );
    if (data === "success") {
      fetchBalanceLogs();
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
              onClick={() => history.push(`/employee/user/addbalancelog/${id}`)}
            >
              Add Balance Log
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
                <th scope="col">Amount</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {plans &&
                plans.map((currentUser, index) => (
                  <tr key={index}>
                    <td>{`${new Date(
                      currentUser.createdAt
                    ).toDateString()}`}</td>
                    <td>{currentUser.contract}</td>
                    <td>{currentUser.balance}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-secondary me-2"
                        onClick={() => deleteData(currentUser.id)}
                      >
                        Remove
                      </button>
                      <button
                        type="button"
                        className="btn btn-info"
                        onClick={() =>
                          history.push(
                            `/employee/user/editbalancelog/${currentUser.userId}`
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

export default BalanceLogs;
