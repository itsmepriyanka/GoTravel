import {config as conf} from "dotenv";

conf();

const _config = {
    URL:String(process.env.VITE_API_URL),
};

export const config = Object.freeze(_config);