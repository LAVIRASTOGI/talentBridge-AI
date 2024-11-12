"use client";

export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center p-4 bg-base-100">
          <div className="max-w-md w-full space-y-6 text-center">
            {/* Error Icon */}
            <div className="text-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>

            {/* Error Message */}
            <div>
              <h1 className="text-2xl font-bold text-base-content">
                Oops! Something went wrong
              </h1>
              <p className="mt-2 text-base-content/70">
                {error.message || "An unexpected error occurred"}
              </p>
            </div>

            {/* Error Details (Development Only) */}
            {process.env.NODE_ENV === "development" && (
              <div className="text-left p-4 bg-base-200 rounded-lg">
                <p className="font-mono text-sm text-base-content/70 break-all">
                  {error.stack}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-4 justify-center">
              <button onClick={() => reset()} className="btn btn-primary">
                Try Again
              </button>
              <button
                onClick={() => (window.location.href = "/")}
                className="btn btn-outline"
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
