import type { NextApiRequest } from "next";

export interface UserCreateNextApiRequest extends NextApiRequest {
	body: {
		email: string;
		name: string;
        password: string;
	};
}
