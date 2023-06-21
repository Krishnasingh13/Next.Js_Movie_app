import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { use, useEffect, useState } from "react";

interface Iuser {
  firstName: String;
  lastName: String;
}

const Profile = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState<Iuser | undefined>();
  const [edit, setEdit] = useState(true);
  const router = useRouter();

  const getUser = async () => {
    try {
      const apiUrl =
        process.env.NODE_ENV === "production"
          ? ` ${process.env.NEXT_PUBLIC_PROD}/api/get-user/${session?.user?.email}`
          : `${process.env.NEXT_PUBLIC_DEV}/api/get-user/${session?.user?.email}`;
      const response = await axios.get(apiUrl);
      setUser(response.data[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (session) {
      getUser();
    }
  }, [session]);

  const updateUserHandler = async () => {
    try {
      const apiUrl =
        process.env.NODE_ENV === "production"
          ? ` ${process.env.NEXT_PUBLIC_PROD}/api/update-user/${session?.user?.email}`
          : `${process.env.NEXT_PUBLIC_DEV}/api/update-user/${session?.user?.email}`;
      const response = await axios.post(apiUrl, {
        firstName: user?.firstName,
        lastName: user?.lastName,
      });
      setUser(response.data[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (edit) {
      updateUserHandler();
      router.reload();
    }
  };

  const editingUserHandler = (e: any) => {
    setUser((prev) => {
      if (prev) {
        return {
          ...prev,
          [e.target.name]: e.target.value,
        };
      }
    });
  };

  const editHandler = () => {
    setEdit((prev) => !prev);
  };

  return (
    <div className="mx-auto max-w-7xl px-2 mt-10">
      <form onSubmit={handleSubmit}>
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-2xl font-semibold leading-7 text-gray-900">
            Personal Information
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium leading-6 text-gray-900">
                First name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={user?.firstName as string}
                  onChange={(e) => editingUserHandler(e)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                  disabled={edit}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium leading-6 text-gray-900">
                Last name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={user?.lastName as string}
                  onChange={(e) => editingUserHandler(e)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                  disabled={edit}
                />
              </div>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="submit"
              onClick={editHandler}
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              {!edit ? "Save" : "Edit"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
