import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import AddPayOutDirect from "./pages/AddPayOutDirect";
import AddPlan from "./pages/AddPlan";
import AddTransaction from "./pages/AddTransaction";
import AllUsers from "./pages/AllUsers";
import DecreaseBalance from "./pages/DecreaseBalance";
import DecreasePayout from "./pages/DecreasePayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import UpdatePlan from "./pages/UpdatePlan";
import UpdateUser from "./pages/UpdateUser";
import WithdrawBalance from "./pages/WithdrawBalance";
import WithdrawPayout from "./pages/WithdrawPayout";
import Plans from "./pages/Plans";
import AddBalanceHistoryLog from "./pages/AddBalanceHistoryLog";
import EditPlan from "./pages/EditPlan";
import AddTotalPaid from "./pages/AddTotalPaid";
import TotalPaids from "./pages/TotalPaids";
import BalanceLogs from "./pages/BalanceLogs";
import EditBalanceLog from "./pages/EditBalanceLog";
import EditTotalPaid from "./pages/EditTotalPaid";
import AvailableCredits from "./pages/AvailableCredits";
import AddAvailableCredit from "./pages/AddAvailableCredit";
import EditAvailableCredit from "./pages/EditAvailableCredit";
function App() {
  return (
    <>
      <Switch>
        <Route exact={true} path="/employee">
          <Home />
        </Route>
        <Route exact={true} path="/employee/login">
          <Login />
        </Route>
        <Route exact={true} path="/employee/users">
          <AllUsers />
        </Route>
        <Route exact={true} path="/employee/user/addplan/:id">
          <AddPlan />
        </Route>
        <Route exact={true} path="/employee/user/addtotalpaid/:id">
          <AddTotalPaid />
        </Route>
        <Route exact={true} path="/employee/user/edittotalpaid/:id/:contract">
          <EditTotalPaid />
        </Route>
        <Route exact={true} path="/employee/user/addbalancelog/:id">
          <AddBalanceHistoryLog />
        </Route>
        <Route exact={true} path="/employee/user/addplan/:id">
          <AddPlan />
        </Route>
        <Route exact={true} path="/employee/user/balancelogs/:id">
          <BalanceLogs />
        </Route>
        <Route
          exact={true}
          path="/employee/user/availablecredits/:id/:contract"
        >
          <AvailableCredits />
        </Route>
        <Route
          exact={true}
          path="/employee/user/addavailablecredit/:id/:contract"
        >
          <AddAvailableCredit />
        </Route>
        <Route
          exact={true}
          path="/employee/user/editavailablecredit/:id/:contract"
        >
          <EditAvailableCredit />
        </Route>
        <Route exact={true} path="/employee/user/totalpaids/:id">
          <TotalPaids />
        </Route>
        <Route
          exact={true}
          path="/employee/user/editplan/:id/:increamentId/:contract"
        >
          <EditPlan />
        </Route>
        <Route exact={true} path="/employee/user/editbalancelog/:id">
          <EditBalanceLog />
        </Route>
        <Route
          exact={true}
          path="/employee/users/add/balanceHistory/:id/:contract"
        >
          <AddBalanceHistoryLog />
        </Route>
        <Route exact={true} path="/employee/user/updatePlan/:id">
          <UpdatePlan />
        </Route>
        <Route exact={true} path="/employee/users/update/:id">
          <UpdateUser />
        </Route>
        <Route exact={true} path="/employee/users/plans/:id">
          <Plans />
        </Route>
        <Route exact={true} path="/employee/users/add/payout/direct/:id">
          <AddPayOutDirect />
        </Route>
        <Route exact={true} path="/employee/users/wthdraw/balance/:id">
          <WithdrawBalance />
        </Route>
        <Route exact={true} path="/employee/users/decrease/balance/:id">
          <DecreaseBalance />
        </Route>
        <Route exact={true} path="/employee/users/decrease/payout/:id">
          <DecreasePayout />
        </Route>
        <Route exact={true} path="/employee/users/wthdraw/payout/:id">
          <WithdrawPayout />
        </Route>
        <Route exact={true} path="/employee/users/add/transaction/:id">
          <AddTransaction />
        </Route>
        <Route path="*">
          <Home />
        </Route>
      </Switch>
    </>
  );
}

export default App;
