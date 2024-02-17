import { FormEvent, useCallback, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

import { ALink } from '../components/ALink'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Heading } from '../components/Heading'
import { TextInput } from '../components/TextInput'
import { useLogin } from '../hooks/useLogin'
import { useCurrentUserStore } from '../store/currentUserStore'

export const LoginPage = function () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const { setUser, loggedIn } = useCurrentUserStore()

  const { mutate, isPending, isError } = useLogin({
    onSuccess: useCallback((data) => {
      setUser(data.id, data.username, data.displayName)
      navigate('/')
    }, []),
  })

  const handleSubmit = useCallback(
    (ev: FormEvent<HTMLFormElement>) => {
      ev.preventDefault()
      mutate({ username, password })
    },
    [username, password]
  )

  if (loggedIn) {
    return <Navigate to="/" />
  }

  return (
    <>
      <Heading align="center">Login</Heading>
      <form onSubmit={handleSubmit}>
        <Card>
          <TextInput
            onChange={(e) => {
              setUsername(e.target.value)
            }}
            placeholder="utilisateur123"
            label="Nom d'utilisateur"
            id="formUsername"
            error={isError}
          />
          <TextInput
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            isPassword
            placeholder="•••••••"
            label="Mot de passe"
            id="formPassword"
            error={isError}
          />
          <ALink to="/register" alignSelf="end">
            S'enregistrer
          </ALink>
          <Button type="submit" disabled={isPending}>
            Se Connecter
          </Button>
        </Card>
      </form>
    </>
  )
}
