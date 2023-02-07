import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser, getUserById } from "../store/users.slice";

const SearchBar: React.FC<any> = () => {
	const selectedUser = useSelector(getCurrentUser);
	const dispatch = useDispatch<any>();
	useEffect(() => {
		dispatch(getUserById(1));
	}, []);
	console.log(selectedUser);

	return <div>SearchBar</div>;
};

export default SearchBar;
