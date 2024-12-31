import Link from 'next/link';

export default function Home() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50'>
      <main className='container mx-auto px-4 py-16'>
        <div className='max-w-3xl mx-auto text-center'>
          <h1 className='text-4xl font-bold text-gray-900 mb-6'>
            Welcome to Admin Dashboard
          </h1>
          <p className='text-lg text-gray-600 mb-12'>
            Manage your users with intuitive dashboard
          </p>

          <Link
            href='/users'
            className='inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200 gap-2 shadow-lg hover:shadow-xl'
          >
            Go to User Management
          </Link>
        </div>

        <div className='mt-16 grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div className='bg-white p-6 rounded-lg shadow-md'>
            <h2 className='text-xl font-semibold text-gray-800 mb-4'>
              User Management
            </h2>
            <p className='text-gray-600'>
              Easily manage user accounts names and e-mails from a centralized
              dashboard.
            </p>
          </div>

          <div className='bg-white p-6 rounded-lg shadow-md'>
            <h2 className='text-xl font-semibold text-gray-800 mb-4'>
              Real-time Updates
            </h2>
            <p className='text-gray-600'>
              See changes instantly with real-time update system and
              synchronization.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
