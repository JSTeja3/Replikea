//import { useAuth } from '../context/useAuth'

function HomePage(){
    //const {user} = useAuth();

    return (
        <main className="home-page">
            <div className="home-welcome">

            <h1>Welcome to Replikea</h1>

            <p className="home-description">
                Your enterprise workspace for managing products,
                    documentation and business operations.
            </p>
        
            </div>

        </main>
    );
}

export default HomePage