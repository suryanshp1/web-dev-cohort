import * as React from "react";

interface FreeAPIGetRandomUserResponse {
  statusCode: number;
  data: {
    gender: string;
    name: {
      title: string;
      first: string;
      last: string;
    };
    location: {
      street: {
        number: number;
        name: string;
      };
      city: string;
      state: string;
      country: string;
      postcode: string; // e.g., "7385 GN"
      coordinates: {
        latitude: string;
        longitude: string;
      };
      timezone: {
        offset: string; // e.g., "+8:00"
        description: string;
      };
    };
    email: string;
    login: {
      uuid: string;
      username: string;
      password: string;
      salt: string;
      md5: string;
      sha1: string;
      sha256: string;
    };
    dob: {
      date: string; // ISO date string
      age: number;
    };
    registered: {
      date: string;
      age: number;
    };
    phone: string;
    cell: string;
    id: number; // appears as number in example, but could be string in other cases; adjust if needed
    picture: {
      large: string;
      medium: string;
      thumbnail: string;
    };
    nat: string;
  };
  message: string;
  success: boolean;
}

export function useRandomUser() {
    const [user, setUser] = React.useState<null | FreeAPIGetRandomUserResponse["data"]>();

    const [isFetching, setIsFetching] = React.useState<boolean>(false);

    const [error, setError] = React.useState<null | string>(null);

    async function fetchRandomUser() {
        setIsFetching(true);
        setError(null);

        try {
            const rawResponse = await fetch("https://api.freeapi.app/api/v1/public/randomusers/user/random", {
                method: "GET",
                headers: {
                    "content-Type": "application/json",
                },
            })

            setError(null)

            const response = await rawResponse.json() as FreeAPIGetRandomUserResponse;

            if (response.statusCode === 200 && response.data && response.success) {
                setUser(response.data);
            }
        } catch (error) {
            setError("Failed to fetch random user");
            console.error(error);
        } finally {
            setIsFetching(false);
        }
    }

    return {
        user,
        fetchRandomUser,
        isFetching,
        error,
    }
}