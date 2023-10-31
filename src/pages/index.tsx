import { getSortedPostsData } from "@/utils/posts";
import { Home } from "@/features/Home";
import { HomeProps } from "@/features/Home/type";

export default function HomeIndex({ allPostsData }: HomeProps) {
	return <Home allPostsData={allPostsData} />;
}

export async function getStaticProps() {
	const allPostsData = getSortedPostsData();
	return {
		props: {
			allPostsData,
		},
	};
}
