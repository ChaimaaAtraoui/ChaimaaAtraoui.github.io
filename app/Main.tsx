'use client' // Mark this file as a Client Component

import { useEffect } from 'react'
import { useRouter } from 'next/navigation' // Use the new import for routing

const Home = () => {
  const router = useRouter()

  useEffect(() => {
    // Remove or modify the redirection logic if you want a different behavior
    // router.push('/about'); // Comment this out or modify it
  }, [router])

  return null // This component will not render anything
}

export default Home
