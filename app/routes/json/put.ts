import {ActionFunction, json, LoaderFunction} from "remix";
import {saveJSON} from "./cacheJson"

export const loader: LoaderFunction = async ({request}) => {
    if (request.method === "OPTIONS") {
        return new Response(null, {
            status: 204,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Max-Age": "86400",
            },
        });
    }
};

export const action: ActionFunction = async ({request, context}) => {
    const str = await request.text();
    return json(
        {id: saveJSON(str)},
        {
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
        }
    );
};
