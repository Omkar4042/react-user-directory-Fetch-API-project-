import React, { useState, useEffect } from "react";
import UserCard from "./Components/UserCurd";

export default function App() {

  /* ---------------- STATE ---------------- */

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [companyFilter, setCompanyFilter] = useState("ALL");
  const [sortOrder, setSortOrder] = useState("asc");

  const [currentPage, setCurrentPage] = useState(1);

  const USERS_PER_PAGE = 5;


  /* ---------------- FETCH USERS ---------------- */

  const fetchUsers = async () => {
    setLoading(true);
    setError(false);

    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const result = await response.json();
      setUsers(result);

    } catch (err) {
      setError(true);

    } finally {
      setLoading(false);
    }
  };


  /* ---------------- EFFECTS ---------------- */

  // Fetch users when component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Reset page when search/filter/sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [search, companyFilter, sortOrder]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);


  /* ---------------- DERIVED DATA ---------------- */

  // Filter users
  const filteredUsers = users
    .filter((user) =>
      user.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    )
    .filter((user) =>
      companyFilter === "ALL" ? true : user.company.name === companyFilter
    );

  // Sort users
  const sortedUsers = [...filteredUsers].sort((a, b) =>
    sortOrder === "asc"
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name)
  );

  // Companies for filter dropdown
  const companies = [
    "ALL",
    ...new Set(users.map((user) => user.company.name)),
  ];

  // Pagination logic
  const indexOfLastUser = currentPage * USERS_PER_PAGE;
  const indexOfFirstUser = indexOfLastUser - USERS_PER_PAGE;

  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);


  /* ---------------- LOADING / ERROR UI ---------------- */

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading users...</p>;
  }

  if (error) {
    return <p style={{ textAlign: "center" }}>Error fetching users.</p>;
  }


  /* ---------------- UI ---------------- */

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>

      <h2 style={{ textAlign: "center" }}>User List</h2>

      <button disabled={loading} onClick={fetchUsers}>
        {loading ? "Loading..." : "Refresh Users"}
      </button>

      <input
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <br />

      <select
        value={companyFilter}
        onChange={(e) => setCompanyFilter(e.target.value)}
      >
        {companies.map((company) => (
          <option key={company} value={company}>
            {company}
          </option>
        ))}
      </select>

      <button
        onClick={() =>
          setSortOrder(sortOrder === "asc" ? "desc" : "asc")
        }
      >
        Sort: {sortOrder === "asc" ? "A-Z" : "Z-A"}
      </button>


      {sortedUsers.length === 0 ? (
        <p>No users match your search.</p>
      ) : (
        currentUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))
      )}


      {sortedUsers.length > 0 && (
        <div
          style={{
            display: "flex",
            gap: "10px",
            justifyContent: "center",
          }}
        >
          <button
            onClick={() => setCurrentPage((p) => p - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => p + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}

    </div>
  );
}
