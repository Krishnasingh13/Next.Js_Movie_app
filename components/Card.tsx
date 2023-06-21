import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";

interface Iprops {
  movie: {
    title: String;
    overview?: String;
    backdrop_path: String;
    id: Number;
  };
}

const Card = (props: Iprops) => {
  const router = useRouter();
  function getWordStr(str: String | undefined) {
    return str?.split(" ").slice(0, 20).join(" ");
  }

  return (
    <Link href={{ pathname: `${router.pathname}${props.movie.id}` }}>
      <div className="border">
        <img
          src={`https://image.tmdb.org/t/p/w500${props.movie.backdrop_path}`}
          className="aspect-video w-full rounded-md"
          alt={`${props.movie.title}`}
        />
        <div className="min-h-min p-3">
          <p className="mt-4 flex-1 text-base font-semibold text-gray-900">
            {props.movie.title}
          </p>
          <p className="mt-4 w-full text-sm leading-normal text-gray-600">
            {getWordStr(props?.movie?.overview) + "..."}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
