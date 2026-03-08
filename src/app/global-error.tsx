"use client";

import { useEffect } from "react";
import NextError from "next/error";
import posthog from "posthog-js";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    posthog.captureException(error, {
      tags: { digest: error.digest },
    });
  }, [error]);

  return (
    <html lang="en">
      <body>
        <NextError statusCode={0} />
      </body>
    </html>
  );
}
