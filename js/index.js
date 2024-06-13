document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.getElementById("github-form");
  const searchInput = document.getElementById("search");
  const userList = document.getElementById("user-list");
  const reposList = document.getElementById("repos-list");

  // Handle form submission to search for users
  searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    userList.innerHTML = "";
    reposList.innerHTML = "";

    const query = searchInput.value;
    await searchUsers(query);
  });

  // Function to search for users by query
  async function searchUsers(query) {
    const response = await fetch(
      `https://api.github.com/search/users?q=${query}`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      }
    );
    const data = await response.json();
    displayUsers(data.items);
  }

  // Function to display searched users
  function displayUsers(users) {
    users.forEach((user) => {
      const userItem = document.createElement("li");
      userItem.innerHTML = `
              <img src="${user.avatar_url}" alt="${user.login}" width="50">
              <a href="${user.html_url}" target="_blank">${user.login}</a>
              <button onclick="viewRepos('${user.login}')">View Repos</button>
          `;
      userList.appendChild(userItem);
    });
  }

  // Function to view repositories of a specific user
  async function viewRepos(username) {
    reposList.innerHTML = "";
    const response = await fetch(
      `https://api.github.com/users/${username}/repos`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      }
    );
    const data = await response.json();
    displayRepos(data);
  }

  // Function to display repositories
  function displayRepos(repos) {
    repos.forEach((repo) => {
      const repoItem = document.createElement("li");
      repoItem.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
      reposList.appendChild(repoItem);
    });
  }

  // Make viewRepos function globally accessible for onclick attribute
  window.viewRepos = viewRepos;
});
