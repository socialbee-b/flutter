import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { fetchAllUsers, getAllUsers } from "../store/users.slice";
import "./SearchBar.css";

const SearchBar: React.FC<any> = () => {
	const navigate = useNavigate();
	const users = useSelector(getAllUsers);
	const dispatch = useDispatch<any>();
	const searchRef = useRef<HTMLInputElement>(null);
	const [searchResult, setSearchResult] = useState<any>([]);

	useEffect(() => {
		dispatch(fetchAllUsers());
	}, []); // eslint-disable-line

	const getMatches = (search: any) => {
		const result = [];
		for (const user of users) {
			const fullName = `${user?.firstName} ${user?.lastName}`;
			if (
				result.length < 10 &&
				(user?.username?.toLowerCase().includes(search) ||
					fullName.toLowerCase().includes(search))
			) {
				result.push(user);
			}
		}
		return result;
	};

	const handleChange = async (e: any) => {
		e.preventDefault();
		const search = searchRef.current?.value?.toLowerCase() || "";
		setSearchResult(getMatches(search));
	};

	const handleClick = async (id: any) => {
		if (searchRef.current?.value) {
			searchRef.current.value = "";
		}
		navigate(`/profile/${id}`);
	};

	return (
		<div className="styledSearchBar">
			<form onChange={handleChange}>
				<input type="text" ref={searchRef} placeholder="Search Users..." />
			</form>
			{searchRef.current && searchRef.current?.value?.length > 0 && (
				<ul className="styledSearchResults">
					{searchResult?.map((result: any) => (
						<li onClick={() => handleClick(result?.id)} key={result?.id}>{`${
							result?.firstName
						} ${result?.lastName} @${result?.username?.toLowerCase()}`}</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default SearchBar;
