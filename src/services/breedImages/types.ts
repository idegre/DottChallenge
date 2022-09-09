export type BreedResponse = {
  message: string[];
  status: string //its not documented what the other statuses are
};

export type BreedListResponse = {
  message: {[breed: string]: string[]}
  status: string //its not documented what the other statuses are
};

