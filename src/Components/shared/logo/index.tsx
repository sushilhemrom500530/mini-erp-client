import { Link } from 'react-router-dom'

export default function Logo() {
    return (
        <Link to="/">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-rose-600 to-blue-500 inline-block text-transparent bg-clip-text">ERP</h1>
        </Link>
    )
}
