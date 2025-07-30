import { Link } from 'react-router-dom'

export default function OsMapTerms() {
  const year = new Date().getFullYear()
  return (
    <>
      <div className='os-map-terms-container'>
        <Link to={'/os-terms'}>Contains OS Data</Link> &copy; Crown copyright
        and database rights {year}
      </div>
    </>
  )
}
