import {ActionFunction, json} from "remix";
import {getJSON} from "./cacheJson"


export const action: ActionFunction = async ({request}) => {
    const id = new URL(request.url).searchParams.get("id");
    return new Response(
        getJSON(id ?? ""),
        {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            }
        }
    );
};
