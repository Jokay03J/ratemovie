import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Movie } from "../types/Movie";

interface MovieSearch {
  meta: {
    current_page: number;
    first_page: number;
    first_page_url: string;
    last_page: number;
    last_page_url: string;
    next_page_url: string | null;
    per_page: number;
    previous_page_url: string | null;
    total: number;
  };
  data: Movie[];
}

interface MovieQueryProps {
  limit: number;
  page: number;
}

interface MoviePayload {
  title: string;
  author: string;
  createdAt: string;
}

// Define a service using a base URL and expected endpoints
export const ratemovieApi = createApi({
  reducerPath: "ratemoveApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_PUBLIC_FETCH_URL }),
  endpoints: (builder) => ({
    getMovie: builder.query({
      query: (movieId) => `movie/${movieId}`,
    }),
    getAllmovie: builder.query<MovieSearch, MovieQueryProps>({
      query: ({ limit = 10, page = 1 }) => `movies?limit=${limit}&page=${page}`,
    }),
    addMovie: builder.mutation({
      query: (payload: MoviePayload) => ({
        url: "/movie",
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetMovieQuery, useGetAllmovieQuery, useAddMovieMutation } =
  ratemovieApi;
