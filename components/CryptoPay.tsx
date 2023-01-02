// import { useSession } from "next-auth/react";
import Router from "next/router";
import { useForm } from "react-hook-form";
// import { ethers } from "ethers";

export default function CryptoPay({ posts, context, role }) {
	const  runPayment = async (event: any) => { // new line

		console.log({amount, destinationAddress});

	}
    return (
        <button onClick={runPayment}>Pay 50$ in USDC</button>
    )

}