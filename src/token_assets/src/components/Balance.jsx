import React, { useState } from "react";
import { Principal } from "@dfinity/principal"
import { token } from "../../../declarations/token";

function Balance() {

    const [inputValue, setInput] = useState("");
    const [balanceResult, setBalance] = useState("");
    const [cryptoSymbol, setSymbol] = useState("");
    const [isHidden, setHidden] = useState(true);
    const [isLoading, setLoading] = useState(false);
    const [isDisabled, setDisabled] = useState(false);


    async function handleClick() {

        setLoading(true);
        setDisabled(true);
        try {
            const principal = Principal.fromText(inputValue);
            const balance = await token.balanceOf(principal);
            setBalance(balance.toLocaleString());
            setSymbol(await token.getSymbol());
            setHidden(false);
            setDisabled(false);
        } catch (error) {
            console.error("Error fetching balance:", error);
            setBalance("Error fetching balance");
            setSymbol("");
            setHidden(false);
            setDisabled(false)
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className="window white">
            <label>Check account token balance:</label>
            <p>
                <input
                    id="balance-principal-id"
                    type="text"
                    placeholder="Enter a Principal ID"
                    value={inputValue}
                    onChange={(e) => setInput(e.target.value)}
                />
            </p>
            <p className="trade-buttons">
                <button
                    id="btn-request-balance"
                    onClick={handleClick}
                    disabled={isDisabled}
                >
                    {isLoading ? "Loading...." : "Check Balance"}

                </button>
            </p>
            {!isLoading && !isHidden && (
                <p>This account has a balance of {balanceResult} {cryptoSymbol}</p>
            )}
        </div>
    );
}

export default Balance;
