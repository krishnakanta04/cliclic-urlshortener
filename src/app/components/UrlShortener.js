"use client";

import { useState } from "react";

import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Spinner } from "@nextui-org/spinner";

export default function UrlShortener() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrlId, setShortUrlId] = useState("");

  const [loading, setLoading] = useState(false);

  const submitUrl = async (e) => {
    e.preventDefault();
    console.log(e.target.providedUrl.value);
    setLoading(true);
    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        body: JSON.stringify({ originalUrl }),
      });
      console.log(response);

      if (!response.ok) {
        const error = await response.json();
        console.log(error);
        throw new Error(error);
      }

      const data = await response.json();
      console.log(data);
      setShortUrlId(data.shortUrlId);
    } catch (error) {
      console.log("ERROR - ", error);
    }
    setLoading(false);
  };

  console.log("Loading - ", loading);
  return (
    <div className="mt-[20px]">
      <form onSubmit={submitUrl} className="mb-[20px]">
        <Input
          type="text"
          name="providedUrl"
          size="lg"
          color="primary"
          variant="bordered"
          placeholder="Paste your url here..."
          value={originalUrl}
          onValueChange={setOriginalUrl}
          endContent={
            <Button isIconOnly color="primary" variant="flat" type="submit">
              ➡️
            </Button>
          }
          className="max-w-[600px] m-auto"
        />
      </form>

      <div className="flex justify-center">
        {shortUrlId ? (
          <Link
            href={`http://localhost:3000/${shortUrlId}`}
            color="foreground"
            underline="hover"
            isExternal
            showAnchorIcon
            size="lg"
          >
            http://localhost:3000/{shortUrlId}
          </Link>
        ) : loading ? (
          <Spinner color="primary" />
        ) : (
          <p>Your short url will appear here.</p>
        )}
      </div>
    </div>
  );
}
