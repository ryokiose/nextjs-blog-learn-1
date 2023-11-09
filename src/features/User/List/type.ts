//user list
export interface User {
	id: number;
	name: string;
	email: string;
	password: string;
	createdAt: string;
	updatedAt: string;
}

export interface responseData {
	error?: string;
}

export interface newUser {
	id: number;
	name: string;
	email: string;
	password: string;
	created_at: string;
	updated_at: string;
}

export interface payload {
	new: newUser;
}
