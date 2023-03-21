export type ResponseRepository = {
  node: {
    name: string;
    owner: {
      login: string;
    };
  };
};

export type Repository = {
  name: string;
  owner: string;
};
