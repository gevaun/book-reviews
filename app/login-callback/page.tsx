"use client"

import { useEffect } from "react";
import { loginCallbackAction }  from "./actions";
import { useRouter } from "next/navigation";

export default function LoginCallbackPage() {
    const router = useRouter();


    // When the page mounts, call the loginCallbackAction
    useEffect(() => {
        const url = window.location.href;
        loginCallbackAction(url).then(() => router.push("/"));
    },)


    // Show loading screen while authenticating
    return (
        <div>
            <div className="text-center">
                <div></div>
                <p className="text-xl">Authenticating...</p>
            </div>
        </div>
    );
}

