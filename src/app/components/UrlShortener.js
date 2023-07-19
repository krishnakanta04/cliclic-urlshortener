"use client";

import { useState } from "react";

import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Spinner } from "@nextui-org/spinner";
import { toast } from "react-toastify";
import urlValidation from "@/utils/urlValidation";

export default function UrlShortener() {
  const mainDomain = window.location.hostname;

  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrlId, setShortUrlId] = useState("");
  const [loading, setLoading] = useState(false);

  const submitUrl = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // if url is not correct
      if (!urlValidation(originalUrl)) {
        throw new Error("Enter a valid url");
      }

      const response = await fetch("/api/shorten", {
        method: "POST",
        body: JSON.stringify({ originalUrl }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error);
      }

      const data = await response.json();
      setShortUrlId(data.shortUrlId);
      toast.success("Created short URL successfully");
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="mt-[70px]">
      <form onSubmit={submitUrl} className="mb-[20px]">
        <Input
          value={originalUrl}
          type="text"
          name="providedUrl"
          size="lg"
          color="primary"
          label="Paste your url here..."
          labelPlacement="outside"
          radius="sm"
          onValueChange={setOriginalUrl}
          endContent={
            <Button
              color="primary"
              variant="ghost"
              type="submit"
              size="sm"
              radius="sm"
            >
              Generate ➡️
            </Button>
          }
          className="max-w-[600px] m-auto "
        />
      </form>

      <div className="flex justify-center mt-[40px]">
        {shortUrlId ? (
          <Link
            href={`http://${mainDomain}/${shortUrlId}`}
            color="foreground"
            underline="hover"
            isExternal
            showAnchorIcon
            size="lg"
          >
            {`http://${mainDomain}/${shortUrlId}`}
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
