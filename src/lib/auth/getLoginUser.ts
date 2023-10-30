// Not using
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

export const getLoginUser = async (): Promise<User | null> => {
	return new Promise((resolve) => {
		onAuthStateChanged(auth, (user) => {
			resolve(user);
		});
	});
};
