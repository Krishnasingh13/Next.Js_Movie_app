import React, { Key, useState } from "react";
import axios from "axios";
import Card from "@/components/Card";

interface movie {
  title: string;
  overview?: string;
  id: number;
  backdrop_path: string;
}

interface IProps {
  allMovies: movie[];
}

const Index = ({ allMovies }: IProps) => {
  const [movies, setMovies] = useState(allMovies);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);

  async function fetchMovies() {
    setLoading(true);

    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=520f6e719afa6dc3b13a66ad74c35685&language=en-US&page=${page}`
      );
      setMovies((prevMovies) => [...prevMovies, ...res?.data?.results.slice(0, 6)]);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  }

  return (
    <div className="w-full">
      <div className="mx-auto max-w-7xl px-2">
        <div className="grid gap-6 gap-y-10 py-6 md:grid-cols-2 lg:grid-cols-3">
          {movies?.map((movie) => (
            <Card movie={movie} key={movie.id as Key} />
          ))}
        </div>
        <div className="flex items-center justify-center my-10">
          <button
            disabled={loading}
            onClick={() => {
              setPage((prevPage) => prevPage + 1);
              fetchMovies();
            }}
            className="rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black hover:bg-black hover:text-white transition-all"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=520f6e719afa6dc3b13a66ad74c35685&language=en-US&page=1`
    );
    const allMovies = res?.data?.results.slice(0, 6);

    return {
      props: {
        allMovies,
      },
    };
  } catch (error) {
    console.log(error);

    return {
      props: {
        allMovies: [],
      },
    };
  }
}

export default Index;