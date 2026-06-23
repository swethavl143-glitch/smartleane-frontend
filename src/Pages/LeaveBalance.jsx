import { useEffect, useState } from "react";
import api from "../Services/api";
import Navbar from "../Components/Navbar";
function LeaveBalance() {

    const [balance, setBalance] = useState(null);

    const fetchBalance = async () => {

        try {

            const response = await api.get(
                "/leave-balance/balance"
            );

            console.log(response.data);

            setBalance(response.data);

        } catch(error) {

            console.log("FULL ERROR:", error);

            if(error.response){
                console.log("Status:", error.response.status);
                console.log("Data:", error.response.data);
            }

            alert("Failed to load leave balance");
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchBalance();
    }, []);

    if(!balance){
        return <h2>Loading...</h2>;
    }

    return (
        <>
            <Navbar />
        <div className="container mt-5">

            <div className="card shadow">

                <div className="card-body">

                    <h2 className="text-center mb-4">
                        Leave Balance
                    </h2>

                    <h4 className="text-center text-muted mb-4">
                        Welcome {balance.user.name}
                    </h4>

                    <div className="row g-4">

                        <div className="col-md-4">

                            <div className="card border-primary shadow-sm">

                                <div className="card-body text-center">

                                    <h5 className="card-title text-primary">
                                        Casual Leave
                                    </h5>

                                    <h1>
                                        {balance.casualBalance}
                                    </h1>

                                </div>

                            </div>

                        </div>

                        <div className="col-md-4">

                            <div className="card border-success shadow-sm">

                                <div className="card-body text-center">

                                    <h5 className="card-title text-success">
                                        Sick Leave
                                    </h5>

                                    <h1>
                                        {balance.sickBalance}
                                    </h1>

                                </div>

                            </div>

                        </div>

                        <div className="col-md-4">

                            <div className="card border-warning shadow-sm">

                                <div className="card-body text-center">

                                    <h5 className="card-title text-warning">
                                        Earned Leave
                                    </h5>

                                    <h1>
                                        {balance.earnedBalance}
                                    </h1>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
        </>
    );
}

export default LeaveBalance;