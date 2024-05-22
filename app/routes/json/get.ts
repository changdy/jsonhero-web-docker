import {ActionFunction, json} from "remix";
import {getJSON} from "./cacheJson"


export const action: ActionFunction = async ({params}) => {
    let str = getJSON(params.id ?? "");
    return json(
        str,
        {
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
        }
    );
};
