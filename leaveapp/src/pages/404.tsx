import { useRouter } from 'next/router';
import Head from 'next/head';

export default function NotFound() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>404 - Page Not Found</title>
        <meta name="description" content="The page you're looking for doesn't exist" />
      </Head>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="text-center">
              <h1 className="text-6xl font-bold text-gray-900">404</h1>
              <h2 className="mt-4 text-2xl font-semibold text-gray-900">Page Not Found</h2>
              <p className="mt-2 text-sm text-gray-600">
                The page you're looking for doesn't exist or has been moved.
              </p>
              <div className="mt-6">
                <button
                  onClick={() => router.push('/')}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Go back home
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 