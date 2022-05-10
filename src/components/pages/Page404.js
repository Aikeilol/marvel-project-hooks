import ErrorMessage from '../errorMessage/ErrorMessage';
import { Link } from 'react-router-dom';

const Page404 = () => {
  return (
    <div className="">
      <ErrorMessage />
      <p
        style={{
          'textAlign': 'center',
          'fontWeight': 'bold',
          'fontSize': '24px'
        }}>
        Page doesn't exist
      </p>
      <Link
        style={{
          'display': 'block',
          'textAlign': 'center',
          'fontWeight': 'bold',
          'fontSize': '34px',
          'color': '#9f0013',
        }}
        to='/'>
        Back to main page
      </Link>
    </div>
  )
}

export default Page404;