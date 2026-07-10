import Link from 'next/link'
import Image from 'next/image'

function About() {
  return (
    <div>
      <h1>About</h1>
      <h1>Contact</h1>
      <Link href={{
        pathname: '/contact',
        query: {
          name: 'John Doe'
        }
      }}
      >Go to contact</Link>
      <h1>Product</h1>
      <Link href="/products/1">Go to product</Link>
      <Image
        src="https://images.pexels.com/photos/37709389/pexels-photo-37709389.jpeg"
        width={500}
        height={500}
        alt="Picture of the author"
      />
      <Image
        src="/img.svg"
        width={500}
        height={500}
        alt="Picture of the author"
      />

    </div>
  )
}

export default About