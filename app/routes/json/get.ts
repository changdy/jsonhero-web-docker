import {ActionFunction, json} from "remix";
import {getJSON} from "./cacheJson"


export const action: ActionFunction = async ({params}) => {
    console.log(params)
    return new Response(
        getJSON(params.id ?? ""),
        {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            }
        }
    );
};
