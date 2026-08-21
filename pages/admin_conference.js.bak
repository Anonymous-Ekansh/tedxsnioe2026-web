import { delegateKitAssigned, delegateKitAssigned2 } from "../operations/payment.fetch";
import { findPayments } from "../services/paymentServer"
import '../styles/routes/admin.scss'
import { useState } from "react";
import BlurredSpinner from "../components/BlurredSpinner/BlurredSpinner";
export default function AdminConference({ payments }) {
    let srNo = 1;
    const [loading, setLoading] = useState(false);
    const handleClick = async (id) => {
        setLoading(true);
        try {
            const data = {
                id: id,
            }
            const response = await delegateKitAssigned(data);

            if (response.status === 200) {
                setLoading(false);
                window.location.reload();
            } else {
                alert('INTERNAL SERVER ERROR');
            }
        } catch (e) {
            console.log("ERROR", e)
        }
        setLoading(false);
    }
    const handleClick2 = async (id) => {
        setLoading(true);
        try {
            const data = {
                id: id,
            }
            const response = await delegateKitAssigned2(data);

            if (response.status === 200) {
                setLoading(false);
                window.location.reload();
            } else {
                alert('INTERNAL SERVER ERROR');
            }
        } catch (e) {
            console.log("ERROR", e)
        }
        setLoading(false);
    }
    return (
        <>
            {loading ? <BlurredSpinner /> : <></>}
            <div className="AdminMainContainer">
                <p className="AdminMainContainer__title">Conference Single Ticket</p>
                <table className="bordered-table">
                    <thead>
                        <tr>
                            <th>Sr No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Registration</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, index) => {
                            if (payment["paymentVerified"]) {
                                return (
                                    payment['noOfPeople'] == 1 ?
                                        <tr key={index} className="AdminMainContainer__details">
                                            <td>{srNo++}</td>
                                            <td>{payment["name1"]}</td>
                                            <td>{payment["email1"]}</td>
                                            <td>{payment["phone1"]}</td>
                                            <td>
                                                {payment["delegateKit"] ? <button disabled>Registered</button> : <button onClick={() => handleClick(payment["id"])}>Register</button>}
                                            </td>
                                        </tr>
                                        :
                                        <tr key={index}></tr>
                                )
                            }
                        })}
                    </tbody>
                </table>
                <p className="AdminMainContainer__title">Conference Double Ticket</p>
                <table className="bordered-table">
                    <thead>
                        <tr>
                            <th>Sr No</th>
                            <th>Name 1</th>
                            <th>Email 1</th>
                            <th>Phone Number 1</th>
                            <th>Registration 1</th>
                            <th>Name 2</th>
                            <th>Email 2</th>
                            <th>Phone Number 2</th>
                            <th>Registration 2</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, index) => {
                            if (payment["paymentVerified"]) {
                                return (
                                    payment['noOfPeople'] == 2 ?
                                        <tr key={index} className="AdminMainContainer__details">
                                            <td>{srNo++}</td>
                                            <td>{payment["name1"]}</td>
                                            <td>{payment["email1"]}</td>
                                            <td>{payment["phone1"]}</td>
                                            <td>
                                                {payment["delegateKit"] ? <button disabled>Registered</button> : <button onClick={() => handleClick(payment["id"])}>Register</button>}
                                            </td>
                                            <td>{payment["name2"]}</td>
                                            <td>{payment["email2"]}</td>
                                            <td>{payment["phone2"]}</td>
                                            <td>
                                                {payment["delegateKit2"] ? <button disabled>Registered</button> : <button onClick={() => handleClick2(payment["id"])}>Register</button>}
                                            </td>

                                        </tr>
                                        :
                                        <tr key={index}></tr>
                                )
                            }
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export async function getServerSideProps(context) {
    const response = await findPayments();
    return {
        props: {
            payments: response,
        }
    }
}

