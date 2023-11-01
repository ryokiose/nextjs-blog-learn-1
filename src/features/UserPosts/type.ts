export interface Post {
	id: number;
	name: string;
	email: string;
	createdAt: string;
}

export interface responseData {
	error?: string;
}

export interface newPost {
	id: number;
	name: string;
	email: string;
	created_at: string;
}

export interface payload {
	new: newPost;
}
