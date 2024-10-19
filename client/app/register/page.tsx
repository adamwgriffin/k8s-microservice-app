import { Suspense } from 'react'
import RegisterForm from '../components/RegisterForm'

// This component passed as a fallback to the Suspense boundary
// will be rendered in place of the search bar in the initial HTML.
// When the value is available during React hydration the fallback
// will be replaced with the `<RegisterForm>` component.
const RegisterFormFallback = () => <>placeholder</>

const Register: React.FC = () => {
  return (
    <>
      <Suspense fallback={<RegisterFormFallback />}>
        <RegisterForm />
      </Suspense>
    </>
  )
}

export default Register
