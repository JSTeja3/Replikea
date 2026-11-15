import { useAuth } from '../context/useAuth'

function HomePage(){
    const {user} = useAuth();

    return (
        <main>
            <h1>Welcome to Replikea</h1>

            <p>Hello, {user?.email} </p>
            <p>Role: {user?.role} </p>

        </main>
    );
}

export default HomePage