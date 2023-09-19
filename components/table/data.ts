export const fetchData = async () => {
  const response = await fetch("https://ask-commerce-api.onrender.com/users");
  const data = await response.json();
  return data;
};

export const columns = [
  { name: "FIRSTNAME", uid: "firstName" },
  { name: "LASTNAME", uid: "lastName" },
  { name: "USERNAME", uid: "username" },
  { name: "EMAIL", uid: "email" },
  { name: "ADMIN", uid: "isAdmin" },
  { name: "ACTIONS", uid: "actions" },
];
