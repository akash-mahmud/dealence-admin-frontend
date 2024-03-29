import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import userServices from "../services/userServices";
import Pagination from "@material-ui/lab/Pagination";
function AllUsers() {
  const history = useHistory();
  const AcessToken = localStorage.getItem("use");
  const [users, setUsers] = useState([]);
  // console.log(users);
  const getUsers = async () => {
    const { data } = await axios.get("/api/users/verified");
    setUsers(data);
  };
  // useEffect(() => {
  // getUsers()
  // }, [])
 
  const [searchEmail, setSearchEmail] = useState();

  const getSearchedUser = async () => {
    const { data } = await axios.post(
      "/api/users/search",
      {
        searchEmail,
      },
      {
        headers: {
          authorization: "Bearer " + JSON.parse(AcessToken).token,
        },
      }
    );
    setUsers(data);
  };
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
  const retriveUsers = () => {
    const params = getRequestParams(page, pageSize);

    userServices
      .getAll(params)
      .then((response) => {
        const { users, totalPages } = response.data;

        setUsers(users);
        setCount(totalPages);

       
      })
      .catch((e) => {
       
      });
  };

  useEffect(retriveUsers, [page, pageSize]);

  const restrictUser = async (id) => {
    const { data } = await axios.post(
      `/api/user/update/details/${id}`,
      {
       status:'banned'
      },
      {
        headers: {
          authorization: "Bearer " + JSON.parse(AcessToken).token,
        },
      }
    );
    retriveUsers()
  }
  const unRestrictUser = async (id) => {
    const { data } = await axios.post(
      `/api/user/update/details/${id}`,
      {
        status:'active'
      },
      {
        headers: {
          authorization: "Bearer " + JSON.parse(AcessToken).token,
        },
      }
    );
    retriveUsers()
  }
  const deleteUser = async(id) => {
await axios.post('/api/users/delete' , {id},  {
  headers: {
    authorization: "Bearer " + JSON.parse(AcessToken).token,
  },
})
    retriveUsers()

  }
  return (
    <>
      <div className="container">
        <div className="row mt-4">
          <div className="col-md-2">
            <button
              type="button"
              className="btn  btn-danger"
              style={{
                color: "#fff",
              }}
              onClick={() => history.push(`/employee`)}
            >
              Back
            </button>
          </div>
          <div className="col-md-4 offset-md-4">
            <div class="form-group">
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Search a user by Email"
                onChange={(e) => setSearchEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-2">
            <button
              type="button"
              className="btn  btn-primary"
              style={{
                color: "#fff",
              }}
              onClick={getSearchedUser}
              disabled={!searchEmail}
            >
              Search
            </button>
          </div>

          <table class="table table-hover mt-4">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">phone number</th>
                <th scope="col">Address</th>
                <th scope="col">city</th>
                <th scope="col">state</th>
                <th scope="col">zip</th>
                <th scope="col">country</th>
                <th scope="col">status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((currentUser, index) => (
                  <>
                    <tr>
                      <td>{`${currentUser.first_name} ${currentUser.last_name}`}</td>
                      <td>{currentUser.email}</td>
                      <td>{currentUser.phone_number}</td>
                      <td>{currentUser.address}</td>
                      <td>{currentUser.city}</td>
                      <td>{currentUser.state}</td>
                      <td>{currentUser.zip}</td>
                      <td>{currentUser.country}</td>
                      <td>{currentUser.status}</td>
                      <td>
                        <button
                          type="button"
                          className="btn  btn-secondary"
                          style={{
                            color: "#fff",
                          }}
                          onClick={() =>
                            history.push(
                              `/employee/users/update/${currentUser.id}`
                            )
                          }
                        >
                          Update
                        </button>
                        <button
                          type="button"
                          className="btn  btn-warning"
                          style={{
                            color: "#fff",
                            marginLeft:5
                          }}
                          onClick={currentUser?.status==='active'?()=> restrictUser(currentUser?.id) : () => unRestrictUser(currentUser.id)
                          }
                        >
                          {currentUser?.status==='active'? 'Restrict' : 'Activate'}
                          
                        </button>
                        <button
                          type="button"
                          className="btn  btn-danger"
                          style={{
                            color: "#fff",
                            marginLeft:5
                          }}
                          onClick={() => deleteUser(currentUser?.id)}
                          
                        >
                          Delete
                          
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

export default AllUsers;
