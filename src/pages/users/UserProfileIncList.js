import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userProfileAction } from "../../redux/slices/users/usersSlice";
import LoadingComponent from "../../components/Loading";
import ErrorDisplayMessage from "../../components/ErrorDisplayMessage";
import UserProfileContentDetails from "./UserProfileContentDetails";
import ContentDetails from "../../components/ContentDetails";

const UserProfileIncList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userProfileAction());
  }, [dispatch]);

  //State
  const state = useSelector(state => state.users);
  const { loading, appErr, serverErr, profile } = state;

  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : appErr || serverErr ? (
        <ErrorDisplayMessage>
          {serverErr} {appErr}
        </ErrorDisplayMessage>
      ) : (
        <section className="py-6">
          <div className="container-fluid">
            <div className="border position-relative rounded-2">
              <a
                className="top-0 mt-4 position-absolute end-0 me-4"
                href="#"
              ></a>
              <div className="px-8 pt-8 mb-8">
                <h6 className="mb-0 fs-3">Recent income transactions...</h6>
                <p className="mb-0">
                  Below is the history of your income transactions records
                </p>
                <Link
                  to="/add-income"
                  className="m-2 btn btn-outline-primary me-2"
                >
                  New Income
                </Link>
              </div>
              <table className="table">
                <thead>
                  <tr className="table-active">
                    <th scope="col">
                      <button className="btn d-flex align-items-centerr text-uppercase">
                        <small>Title</small>
                      </button>
                    </th>
                    <th scope="col">
                      <button className="btn d-flex align-items-centerr text-uppercase">
                        <small>Description</small>
                      </button>
                    </th>
                    <th scope="col">
                      <button className="btn d-flex align-items-centerr text-uppercase">
                        <small>Amount</small>
                      </button>
                    </th>
                    <th scope="col">
                      <button className="btn d-flex align-items-centerr text-uppercase">
                        <small>Date</small>
                      </button>
                    </th>
                    <th scope="col">
                      <button className="btn d-flex align-items-centerr text-uppercase">
                        <small>Action</small>
                      </button>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {profile?.income?.length <= 0 ? (
                    <h1>No Income Found</h1>
                  ) : (
                    profile?.income?.map(inc => (
                      <UserProfileContentDetails item={inc} key={inc?._id} />
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "20px",
            }}
          ></div>
        </section>
      )}
    </>
  );
};

export default UserProfileIncList;
