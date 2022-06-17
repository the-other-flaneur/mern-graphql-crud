import logo from './assets/logo.png';

export default function header() {
  return (
    <div className='navbar bg-light mb-4 p-0' >
        <div className='container'>
            <a className='navbar-brand' href='/'>
              <div>
                <img src={ logo } alt='logo' className='mr-2' />
                <div>ProjectMgmt</div>
              </div>
            </a>
        </div>
    </div>
  )
}
