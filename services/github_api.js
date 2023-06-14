import axios from 'axios';

export const getGitHubUser = async (accessToken) => {
  const response = await axios.get(`https://getuser-v2q6nspraa-uc.a.run.app`, {
    params: {
      token: accessToken,
    },
  });

  return response.data;
};

export const getRepos = async (accessToken) => {
  const response = await axios.get(`https://getrepos-v2q6nspraa-uc.a.run.app`, {
    params: {
      token: accessToken,
    },
  });

  return response.data;
};

export const getStarredRepos = async (accessToken) => {
  const response = await axios.get(
    `https://getstarredrepos-v2q6nspraa-uc.a.run.app`,
    {
      params: {
        token: accessToken,
      },
    }
  );

  return response.data;
};
