import http from "../http-common";

const AcessToken = localStorage.getItem("use");
const getAll = (params) => {
  return http.get(
    "/users/verified",
    // {
    //   headers: {
    //     authorization: 'Bearer ' + JSON.parse(AcessToken).token,
    //   },
    // },
    {
      params,
      headers: {
        authorization: "Bearer " + JSON.parse(AcessToken).token,
      },
    }
  );
};

const getAllPlans = (params, id) => {
  return http.get(
    `/users/verified/plans/${id}`,
    // {
    //   headers: {
    //     authorization: 'Bearer ' + JSON.parse(AcessToken).token,
    //   },
    // },
    {
      params,
      headers: {
        authorization: "Bearer " + JSON.parse(AcessToken).token,
      },
    }
  );
};

const getSinglePlan = (id, contract) => {
  return http.get(`/users/verified/plan/${id}/${contract}`, {
    headers: {
      authorization: "Bearer " + JSON.parse(AcessToken).token,
    },
  });
};

const getAllBalanceLogs = (params, id) => {
  return http.get(`/users/verified/balancelogs/${id}`, {
    params,
    headers: {
      authorization: "Bearer " + JSON.parse(AcessToken).token,
    },
  });
};

const getTotalPaids = (params, id) => {
  return http.get(`/users/verified/totalpaids/${id}`, {
    params,
    headers: {
      authorization: "Bearer " + JSON.parse(AcessToken).token,
    },
  });
};

const getAllAvailableCredits = (params, id, contract) => {
  return http.get(`/users/verified/availablecredits/${id}/${contract}`, {
    params,
    headers: {
      authorization: "Bearer " + JSON.parse(AcessToken).token,
    },
  });
};

const usersService = {
  getAll,
  getAllPlans,
  getAllBalanceLogs,
  getTotalPaids,
  getAllAvailableCredits,
  getSinglePlan,
};

export default usersService;
