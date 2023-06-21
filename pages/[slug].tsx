import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";

interface movie {
  title: String;
  overview: String;
  tagline: String;
  id: number;
  backdrop_path: String;
  status: String;
  release_date: String;
  budget: String;
}

interface SlugProps {
  data: movie;
}

const Slug = ({ data }: SlugProps) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [message, setMessage] = useState<String>("");
  const sendMessage = async () => {
    try {
      const apiUrl =
        process.env.NODE_ENV === "production"
          ? ` ${process.env.NEXT_PUBLIC_PROD}/api/contact`
          : `${process.env.NEXT_PUBLIC_DEV}/api/contact`;
      const res = await axios.post(apiUrl, {
        message,
        email: session?.user?.email,
        name: session?.user?.name,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    sendMessage();
    setMessage("");
  };

  return (
    <div className="mx-auto max-w-7xl px-2 mt-10">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-start justify-items-center gap-x-4 gap-y-10 lg:grid-cols-2">
            <img
              alt="Contact us"
              className="hidden max-h-full w-full rounded-lg object-cover lg:block"
              src={`https://image.tmdb.org/t/p/w500${data?.backdrop_path}`}
            />
            <div className="flex items-center justify-center">
              <div className="px-2 md:px-12">
                <p className="text-2xl font-bold text-gray-900 md:text-4xl">
                  {data?.title}
                </p>
                <p className="text-xl font-bold text-gray-600 md:text-2xl mt-2">
                  {data?.tagline}
                </p>
                <p className="mt-2 text-lg text-gray-600">{data?.overview}</p>
                <ul className="mt-3">
                  <li className="mt-1 flex items-center">
                    <p className="font-semibold leading-normal text-gray-600">
                      Budget: {data.budget}
                    </p>
                  </li>
                  <li className="mt-1 flex items-center">
                    <p className="font-semibold leading-normal text-gray-600">
                      Release Date: {data.release_date}
                    </p>
                  </li>
                  <li className="mt-1 flex items-center">
                    <p className="font-semibold leading-normal text-gray-600">
                      Status: {data.status}
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <img
              alt="Contact us"
              className="max-h-full w-full rounded-lg object-cover lg:hidden"
              src={`https://image.tmdb.org/t/p/w500${data?.backdrop_path}`}
            />
          </div>
        </div>
      </div>

      {session && (
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-7xl py-12 md:py-24">
            <div className="grid items-start justify-items-stretch gap-x-4 gap-y-10 lg:grid-cols-2">
              <div className="flex items-center w-full">
                <div className="px-2 md:pl-3 w-[90%]">
                  <p className="text-2xl font-bold text-gray-900 md:text-4xl">
                    Get in touch
                  </p>
                  <p className="mt-4 text-lg text-gray-600">
                    Our friendly team would love to hear from you.
                  </p>
                  <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                    <div className="grid w-full  items-center gap-1.5">
                      <label
                        className="text-sm font-medium leading-none text-gray-700 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="message">
                        Message
                      </label>
                      <textarea
                        value={message as string}
                        onChange={(e) => setMessage(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2 h-52"
                        id="message"
                        placeholder="Leave us a message"
                        cols={20}
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
              <img
                alt="Contact us"
                className="hidden max-h-full w-full rounded-lg object-cover lg:block"
                src="https://images.unsplash.com/photo-1543269664-56d93c1b41a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzZ8fGhhcHB5JTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export async function getServerSideProps({ query }: any) {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/${query.slug}?api_key=520f6e719afa6dc3b13a66ad74c35685&language=en-US&page=1`
    );
    const data = res?.data;

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.log(error);

    return {
      props: {
        data: null,
      },
    };
  }
}

export default Slug;
