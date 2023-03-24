import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import userServices from "../services/userServices";
import Pagination from "@material-ui/lab/Pagination";

function TotalPaids() {
  const { id } = useParams();
  const history = useHistory();
  const AcessToken = localStorage.getItem("use");
  const [plans, setPlans] = useState([]);

  // useEffect(() => {
  // getUsers()
  // }, [])

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
  const fetchTotalPaids = () => {
    const params = getRequestParams(page, pageSize);

    userServices
      .getTotalPaids(params, id)
      .then((response) => {
        const { increment, totalPages } = response.data;

        setPlans(increment);
        setCount(totalPages);
      })
      .catch((e) => {});
  };

  useEffect(fetchTotalPaids, [page, pageSize]);
  const deleteData = async (id) => {
    const { data } = await axios.delete(
      `/api/users/verified/totalpaid/delete/${id}`,
      {
        headers: {
          authorization: "Bearer " + JSON.parse(AcessToken).token,
        },
      }
    );
    if (data === "success") {
      fetchTotalPaids();
    }
  };
  return (
    <>
      <div className="container">
        <div className="row mt-4">
          <div className="col-md-2 col-lg-12">
            <button
              type="button"
              className="btn btn-info"
              onClick={() => history.push(`/employee/user/addtotalpaid/${id}`)}
            >
              Add Total Paid
            </button>
            <button
              type="button"
              className="btn btn-danger ms-2"
              onClick={() => history.push(`/employee/users/update/${id}`)}
            >
              Back
            </button>
          </div>

          <table class="table table-hover mt-4">
            <thead>
              <tr>
                <th scope="col">Started At</th>
                <th scope="col">Contract</th>
                <th scope="col">Total Paid</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {plans &&
                plans.map((currentUser, index) => (
                  <>
                    <tr>
                      <td>{`${new Date(
                        currentUser.createdAt
                      ).toDateString()}`}</td>
                      <td>{currentUser.contract}</td>
                      <td>{currentUser.totalPaid}</td>

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
                              `/employee/user/edittotalpaid/${
                                currentUser.userId
                              }/${currentUser.contract.split("#")[1]}`
                            )
                          }
                        >
                          Update
                        </button>
                      </td>
                    </tr>
                  </>
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

export default TotalPaids;
