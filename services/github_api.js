export const getGitHubUser = async (accessToken) => {
  const response = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `token ${accessToken}`,
    },
  });
  const data = await response.json();
  return data;
};

export const getRepos = async (accessToken) => {
  const response = await fetch('https://api.github.com/user/repos', {
    headers: {
      Authorization: `token ${accessToken}`,
    },
  });
  const data = await response.json();
  return data;
};

export const getStarredRepos = async (accessToken) => {
  const response = await fetch('https://api.github.com/user/starred', {
    headers: {
      Authorization: `token ${accessToken}`,
    },
  });
  const data = await response.json();
  return data;
};
