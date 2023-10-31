import type { NextApiRequest } from "next";

export interface ApiFormNextApiRequest extends NextApiRequest {
	body: {
		email: string;
		name: string;
	};
}
