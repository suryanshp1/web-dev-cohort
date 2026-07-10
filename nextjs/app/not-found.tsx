import Image from 'next/image'
import Link from 'next/link'

const customNotFound = () => {
  return (
    <div className='flex flex-col items-center'>
    <Image
        src="/img.svg"
        width={500}
        height={500}
        alt="Picture of the author"
    />
    <h1 className='text-3xl font-bold'>404 - Page Not Found</h1>
    <p className='mt-4 text-center text-gray-600 max-w-md'>
        Sorry, the page you're looking for doesn't exist or has been moved.
    </p>
    <Link
        href="/"
        className="mt-8 rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 transition"
    >
        Go Home
    </Link>
    </div>
  )
}

export default customNotFound