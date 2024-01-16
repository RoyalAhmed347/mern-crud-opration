import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUserEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setshowEditModal] = useState(false);
  const [newUserData, setnewUserData] = useState({ username: "", email: "" });
  const [creuntUser, setcreuntUser] = useState({ username: "", email: "" });
  const [allUsers, setallUsers] = useState([{}]);
  useEffect(() => {
    getAllUsers();
  }, [allUsers]);

  const inputCreateEvent = (e) => {
    const { name, value } = e.target;
    setnewUserData((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };
  const inputUpdateEvent = (e) => {
    const { name, value } = e.target;
    setcreuntUser((preVal) => {
      return {
        ...preVal,
        [name]: value,
      };
    });
  };

  const createUser = (e) => {
    setShowModal(false);
    axios
      .post("http://localhost:3001/user", { ...newUserData })
      .then((data) => {
        console.log(data.data);
        console.log("user is created");
        setnewUserData({ username: "", email: "" });
      })
      .catch((e) => {
        console.log({ error: e });
      });
  };
  const getUser = (id) => {
    axios
      .get(`http://localhost:3001/user/${id}`)
      .then((data) => {
        setcreuntUser(data.data);
      })
      .catch((e) => {
        console.log({ error: e });
      });
  };
  const updateUser = (id) => {
    setshowEditModal(false);

    axios
      .patch(`http://localhost:3001/user/${id}`, { ...creuntUser })
      .then((data) => {
        console.log("user is updated");
      })
      .catch((e) => {
        console.log({ error: e });
      });
  };

  const deleteUser = (id) => {
    axios
      .delete(`http://localhost:3001/user/${id}`)
      .then((data) => {
        console.log("user deleted");
      })
      .catch((e) => {
        console.log({ error: e });
      });
  };

  const getAllUsers = () => {
    axios
      .get("http://localhost:3001/user/all")
      .then((data) => {
        setallUsers(data.data);
      })
      .catch((e) => {
        console.log({ error: e });
      });
  };

  return (
    <>
      <div className="w-full my-4 px-4 flex justify-end  items-center">
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          Create
        </button>
      </div>

      <div className="w-full px-6 flex flex-col justify-center items-center">
        <ul className=" flex ">
          <li className="w-16">Index</li>
          <li className="w-60">Name</li>
          <li className="w-96">Email</li>
          <li>Action</li>
        </ul>

        {allUsers.map((elem, index) => {
          return (
            <ul className=" flex " key={index}>
              <li className="w-16">{index + 1}</li>
              <li className="w-60">{elem.username}</li>
              <li className="w-96">{elem.email}</li>
              <li className="flex gap-4">
                <FaUserEdit
                  className="cursor-pointer"
                  onClick={() => {
                    getUser(elem._id);
                    setshowEditModal(true);
                  }}
                />
                <AiFillDelete
                  onClick={() => deleteUser(elem._id)}
                  className="cursor-pointer"
                />
              </li>
            </ul>
          );
        })}
      </div>

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Create new user</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    x
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div class="w-full max-w-xs">
                    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                      <div class="mb-4">
                        <label
                          class="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="username"
                        >
                          Username
                        </label>
                        <input
                          class="shadow appearance-none border rounded w-full py-2 px-3 text-blue-600 leading-tight focus:outline-none focus:shadow-outline bg-white"
                          id="username"
                          type="text"
                          value={newUserData.username}
                          name="username"
                          onChange={inputCreateEvent}
                          placeholder="Username"
                        />
                      </div>
                      <div class="mb-6">
                        <label
                          class="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="email"
                        >
                          Email
                        </label>
                        <input
                          class="shadow appearance-none border border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-white"
                          id="email"
                          type="email"
                          name="email"
                          value={newUserData.email}
                          onChange={inputCreateEvent}
                          placeholder="user@gmail.com"
                        />
                      </div>
                      <div class="flex items-center justify-between">
                        <button
                          className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={createUser}
                        >
                          Create
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b"></div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}

      {showEditModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    {creuntUser.username}
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setshowEditModal(false)}
                  >
                    x
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div class="w-full max-w-xs">
                    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                      <div class="mb-4">
                        <label
                          class="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="username"
                        >
                          Username
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-blue-600 leading-tight focus:outline-none focus:shadow-outline bg-white"
                          id="username"
                          type="text"
                          value={creuntUser.username}
                          name="username"
                          onChange={inputUpdateEvent}
                          placeholder="Username"
                        />
                      </div>
                      <div class="mb-6">
                        <label
                          class="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="email"
                        >
                          Email
                        </label>
                        <input
                          className="shadow appearance-none border border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-white"
                          id="email"
                          type="email"
                          name="email"
                          value={creuntUser.email}
                          onChange={inputUpdateEvent}
                          placeholder="user@gmail.com"
                        />
                      </div>
                      <div class="flex items-center justify-between">
                        <button
                          className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => {
                            updateUser(creuntUser._id);
                          }}
                        >
                          Update
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b"></div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default App;
