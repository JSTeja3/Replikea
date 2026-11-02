import { useAuth } from '../context/useAuth'

function HomePage(){
    const {user, logout} = useAuth();

    return (
        <main>
            <h1>Welcom to Replikea</h1>

            <p>Hello, {user?.email} </p>
            <p>Role: {user?.role} </p>

            <button onClick={logout}>
                Logout
            </button>
        </main>
    );
}

export default HomePage