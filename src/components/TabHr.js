import React from "react";

export default function TabHr({icon,temp,time}){
    return(
        <>
            <article className="tab-hr">
                <p>{time}</p>
                <img src={icon} alt={"weather icon"}/>
                <p>{temp}&deg;C</p>
            </article>
        </>
    )
}