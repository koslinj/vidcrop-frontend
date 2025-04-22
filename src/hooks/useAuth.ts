import { useEffect, useState } from 'react'
import axios from 'axios'

export const useAuth = () => {
  const [loading, setLoading] = useState(true)
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    let isMounted = true

    const checkAuth = async () => {
      try {
        await axios.get('http://vidcrop.com/test')
        if (isMounted) setAuthorized(true)
      } catch {
        if (isMounted) setAuthorized(false)
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    checkAuth()

    return () => {
      isMounted = false // cleanup
    }
  }, [])

  return { loading, authorized }
}
